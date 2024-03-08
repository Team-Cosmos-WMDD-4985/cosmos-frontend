import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppStack from './src/stack/AppStack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppStack/>
 

  );
}
const styles = StyleSheet.create({
});
