import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, PermissionsAndroid, Button } from 'react-native';
import styles from './styles';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
const RNFS = require('react-native-fs');

export default RecordList = (props) => {
  const [records, setRecords] = useState([]);
  let [audioRecorderPlayer , setAudioRecorderPlayer ] = useState(undefined);

  const initAudioRecord = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: 'Contacts',
        message: 'Ứng dụng này cần quyền ghi âm',
        buttonNegative: 'Hủy',
        buttonPositive: 'Chấp nhận',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      setAudioRecorderPlayer(new AudioRecorderPlayer());
    }
  };


  useEffect(() => {
    initAudioRecord();
    getRecordList();
  }, []);

  const getRecordList = async () => {
    RNFS.readDir('sdcard') // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      .then((result) => {
        if (result.length) {
          const recordFiles = result
            .filter(item => item.name.includes('record_') && item.name.endsWith('\.mp4'))
            .map(item => ({...item, ...{id: item.name + new Date().getTime()}}));
          setRecords(recordFiles);
        }
      })
      .catch((err) => {
        console.log(err.message, err.code);
      });
  };

  const playRecord = async (item) => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const path = Platform.select({
        ios: 'hello.m4a',
        android: item.path,
      });
      audioRecorderPlayer.startPlayer(path).then(() => {
        audioRecorderPlayer.setVolume(1.0);

        audioRecorderPlayer.addPlayBackListener(async (e: any) => {
          if (e.current_position === e.duration) {
            audioRecorderPlayer.stopPlayer().catch(e => console.log(e));
            audioRecorderPlayer.removePlayBackListener();
          }
        })
      }).catch((e) => {
        audioRecorderPlayer.stopPlayer().catch(e => console.log(e))
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.recordList}>
        <FlatList
          data={records}
          renderItem={({item}) => (
            <View style={styles.record}>
              <Button title={item.name} onPress={() => playRecord(item)} />
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>

      <Button
        title="Go contact list"
        style={styles.button}
        onPress={() =>
          props.navigation.navigate('ContactList')
        }
      />
    </View>
  );

}
