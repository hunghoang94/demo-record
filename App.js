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
import RecordList from './src/components/record-list/record-list';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ContactList"
          component={ContactList}
        />
        <Stack.Screen
          name="RecordList"
          component={RecordList}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
