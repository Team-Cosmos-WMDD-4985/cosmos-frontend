import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppStack from './src/stack/AppStack';
import { Provider } from 'react-redux'
import { store } from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
        <AppStack/>
    </Provider>
   
  );
}
const styles = StyleSheet.create({
});
