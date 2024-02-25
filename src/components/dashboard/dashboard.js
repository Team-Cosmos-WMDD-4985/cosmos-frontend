import { useState } from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";

import { COLORS, icons, images, SIZES   } from "./../../constants";

import QuizList from "./../home/QuizList";
import CourseList from "./../home/CourseList"

const Home = () => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite}} >
            {/* <Stack.Screen 
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
                    ),
                    headerTitle:""
                }
            }/> */}

            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style= {{
                        flex: 1,
                        padding: SIZES.medium
                    }}
                >
                    {/* <Welcome/> */}
                    <CourseList/>
                    <QuizList/>
                </View>

            </ScrollView>

        </SafeAreaView>
    )
} 

export default Home;