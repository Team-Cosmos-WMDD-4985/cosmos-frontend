import { useState } from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet, Image } from "react-native";
import {  icons, images } from "./../../constants";

import { SIZES, WEIGHT, COLORS } from "./../../constants/theme";

import QuizList from "./../home/QuizList";
import CourseList from "./../home/CourseList"

const Home = () => {

    return (
        <SafeAreaView style={{
            flex: 1, backgroundColor: COLORS.lightWhite
        }} >

            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        flex: 1,
                        padding: SIZES.medium

                    }}
                >
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Dashboard</Text>
                        <Image source={images.profile} style={styles.profileImage} />
                    </View>
                    <Text style={styles.greeting}>Hey, Kristen</Text>
                    <CourseList />
                    <QuizList />
                </View>

            </ScrollView>

        </SafeAreaView>
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
        fontSize: SIZES.xxLarge,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
})

export default Home;