import React from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import CourseCard from "../cards/CourseCard";
import AxiosService from "./../../services/axios";
import { COLORS , SIZES, WEIGHT } from "../../constants";
// import AxiosService from "./../../services/axios";
import { useState, useEffect } from "react";



const AddingTopicsForQuizGeneration = ({ navigation }) => {

  const [ courseList, setCourseList ] = useState([])

  useEffect(() => {
    getCourses();
  }, [])

  const getCourses = async () => {
    const response = await AxiosService("GET", "courses", true);
    console.log(response.data);
    console.log(courseList)
    if(response.data && response.data.success) {
      setCourseList(response.data.data.courses)
    }
  }

  
  // const coursesList = [
  //   {
  //     id: 1,
  //     name: "Course 1",
  //     topics: ["topic1", "topic2", "topic3", "topic4", "topic5"],
  //     image: require("../../assets/images/course.jpg"),
  //   },
  //   {
  //     id: 2,
  //     name: "Course 2",
  //     topics: ["topic11", "topic22", "topic33", "topic44", "topic55"],
  //     image: require("../../assets/images/course.jpg"),
  //   },
  //   {
  //     id: 3,
  //     name: "Course 3",
  //     topics: ["topic10", "topic20", "topic30", "topic40", "topic50"],
  //     image: require("../../assets/images/course.jpg"),
  //   },
  //   {
  //     id: 4,
  //     name: "Course 4",
  //     topics: ["topic111", "topic222", "topic333", "topic444", "topic555"],
  //     image: require("../../assets/images/course.jpg"),
  //   },
  //   {
  //     id: 5,
  //     name: "Course 5",
  //     topics: ["topic11", "topic21", "topic31", "topic41", "topic51"],
  //     image: require("../../assets/images/course.jpg"),
  //   },
  // ];

  return (
    <SafeAreaView style={styles.container}>
      <View >
        <Text> Quizzes </Text>
      </View>
      <CourseCard courses={courseList} navigation={navigation} />
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
  addButton: {
    backgroundColor: COLORS.button,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'flex-end',
    marginLeft: 200,
    marginRight:20,
    marginBottom: 20,
  },
  addButtonText: {
    fontSize: SIZES.large,
    color: '#fff',
    textAlign: 'center',
  },
});

export default AddingTopicsForQuizGeneration;