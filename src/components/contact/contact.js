import React from 'react';
import { View, Text, Linking, TouchableHighlight  } from 'react-native';
import styles from './styles';
import call from 'react-native-phone-call';

export default Contact = ({item}) => {

  const onPress = (number) => {
    call({
      number: number,
      prompt: false
    }).catch(console.error)
  };

  return (
    <TouchableHighlight underlayColor='none' onPress={() => onPress(item.phone.number)}>
      <View style={styles.contact}>
        <Text>{item.name}: {item.phone.number}</Text>
      </View>
    </TouchableHighlight>
  )
}
