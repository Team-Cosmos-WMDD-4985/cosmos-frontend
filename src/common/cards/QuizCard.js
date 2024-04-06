import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import styles from "./QuizCard.style";
import { images } from '../../constants';

const QuizCard = ({ quiz, navigation, item, index }) => {
  // const navigation = useNavigation();
  const [imageUri, setImageUri] = useState('');

  // const getRandomImageUrl = () => {
  //   return `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/200/300`;
  // };
  const randomWeeks = Math.floor(Math.random() * 12) + 1;

  const handleQuizPress = () => {
    // Navigate to QuizDetails screen with quiz details
    navigation.navigate('QuizDetails', { quiz });
  };
  // const renderInitialsPlaceholder = (topicName) => {
  //   const initials = topicName && topicName.length > 0 ? topicName.substring(0, 2).toUpperCase() : '';

  //   return (
  //     <View style={styles.initialsPlaceholder}>
  //       <Text style={styles.initialsText}>{initials}</Text>
  //     </View>
  //   );
  // };

  const getUnsplashImageSource = async (category) => {
    const accessKey = '7UVrYE94CZ8NKed1LdJph-Nsc4DxjhFgH4xriKpt1KE';
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${category}&client_id=${accessKey}`);
    const data = await response.json();

    if (data && data.results && data.results.length > 0) {
      const imageUrl = data.results[0].urls.regular;
      return { uri: imageUrl };
    } else {
      console.log('No images found for the specified category');
      return null;
    }
  };
  const categories = [
    'test paper',
    'exam room',
    'study group',
    'multiple choice',
    'online quiz',
    'exam stress',
    'study notes',
    'question paper',
    'exam preparation',
    'revision'
  ];


  useEffect(() => {
    const fetchImage = async () => {
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const imageSource = await getUnsplashImageSource(randomCategory);
      if (imageSource && imageSource.uri) {
        setImageUri(imageSource.uri);
      }
    };

    fetchImage();
  }, [item, index]);
  
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
        {/* {renderInitialsPlaceholder(quiz.quizName)} */}
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.logoImage} />
        ) : (
          // Placeholder or loading state if needed
          <Text>Loading...</Text>
        )}
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
