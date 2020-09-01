/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import ContactList from './src/components/contact-list/contact-list';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content"/>
      <SafeAreaView>
        <ContactList/>
      </SafeAreaView>
    </>
  );
};

export default App;
