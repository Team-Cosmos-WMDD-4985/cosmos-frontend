import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Tab } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { NavigationContainer } from '@react-navigation/native';

function HomeScreen({ navigation }) {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Dashboard</Text>
                <Image source={require('./../../assets/userImage.png')} style={styles.profileImage} />
            </View>
            <Text style={styles.greeting}>Hey, Kristen</Text>

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Courses</Text>
            </View>

            <ScrollView horizontal={true} style={styles.coursesScrollView} showsHorizontalScrollIndicator={false}>
                <View style={styles.coursesContainer}>

                    <TouchableOpacity style={styles.courseCard}>
                        <Image source={require('./../../assets/course_La.png')} style={styles.courseImage}
                        />
                        <Text style={styles.courseTitle}>Project Management</Text>
                        <Text style={styles.courseDate}>Jan 6 - Apr 6, 2024</Text>
                        <Text style={styles.courseDuration}>12 weeks</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.courseCard}>
                        <Image source={require('./../../assets/course_L.png')} style={styles.courseImage} />
                        <Text style={styles.courseTitle}>Web and Mobile</Text>
                        <Text style={styles.courseDate}>Jan 3 - Apr 10, 2024</Text>
                        <Text style={styles.courseDuration}>12 weeks</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.courseCard}>
                        <Image source={require('./../../assets/course_La.png')} style={styles.courseImage} />
                        <Text style={styles.courseTitle}>Economics</Text>
                        <Text style={styles.courseDate}>Jan 7 - Apr 9, 2024</Text>
                        <Text style={styles.courseDuration}>12 weeks</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.courseCard}>
                        <Image source={require('./../../assets/course_L.png')} style={styles.courseImage} />
                        <Text style={styles.courseTitle}>Design Aspects</Text>
                        <Text style={styles.courseDate}>Jan 1 - Apr 2, 2024</Text>
                        <Text style={styles.courseDuration}>12 weeks</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>

            <View style={styles.quizSection}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Quizzes</Text>
                    <TouchableOpacity>
                        <Text style={styles.showAll}>Show all</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.quizzesContainer}>
                    <TouchableOpacity style={styles.quizCard}>
                        <Text style={styles.quizTitle}>W1 - Overview</Text>
                        <Text style={styles.quizTitle}>W2 - GuideLines</Text>
                        <Text style={styles.quizTitle}>W3 - Summary</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.bottomNavigation}>
                <Image source={require('./../../assets/button_Dashboard.png')} style={styles.navButtons} />
                <Image source={require('./../../assets/button_Courses.png')} style={styles.navButtons} />
                <Image source={require('./../../assets/button_quizzes.png')} style={styles.navButtons} />
            </View>

            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === 'Home') {
                                iconName = focused ? 'ios-home' : 'ios-home-outline';
                            } else if (route.name === 'Settings') {
                                iconName = focused ? 'ios-settings' : 'ios-settings-outline';
                            }

                            // You can return any component that you like here!
                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                        tabBarActiveTintColor: 'tomato',
                        tabBarInactiveTintColor: 'gray',
                    })}
                >

                    <Tab.Screen name="Home" component={HomeScreen} />
                    {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
                </Tab.Navigator>
            </NavigationContainer>


        </ScrollView>
    );
}
// const Tab = createBottomTabNavigator();

// const HomeScreen = () => (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Home!</Text>
//     </View>
//   );
  
//   const SettingsScreen = () => (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Settings!</Text>
//     </View>
//   );


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingRight: 20,
        paddingLeft: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    headerText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#263750',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    greeting: {
        fontSize: 16,
        paddingHorizontal: 20,
        marginVertical: 10,
        marginBottom: 48,
        marginTop: 8,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#263750',
        marginBottom: 16,

    },
    showAll: {
        fontSize: 16,
        color: '#0000ff',
    },
    coursesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    courseCard: {
        // backgroundColor: '#0000ff',
        padding: 10,
        borderRadius: 10,
        marginRight: 10,
        marginLeft: 10,

    },
    courseTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#263750',
    },
    courseDate: {
        fontSize: 14,
        color: '#263750',
    },
    courseDuration: {
        fontSize: 14,
        color: '#263750',
    },
    quizzesContainer: {
        borderRadius: 5,
        color: '#263750',
    },
    courseImage: {
        width: '100%',
        height: 50,
    },
    quizCard: {
        borderRadius: 5,
        color: '#263750',
    },
    quizSection: {
        borderRadius: 5,
        color: '#263750',
        borderColor: '#263750',
        borderWidth: 1,
        padding: 10,
    },
    bottomNavigation: {
        display: 'flex',
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
    },
    navButtons: {
        width: 30,
        height: 30,
    },

});

export default HomeScreen;
