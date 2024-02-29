import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import CourseCard from "../cards/CourseCard";
import { COLORS, icons, images, SIZES,WEIGHT } from "../../constants";


const AddingTopicsForQuizGeneration = ({ navigation }) => {
  const courses = [
    {
      id: 1,
      name: "Course 1",
      topics: ["topic1", "topic2", "topic3", "topic4", "topic5"],
      image: require("../../assets/images/course.jpg"),
    },
    {
      id: 2,
      name: "Course 2",
      topics: ["topic11", "topic22", "topic33", "topic44", "topic55"],
      image: require("../../assets/images/course.jpg"),
    },
    {
      id: 3,
      name: "Course 3",
      topics: ["topic10", "topic20", "topic30", "topic40", "topic50"],
      image: require("../../assets/images/course.jpg"),
    },
    {
      id: 4,
      name: "Course 4",
      topics: ["topic111", "topic222", "topic333", "topic444", "topic555"],
      image: require("../../assets/images/course.jpg"),
    },
    {
      id: 5,
      name: "Course 5",
      topics: ["topic11", "topic21", "topic31", "topic41", "topic51"],
      image: require("../../assets/images/course.jpg"),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Quizzes</Text>
      </View>
      <CourseCard courses={courses} navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    marginTop: 100,
    marginBottom: 50,
    justifyContent: "center",
    alignItems: "center",
   
 
  },
  headerTitle: {
    fontSize: SIZES.xxLarge,
    fontWeight: WEIGHT.bold,
    color: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddingTopicsForQuizGeneration;
