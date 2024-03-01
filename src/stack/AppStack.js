import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS, icons, images, SIZES } from "./../constants";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { Image, TouchableOpacity } from 'react-native';





// componenets
import Welcome from '../screens/welcome';
import Signup from '../screens/signup'
import AddingTopicsForQuizGeneration from "./../components/quiz/AddingTopicsForQuizGeneration";
import CreateYourQuiz from '../components/quiz/CreateYourQuiz';
import MultipleChoiceQue from '../components/quiz/MultipleChoiceQue'
import NavigationBar from "../screens/NavigationBar";
import Dashboard from "./../components/dashboard/dashboard";
import AddCourse from '../components/courses/AddCourse';
import AddTopics from '../components/courses/AddTopics';
import SplashScreen from '../screens/SplashScreen';
import Login from '../screens/login';
import SelectTopics from '../components/quiz/SelectTopics';
import CourseCard from '../components/cards/CourseCard';
import GenerateQuizByAi from '../components/quiz/GenerateQuizByAi';
// import CreateYourQuiz from '../components/quiz/CreateYourQuiz';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function AppStack() {
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="NavigationBar" component={NavigationBar} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
        <Stack.Screen name="AddCourse" component={AddCourse} options={{ headerShown: false }} />
        <Stack.Screen name="AddTopics" component={AddTopics} options={{ headerShown: false }} />
       <Stack.Screen name="MultipleChoiceQue" component={MultipleChoiceQue} options={{ headerShown: false }} />
        <Stack.Screen name="AddingTopicsForQuizGeneration" component={AddingTopicsForQuizGeneration} options={{ headerShown: false }} />
        <Stack.Screen name="SelectTopics" component={SelectTopics} options={{ headerShown: false }} />
        <Stack.Screen name="CourseCard" component={CourseCard} options={{ headerShown: false }} />
        <Stack.Screen name="GenerateQuizByAi" component={GenerateQuizByAi} options={{ headerShown: false }} />
        <Stack.Screen name="CreateYourQuiz" component={CreateYourQuiz} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>

  );
}

export default AppStack;
