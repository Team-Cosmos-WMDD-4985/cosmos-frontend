import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



// componenets
import Welcome from '../screens/welcome';
import Signup from '../screens/signup'
import AddingTopicsForQuizGeneration from "./../components/quiz/AddingTopicsForQuizGeneration";
import NavigationBar from "../screens/NavigationBar";
import Dashboard from "./../components/dashboard/dashboard";
import AddCourse from '../components/courses/AddCourse';
import AddTopics from '../components/courses/AddTopics';
import SplashScreen from '../screens/SplashScreen';
import Login from '../screens/login';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function AppStack() {
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="NavigationBar">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="NavigationBar" component={NavigationBar} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
        <Stack.Screen name="AddCourse" component={AddCourse} options={{ headerShown: false }} />
       <Stack.Screen name="AddTopics" component={AddTopics} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

export default AppStack;
