import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './CourseCard.style'
// import { checkImageURL } from "../../../../utils/index";
import { icons } from "./../../constants"

const CourseCard = ( { item } ) => {

  const getDateFormat = (date) => {
    let dateObj = new Date(date);
    const month = dateObj.getUTCMonth() + 1; 
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    return `${month}-${day}-${year}`
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
          <Text style={styles.courseDate} numberOfLines={1} > { getDateFormat(item.startDate) } to { getDateFormat(item.endDate) } </Text>
      </View>

    </TouchableOpacity>
  )
}

export default CourseCard