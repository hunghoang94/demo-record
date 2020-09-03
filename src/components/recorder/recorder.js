import React, { useState } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import styles from './styles';
import CallDetectorManager from 'react-native-call-detection';
import AudioRecord from 'react-native-audio-record';

export default Recorder = () => {
  const recordOptions = {
    sampleRate: 16000,
    channels: 1,
    bitsPerSample: 16,
    audioSource: 6,
    wavFile: 'phone-record.wav'
  };
  AudioRecord.init(recordOptions);

  let callDetector;
  let [isStart, setIsStart] = useState(false);

  const onPress = () => {
    if (isStart) {
      callDetector && callDetector.dispose();
    } else {
      callDetector = new CallDetectorManager((event, phoneNumber) => {
          console.log(event);

          if (event === 'Disconnected') {
            // AudioRecord.stop();
          }
          else if (event === 'Connected') {
            // AudioRecord.start();
          }
          else if (event === 'Offhook') {
            // AudioRecord.start();
          }
        }, false, () => {
        }, {
          title: 'Phone State Permission',
          message: 'This app needs access to your phone state in order to react and/or to adapt to incoming calls.',
        },
      );
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
