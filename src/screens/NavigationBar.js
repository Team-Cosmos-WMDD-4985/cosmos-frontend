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
import { SIZES, WEIGHT, COLORS } from "./../constants/theme";

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
                tabBarStyle: {
                    height: 80, 
                    backgroundColor: COLORS.white,
                },
                tabBarShowLabel: false,
                headerShown: false,
            })}
        >
            <Tab.Screen name="Dashboard" key={"tab-navigation-1"} component={Dashboard} />
            <Tab.Screen name="Courses" key={"tab-navigation-2"} component={CoursesScreen} />
            <Tab.Screen name="quizzes" key={"tab-navigation-3"} component={AddingTopicsForQuizGeneration} />
        </Tab.Navigator>
    );
}


export default NavigationBar;