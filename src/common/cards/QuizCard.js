import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from "./QuizCard.style";
import { images } from '../../constants';

// import { checkImageURL } from "../../../../utils/index";

const QuizCard = ( { } ) => {

  const job = {
    employer_logo : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
    employer_name: "Akash Bawa",
    job_title: "React developer",
    job_country: "IN",
    job_employment_type: "Fulltime"
  }
  return (
    <TouchableOpacity
      style={styles.container} 
    >
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={ images.course1 }
          // resizeMode='contain'
          style={styles.logoImage}
        />
      </TouchableOpacity>
      {/* <Text style={styles.companyName} numberOfLines={1} > {item.employer_name}</Text> */}

      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {`${job.job_title}`}
        </Text>

        <Text style={styles.jobType}>{job.job_employment_type}</Text>
      </View>

    </TouchableOpacity>
  )
}

export default QuizCard