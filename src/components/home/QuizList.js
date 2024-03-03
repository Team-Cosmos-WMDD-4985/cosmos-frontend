


import { View, Text, TouchableOpacity } from 'react-native'


import styles from './CourseList.style';

import QuizCard from "../../common/cards/QuizCard";

const QuizList = () => {

  const data = [ {}, {} , {}]

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Quizzes</Text>
        <TouchableOpacity> 
          <Text style={styles.headerBtn}> Show all </Text> 
          </TouchableOpacity>
      </View>
      
      <View style={styles.cardsContainer}>
        { 
          data?.map((job, index) => (
              <QuizCard
                job={job}
                key={`quiz-list-${index}`}
              />
            ))
        }
      </View>
    </View>
  )
}

export default QuizList