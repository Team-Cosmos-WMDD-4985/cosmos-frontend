
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
import Headers from "../../common/Headers";

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

  const handleNavigate = () => {
    navigation.navigate("NavigationBar")
  }

  return (
    <SafeAreaView style={styles.container}>
      <Headers courseText="Quizzes" handleNavigate={handleNavigate} display={false} courseTextDes="Choose your course" />
      <CourseCard courses={courseList} navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: 20,

  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingTop: 40,
    // paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: SIZES.xxLarge,
    fontWeight: "bold",
    color: COLORS.primary,
  },
   profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

});

export default AddingTopicsForQuizGeneration;
