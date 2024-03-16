import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, SIZES } from '../../constants';
import CourseCard from "../../common/cards/CourseCard";
import AxiosService from "./../../services/axios";

const screenHeight = Dimensions.get('window').height;

const CourseList = ({ isHorizontal = true , width , height}) => {

  const data = [{}, {}, {}]
  const [courseList, setCourseList] = useState([])

  useEffect(() => {
    getCourses();
  }, [])

  const getCourses = async () => {
    const response = await AxiosService("GET", "courses", true);
    console.log(response.data);
    if (response.data && response.data.success) {
      setCourseList(response.data.data.courses)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        {
          <FlatList
            data={courseList}
            renderItem={({ item, index }) => {
              return (
                <CourseCard item={item} index={index} width={width} height={height} />
              )
            }}
            keyExtractor={(item, index) => String(index)} 
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal={isHorizontal} 
            />

        }
      </View>
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
  },
  cardsContainer: {
    marginTop: SIZES.medium,
    gap: SIZES.small,
    height: screenHeight * 0.25, // 25% of the screen height
    borderRadius: 20,
  },
});
export default CourseList