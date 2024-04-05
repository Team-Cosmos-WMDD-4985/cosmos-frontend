import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import styles from "./QuizCard.style";
import { images } from '../../constants';

const QuizCard = ({ quiz, navigation }) => {
  // const navigation = useNavigation();

  const getRandomImageUrl = () => {
    return `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/200/300`;
  };
  const randomWeeks = Math.floor(Math.random() * 12) + 1;

  const handleQuizPress = () => {
    // Navigate to QuizDetails screen with quiz details
    navigation.navigate('QuizDetails', { quiz });
  };
  const renderInitialsPlaceholder = (topicName) => {
    const initials = topicName && topicName.length > 0 ? topicName.substring(0, 2).toUpperCase() : '';
   
    return (
      <View style={styles.initialsPlaceholder}>
        <Text style={styles.initialsText}>{initials}</Text>
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleQuizPress}
    >
      <TouchableOpacity style={styles.logoContainer}>
        {/* <Image
          source={quiz.image ? { uri: quiz.image } : { uri: getRandomImageUrl() }}
          style={styles.logoImage}
        /> */}
        {renderInitialsPlaceholder(quiz.quizName)}
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {`${quiz.quizName}`}
        </Text>

        <Text style={styles.jobType}>Total Questions: {quiz.totalQuestion}</Text>

        <View style={styles.weekStyle}>
          <Text style={styles.weekText} numberOfLines={1} >
            <Text style={styles.weekText}>{`${randomWeeks} / 12 Weeks`}</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default QuizCard;
