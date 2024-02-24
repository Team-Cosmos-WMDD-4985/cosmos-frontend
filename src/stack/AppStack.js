import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import Dashboard from '../screens/Dashboard'; 

const Stack = createNativeStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Welcome' }} /> */}
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Dashboard" component={Dashboard} /> 

    </Stack.Navigator>
  );
}

export default AppStack;
