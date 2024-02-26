import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { icons } from "./../constants";


import AddingTopicsForQuizGeneration from "./../components/quiz/AddingTopicsForQuizGeneration";
import Dashboard from "./../components/dashboard/dashboard";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tabs
function MainTabScreen() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Dashboard') {
                        iconName = focused ? icons.dashboard_active : icons.dashboard_inactive;
                    } else if (route.name === 'Add Topics') {
                        iconName = focused ? icons.course_active : icons.course_inactive;
                    } else if (route.name === 'Profile') {
                        iconName = focused ? icons.quiz_active : icons.quiz_inactive;
                    }

                    return <Image source={iconName} style={{ width: 80, height: 80 }} resizeMode="contain" />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Dashboard" component={Dashboard} />
            <Tab.Screen name="Add Topics" component={AddingTopicsForQuizGeneration} />
            <Tab.Screen name="Profile" component={Dashboard} />
        </Tab.Navigator>
    );
}


export default MainTabScreen;