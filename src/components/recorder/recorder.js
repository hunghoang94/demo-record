import React, { useState, useEffect } from 'react';
import { View, Text, TouchableHighlight, PermissionsAndroid, Platform  } from 'react-native';
import styles from './styles';
import CallDetectorManager from 'react-native-call-detection';
import * as Contacts from 'react-native-contacts';
import AudioRecorderPlayer,  {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import moment from 'moment';

export default Recorder = () => {
  let [callDetector, setCallDetector] = useState(undefined);
  let [audioRecorderPlayer , setAudioRecorderPlayer ] = useState(undefined);
  let [isStart, setIsStart] = useState(false);

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
  }, []);

  const triggerRecord = async (status) => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      if (status === 'start') {
        const date = new Date();

        const path = Platform.select({
          ios: `record_${moment(date).format('DD MM YYYY')} ${moment(date).format('hh')}h ${moment(date).format('mm')}m ${moment(date).format('ss')}s.m4a`,
          android: `sdcard/record_${moment(date).format('DD MM YYYY')} ${moment(date).format('hh')}h ${moment(date).format('mm')}m ${moment(date).format('ss')}s.mp4`,
        });
        const audioSet = {
          AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
          AudioSourceAndroid: AudioSourceAndroidType.MIC,
          AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
          AVNumberOfChannelsKeyIOS: 2,
          AVFormatIDKeyIOS: AVEncodingOption.aac,
        };

        await audioRecorderPlayer.startRecorder(path, false, audioSet);
      } else {
        await audioRecorderPlayer.stopRecorder();
      }
    }
  };

  const onPress = async () => {
    if (isStart) {
      if (callDetector) {
          callDetector.dispose();
      }
    } else {
      setCallDetector(new CallDetectorManager((event, phoneNumber) => {
          console.log(event);

          if (event === 'Disconnected') {
            triggerRecord('stop');
          }
          else if (event === 'Connected') {
            triggerRecord('start');
          }
          else if (event === 'Offhook') {
            triggerRecord('start');
          }
        }, false, () => {
        }, {
          title: 'Phone State Permission',
          message: 'This app needs access to your phone state in order to react and/or to adapt to incoming calls.',
        },
      ));
    }
    setIsStart(!isStart);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.recordButton, isStart ? styles.active : styles.inactive]}>
        <TouchableHighlight underlayColor='none' onPress={onPress}>
          <Text style={[styles.recordButton, isStart ? styles.active : styles.inactive]}>{isStart ? 'Dừng' : 'Bắt đầu'}</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};
