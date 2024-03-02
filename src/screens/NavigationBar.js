import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { icons } from "../constants";

import MultipleChoiceQue from '../components/quiz/MultipleChoiceQue';
import CreateYourQuiz from '../components/quiz/CreateYourQuiz';
import AddingTopicsForQuizGeneration from "../components/quiz/AddingTopicsForQuizGeneration";
import Dashboard from "../components/dashboard/dashboard";
import CoursesScreen from "../components/courses/CoursesScreen";
import ChatUi from '../components/chatbot/ChatUi';

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tabs
function NavigationBar() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Dashboard') {
                        iconName = focused ? icons.dashboard_active : icons.dashboard_inactive;
                    } else if (route.name === 'Courses') {
                        iconName = focused ? icons.course_active : icons.course_inactive;
                    } else if (route.name === 'quizzes') {
                        iconName = focused ? icons.quiz_active : icons.quiz_inactive;
                    }

                    return <Image source={iconName} style={{ width: 80, height: 80 }} resizeMode="contain" />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: { height: 100 },
                tabBarShowLabel: false, 
                headerShown: false,

            })}
        >
            <Tab.Screen name="Dashboard" component={Dashboard} />
            <Tab.Screen name="Courses" component={CoursesScreen} />
            <Tab.Screen name="quizzes" component={AddingTopicsForQuizGeneration} />
        </Tab.Navigator>
    );
}


export default NavigationBar;