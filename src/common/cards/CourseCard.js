import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './CourseCard.style'
// import { checkImageURL } from "../../../../utils/index";
import { icons } from "./../../constants"

const CourseCard = ( { } ) => {

  const item = {
    employer_logo : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
    courseName: "Project Management",
    job_title: "React developer",
    courseDate: "Jan 6 - Apr 6, 2024"
  }
  return (
    <TouchableOpacity
      style={styles.container()}
    >
      <View style={styles.logoContainer}>
        {/* This container is for logo or image */}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.courseName} numberOfLines={1}>
          {`${item.courseName}`}
        </Text>

        <Image
          source={icons.chevronRight}
          style={styles.iconStyle}
        />
      </View>

      <View> 
          <Text style={styles.courseDate} numberOfLines={1} > {item.courseDate}</Text>
      </View>

    </TouchableOpacity>
  )
}

export default CourseCard