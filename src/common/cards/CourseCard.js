import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './CourseCard.style'
// import { checkImageURL } from "../../../../utils/index";

const PopularJobCard = ( { } ) => {

  const item = {
    employer_logo : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
    employer_name: "Akash Bawa",
    job_title: "React developer",
    job_country: "IN"
  }
  return (
    <TouchableOpacity
      style={styles.container()}
    >
      <TouchableOpacity style={styles.logoContainer()}>
        <Image
          source={ {uri: "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg" } }
          resizeMode='contain'
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <Text style={styles.companyName} numberOfLines={1} > {item.employer_name}</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.jobName()} numberOfLines={1}>
          {`${item.job_title}`}
        </Text>

        <Text style={styles.location}>{item.job_country}</Text>
      </View>

    </TouchableOpacity>
  )
}

export default PopularJobCard