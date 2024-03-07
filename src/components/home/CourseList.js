import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'

import styles from './CourseList.style';
import { COLORS, SIZES } from '../../constants';

import CourseCard from "../../common/cards/CourseCard";


const CourseList = () => {

  const data = [{}, {}, {}]

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Courses</Text>
      </View>

      <View style={styles.cardsContainer}>
        {
          <FlatList
            data={data}
            renderItem={({ item }) => {
              return (
                <CourseCard item={item} />
              )
            }}
            keyExtractor={item => Math.random()}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal={true}
          />

        }
      </View>
    </View>
  )
}

export default CourseList