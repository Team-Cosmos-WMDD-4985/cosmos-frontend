import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import Dashboard from '../screens/Dashboard';

import { NavigationContainer } from '@react-navigation/native';
const Stack = createNativeStackNavigator();


// componenets
import Welcome from '../screens/welcome';
import Login from '../screens/login'
import Signup from '../screens/signup'
import AddingTopicsForQuizGeneration from "./../components/quiz/AddingTopicsForQuizGeneration"
function AppStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome}
          options={
            {
              headerShown: false
            }
          }
        />
        <Stack.Screen name="Login" component={Login}
          options={
            {
              headerShown: false
            }
          }
        />
        <Stack.Screen name="Signup" component={Signup}
          options={
            {
              headerShown: false
            }
          }

        />

        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
        <Stack.Screen name="Dashboard" component={Dashboard}
          options={
            {
              headerShown: false
            }
          } />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppStack;
