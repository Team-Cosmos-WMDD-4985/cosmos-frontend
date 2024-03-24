import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AxiosService from "../../services/axios";
import { COLORS, SIZES, WEIGHT, images, SHADOWS } from "../../constants";
import Headers from '../../common/Headers';

const QuizDetails = ({ route,navigation }) => {
  const { quiz } = route.params;
  const [quizDetails, setQuizDetails] = useState(null);

  useEffect(() => {
    getQuizDetails();
  }, []);

  const getQuizDetails = async () => {
    try {
      const response = await AxiosService("GET", `quizById?courseId=${quiz._id}`, true);
      if (response.data && response.data.success) {
        setQuizDetails(response.data.quiz);
      }
    } catch (error) {
      console.error('Error fetching quiz details:', error);
    }
  };

  // Array of characters for options
  const optionLabels = ['A', 'B', 'C', 'D'];

  const handleNavigate = () => {
    navigation.navigate("NavigationBar");
}

  return (
    <View style={styles.pageContainer}>
      <Headers courseText="Quizzes" handleNavigate={handleNavigate} display={true} courseTextDes="course Detail"/>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.content}>
            {quizDetails ? (
              <>
                <View style={styles.row}>
                  <Text style={styles.label}>Quiz Name:</Text>
                  <Text>{quizDetails.quizName}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Total Questions:</Text>
                  <Text>{quizDetails.totalQuestion}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Question Type:</Text>
                  {quizDetails.questions.length > 0 && (
                    <Text>{quizDetails.questions[0].questionType}</Text>
                  )}
                </View>
                <Text numberOfLines={1}>-------------------------------------------------------------------------------</Text>
                {quizDetails.questions.map((question, index) => (
                  <View key={index} style={{ marginBottom: 20 }}>
                    <Text style={styles.label}>{`Question ${index + 1}: ${question.question}`}</Text>
                    {question.options.map((option, optionIndex) => (
                      <Text style={styles.label1} key={optionIndex}>{`${optionLabels[optionIndex]}. ${option.optionValue}`}</Text>
                    ))}
                    <Text style={styles.label2}>Answer: {question.answer}</Text>
                  </View>
                ))}
              </>
            ) : (
              <View style={styles.loadingContainer}>
                <Image source={require('../../assets/images/loading.gif')} style={styles.loadingImage} />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
            style={[styles.button1, styles.generateButton]}
            onPress={() => navigation.navigate("NavigationBar")}
          >
            <Text style={styles.generateButtonText}>Return</Text>
          </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGrey,
    borderRadius: SIZES.medium,
    justifyContent: 'space-between',
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
    margin: 20,
  },
  content: {
    flex: 1,
    padding: 20,
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingImage: {
    width: 50,
    height: 50,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.xSmall,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  label2: {
    fontWeight: 'bold',
    paddingLeft: SIZES.medium,
  },
  label1: {
    paddingLeft: SIZES.medium,
  },
  button1: {
    paddingVertical: 10,
    margin: 20,
    borderRadius: 20,
  },
  generateButton: {
    backgroundColor: COLORS.primary,
  },
  generateButtonText: {
    fontSize: SIZES.large,
    color: COLORS.midTeal,
    textAlign: "center",
    WEIGHT: WEIGHT.bold,
    
  },
});

export default QuizDetails;
