
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import CourseCard from "../cards/CourseCard";
import AxiosService from "./../../services/axios";
import { COLORS, SIZES, WEIGHT, images } from "./../../constants";
// import AxiosService from "./../../services/axios";
import { useState, useEffect } from "react";
// import CourseListQuiz from "./CourseListQuiz";

const AddingTopicsForQuizGeneration = ({ navigation }) => {
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    const response = await AxiosService("GET", "courses", true);
    console.log(response.data);
    console.log(courseList);
    if (response.data && response.data.success) {
      setCourseList(response.data.data.courses);
    }
  };

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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Quizzes</Text>
        <Image source={images.profile} style={styles.profileImage} />
      </View>
      <Text style={styles.greeting}>Choose your course</Text>
      <CourseCard courses={courseList} navigation={navigation} />
      {/* <CourseListQuiz courseList={courseList} /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    backgroundColor: COLORS.lightGrey

  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: SIZES.xxLarge,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  addButton: {
    backgroundColor: COLORS.button,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: "flex-end",
    marginLeft: 200,
    marginRight: 20,
    marginBottom: 20,
  },
  addButtonText: {
    fontSize: SIZES.large,
    color: "#fff",
    textAlign: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  greeting: {
    fontSize: SIZES.medium,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
  },
});

export default AddingTopicsForQuizGeneration;
