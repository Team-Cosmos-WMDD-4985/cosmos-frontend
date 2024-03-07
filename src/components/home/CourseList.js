import React, {useEffect, useState} from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';

import styles from './CourseList.style';
import { COLORS, SIZES } from '../../constants';

import CourseCard from "../../common/cards/CourseCard";
import AxiosService from "./../../services/axios";

const CourseList = () => {


  

  const data = [ {}, {}, {}]
  const [ courseList, setCourseList ] = useState([])

  useEffect(() => {
    getCourses();
  }, [])

  const getCourses = async () => {
    const response = await AxiosService("GET", "courses", true);
    console.log(response.data);
    if(response.data && response.data.success) {
      setCourseList(response.data.data.courses)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Courses</Text>
        {/* <TouchableOpacity> 
          <Text style={styles.headerBtn}> Show all </Text> 
          </TouchableOpacity> */}
      </View>
      
      <View style={styles.cardsContainer}>
        {  
          <FlatList
            data={courseList}
            renderItem={({item}) => {
              return (
                <CourseCard item={item} />
              )
            }}
            keyExtractor={item => Math.random()}
            contentContainerStyle={{columnGap: SIZES.medium}}
            horizontal={true}
          />
         
        }
      </View>
    </View>
  )
}

export default CourseList