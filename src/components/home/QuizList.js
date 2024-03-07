import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import styles from './QuizList.style';
import QuizCard from "../../common/cards/QuizCard";

const QuizList = () => {

  const data = [{}, {}, {}]

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Quizzes</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.cardsScrollContainer} contentContainerStyle={styles.cardsContainer}>
        {
          data?.map((job, index) => (
            <QuizCard
              job={job}
              key={`quiz-list-${index}`}
            />
          ))
        }
      </ScrollView>
    </View>
  )
}

export default QuizList