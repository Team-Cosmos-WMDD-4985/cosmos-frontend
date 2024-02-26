import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS, icons, images, SIZES   } from "./../constants";
import { NavigationContainer } from '@react-navigation/native';
const Stack = createNativeStackNavigator();


// componenets
import Welcome from '../screens/welcome';
import Login from '../screens/login'
import Signup from '../screens/signup'
import AddingTopicsForQuizGeneration from "./../components/quiz/AddingTopicsForQuizGeneration";
import Dashboard from "./../components/dashboard/dashboard";
import DashboardHeader from "./../common/header";


function AppStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Welcome' }} /> */}

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

        /> */}

        {/* <Stack.Screen name="Home" component={HomeScreen}
          options={
            {
              headerShown: false
            }
          } /> */}
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
