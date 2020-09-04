import React, { useState, useEffect } from 'react';
import { View, Text, TouchableHighlight, PermissionsAndroid  } from 'react-native';
import styles from './styles';
import CallDetectorManager from 'react-native-call-detection';
import AudioRecord from 'react-native-audio-record';
import * as Contacts from 'react-native-contacts';

import AudioRecorderPlayer,  {
AVEncoderAudioQualityIOSType,
AVEncodingOption,
AudioEncoderAndroidType,
AudioSet,
AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';

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
      // const recordOptions = {
      //   sampleRate: 16000,
      //   channels: 1,
      //   bitsPerSample: 16,
      //   audioSource: 6,
      //   wavFile: 'phone-record.wav'
      // };
      // AudioRecord.init(recordOptions);
      setAudioRecorderPlayer(new AudioRecorderPlayer());
    }
  };


  useEffect(() => {
    initAudioRecord();
  }, []);

  const onPress = async () => {
    // if (isStart) {
    //   if (callDetector) {
    //       callDetector.dispose();
    //   }
    // } else {
    //   setCallDetector(new CallDetectorManager((event, phoneNumber) => {
    //       console.log(event);
    //
    //       if (event === 'Disconnected') {
    //         AudioRecord.stop();
    //       }
    //       else if (event === 'Connected') {
    //         AudioRecord.start();
    //       }
    //       else if (event === 'Offhook') {
    //         AudioRecord.start();
    //       }
    //     }, false, () => {
    //     }, {
    //       title: 'Phone State Permission',
    //       message: 'This app needs access to your phone state in order to react and/or to adapt to incoming calls.',
    //     },
    //   ));
    // }
    if (!isStart) {
      // AudioRecord.start();
      const path = 'hello.m4a';
      const audioSet = {
        AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
        AudioSourceAndroid: AudioSourceAndroidType.MIC,
        AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
        AVNumberOfChannelsKeyIOS: 2,
        AVFormatIDKeyIOS: AVEncodingOption.aac,
      };
      const uri = await audioRecorderPlayer.startRecorder(path, audioSet);
      audioRecorderPlayer.addRecordBackListener((e) => {
        console.log(e)
      })
      console.log(uri)
    } else {
      // AudioRecord.stop().then((res) => {
      //   console.log(res)
      // });
      const result = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      console.log(result);
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
