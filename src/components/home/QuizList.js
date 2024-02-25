


import { View, Text, TouchableOpacity } from 'react-native'


import styles from './CourseList.style';

import QuizCard from "../../common/cards/QuizCard";

const NearByJob = () => {

  const data = [ {}, {} , {}]

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}> Nearby Jobs</Text>
        <TouchableOpacity> 
          <Text style={styles.headerBtn}> Show all </Text> 
          </TouchableOpacity>
      </View>
      
      <View style={styles.cardsContainer}>
        { 
          data?.map((job) => (
              <QuizCard
                job={job}
                key={`nearby-job-${job?.job_id}`}
              />
            ))
        }
      </View>
    </View>
  )
}

export default NearByJob