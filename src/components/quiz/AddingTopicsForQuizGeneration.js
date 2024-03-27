
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

  const handleNavigate =() => {
    navigation.navigate("NavigationBar")
  }

  return (
    <SafeAreaView style={styles.container}>
      <Headers courseText="Quizzes" handleNavigate={handleNavigate} display={false} courseTextDes="Choose your cours"/>
      {/* <View style={styles.header}>
        <Text style={styles.headerTitle}>Quizzes</Text>
        <Image source={images.profile} style={styles.profileImage} />
      </View> */}
      {/* <Text style={styles.greeting}>Choose your course</Text> */}
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
    backgroundColor: COLORS.lightGray

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
