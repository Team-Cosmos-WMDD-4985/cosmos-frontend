import { useState } from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet, Image } from "react-native";
import { icons, images } from "./../../constants";
import { SIZES, WEIGHT, COLORS } from "./../../constants/theme";
import QuizList from "./../home/QuizList";
import CourseList from "./../home/CourseList"
import { Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;


const getFormattedDate = () => {
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date();
    const weekDay = weekDays[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${weekDay}, ${month} ${day < 10 ? `0${day}` : day}, ${year}`;
};


const Dashboard = () => {
    return (
        <SafeAreaView style={{
            flex: 1,
            marginTop: 20,
            backgroundColor: COLORS.lightGrey,
        }} >
            <View style={{ flex: 1, padding: SIZES.medium }}>
                <View style={styles.header}>
                    <View style={styles.headerStack}>
                        <Text style={styles.dateText}>{getFormattedDate()}</Text>
                        <Text style={styles.headerText}>Welcome back, Kristen</Text>
                    </View>
                    <Image source={images.profile} style={styles.profileImage} />
                </View>
                <CourseList />
                <QuizList />
            </View>
        </SafeAreaView >
    )
}
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20,
    },
    headerText: {
        fontSize: SIZES.large,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginTop: 8,
    },
    profileImage: {
        width: 64,
        height: 64,
        // borderRadius: 20,
    },
    headerStack: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'left',
    }
})

export default Dashboard;