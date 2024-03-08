import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './CourseCard.style'
// import { checkImageURL } from "../../../../utils/index";
import { icons, images } from "./../../constants"

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
        <Image
          source={images.course1}
          style={styles.courseStyle}
        />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.firstLine}>
          <Text style={styles.courseName} numberOfLines={1}>
            {`${item.courseName}`}
          </Text>
          <Image
            source={icons.chevronRight}
            style={styles.iconStyle}
          />
        </View>
        <Text style={styles.courseDate} numberOfLines={1} > {item.courseDate}</Text>
        <View style={styles.weekStyle}>
          <Text style={styles.weekText} numberOfLines={1} >12 Weeks</Text>
        </View>

      </View>

      <View> 
          <Text style={styles.courseDate} numberOfLines={1} > { getDateFormat(item.startDate) } to { getDateFormat(item.endDate) } </Text>
      </View>

    </TouchableOpacity>
  )
}

export default CourseCard