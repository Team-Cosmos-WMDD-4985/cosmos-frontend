import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './src/screens/welcome';
import Login from './src/screens/Login'
import Signup from './src/screens/signup'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import AppStack from './src/stack/AppStack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppStack/>

  );
}

const styles = StyleSheet.create({

});
