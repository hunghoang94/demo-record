import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import style from './contact-list-style';
import { PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';

export default function ContactList() {
  const [contacts, setContacts] = useState([]);

  const getContactList = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        title: "Contacts",
        message: "Ứng dụng này cần quyền truy cập danh bạ của bạn",
        buttonNegative: "Hủy",
        buttonPositive: "Chấp nhận"
      }
    );
    console.log(granted);

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Contacts.getAll((err, contacts) => {
        if (err === 'denied') {
          throw (err);
        } else {
          console.log(contacts)
          setContacts([contacts.map(contact => ({
            name: contact.displayName,
            phone: contact.phoneNumbers[0]
          }))]);
        }
      });
    }
  };

  useEffect(() => {
    getContactList();
  }, []);

  return (
    <View style={style.mainView.height}>
      <Text>Tes123</Text>
    </View>
  );
}
