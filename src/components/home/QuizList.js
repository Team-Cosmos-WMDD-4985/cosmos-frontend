import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import styles from './QuizList.style';
import QuizCard from "../../common/cards/QuizCard";
import AxiosService from "./../../services/axios";

const QuizList = () => {

  const data = [{}, {}, {}];
  const [quizList, setQuizList] = useState([]);

  useEffect(() => {
    getQuizes();
  })

  const getQuizes = async () => {
    const response = await AxiosService("GET", "getQuizByUser", true);
    
    console.log("Quiz data ", data.data)
    if(response.data && response.data.success) {
      setQuizList(response.data.data);
    }
  }
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
          quizList?.map((quiz, index) => (
            <QuizCard
              quiz={quiz}
              key={`quiz-list-${index}`}
            />
          ))
        }
      </ScrollView>
    </View>
  )
}

export default QuizList