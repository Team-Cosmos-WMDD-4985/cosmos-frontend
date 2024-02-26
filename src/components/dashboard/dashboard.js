import { useState } from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";

import { COLORS, icons, images, SIZES   } from "./../../constants";

import QuizList from "./../home/QuizList";
import CourseList from "./../home/CourseList"

const Home = () => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite}} >

            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style= {{
                        flex: 1,
                        padding: SIZES.medium
                    }}
                >
                    <CourseList/>
                    <QuizList/>
                </View>

            </ScrollView>

        </SafeAreaView>
    )
} 

export default Home;