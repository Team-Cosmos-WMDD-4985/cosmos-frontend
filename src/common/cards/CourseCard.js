import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './CourseCard.style'
import { icons, images } from "./../../constants"

const CourseCard = ({ item, index }) => {

  const getImageSource = () => {
    if (item.image && item.image !== '') {
      return { uri: item.image };
    }
    // Use the index to generate a unique random image for each course card
    return { uri: `https://picsum.photos/300/200?random=${index}` };
  };

  const getRandomCourseDate = () => {
    const startDate = Math.floor(Math.random() * (31 - 1 + 1)) + 1;
    const endDate = Math.floor(Math.random() * (30 - 1 + 1)) + 1;
    return `Jan ${startDate < 10 ? `0${startDate}` : startDate} - Apr ${endDate < 10 ? `0${endDate}` : endDate}, 2024`;
  };

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
          source={getImageSource()}
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

        <View >
          <Text style={styles.courseDate} numberOfLines={1} >
            {item.courseDate || getRandomCourseDate()}
          </Text>
        </View>

        <View style={styles.weekStyle}>
          <Text style={styles.weekText} numberOfLines={1} >12 Weeks</Text>
        </View>

      </View>
    </TouchableOpacity>
  )
}

export default CourseCard