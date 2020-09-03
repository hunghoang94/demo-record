import React, { useState, useEffect } from 'react';
import { View, Text, FlatList  } from 'react-native';
import styles from './styles';
import { PermissionsAndroid } from 'react-native';
import * as Contacts from 'react-native-contacts';
import Contact from '../contact/contact';

export default ContactList = () => {
  const [contacts, setContacts] = useState([]);

  const getContactList = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        title: 'Contacts',
        message: 'Ứng dụng này cần quyền truy cập danh bạ của bạn',
        buttonNegative: 'Hủy',
        buttonPositive: 'Chấp nhận',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Contacts.getAll((err, contacts) => {
        if (err === 'denied') {
          throw (err);
        } else {
          setContacts(contacts.map(contact => ({
            id: contact.rawContactId,
            name: contact.displayName,
            phone: contact.phoneNumbers[0],
          })));
        }
      });
    }
  };

  useEffect(() => {
    getContactList();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh bạ</Text>

      <View style={styles.contactList}>
        <FlatList
          data={contacts}
          renderItem={Contact}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
}
