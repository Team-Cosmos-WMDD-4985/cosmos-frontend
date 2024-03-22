import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native'
import { COLORS, SIZES } from '../../constants';
import CourseCard from "../../common/cards/CourseCard";
import AxiosService from "./../../services/axios";

const screenHeight = Dimensions.get('window').height;

const CourseList = ({ isHorizontal = true, width, height, courses }) => {

  const data = [{}, {}, {}]
  const [courseList, setCourseList] = useState([])

  useEffect(() => {
    getCourses();
  }, [])

  const getCourses = async () => {
    const response = await AxiosService("GET", "courses", true);
    console.log("course Data: ", response.data);
    if (response.data && response.data.success) {
      setCourseList(response.data.data.courses)
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={courseList}
        // data={courses}

        renderItem={({ item, index }) => {
          return (
            <CourseCard item={item} index={index} width={width} height={height} />
          )
        }}
        keyExtractor={(item, index) => String(index)}
        contentContainerStyle={{ columnGap: SIZES.medium }}
        horizontal={isHorizontal}
      />

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SIZES.small,
  },
  headerTitle: {
    fontSize: SIZES.large,
    color: COLORS.secondary,
    fontWeight: "700"
  }
});
export default CourseList