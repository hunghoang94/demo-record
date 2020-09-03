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
  StatusBar,
} from 'react-native';
import ContactList from './src/components/contact-list/contact-list';
import Recorder from './src/components/recorder/recorder';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content"/>
      <SafeAreaView>
        <ContactList/>
        <Recorder/>
      </SafeAreaView>
    </>
  );
};

export default App;
