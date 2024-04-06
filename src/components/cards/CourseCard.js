import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { COLORS, icons, images, SIZES } from "../../constants";
import styles from "./CourseCardQuiz.style";

const CourseCard = ({ courses, navigation, item, index }) => {

  const [imageUris, setImageUris] = useState({});

  const getDateFormat = (startDate, endDate) => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    const startMonth = months[startDateObj.getMonth()];
    const endMonth = months[endDateObj.getMonth()];

    const startDay = startDateObj.getDate();
    const endDay = endDateObj.getDate();

    const startYear = startDateObj.getFullYear();
    const endYear = endDateObj.getFullYear();

    return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${startYear}`;
  }

  const handlePress = (topics, courseId) => {
    navigation.navigate('Choose Topics', { topics, courseId });
  };

  const getRandomImageUrl = () => {
    const seed = Math.floor(Math.random() * 1000);
    return `https://picsum.photos/seed/${seed}/200/300`;
  };

  // const renderInitialsPlaceholder = (topicName) => {
  //   const initials = topicName && topicName.length > 0 ? topicName.substring(0, 2).toUpperCase() : '';

  //   return (
  //     <View style={styles.initialsPlaceholder}>
  //       <Text style={styles.initialsText}>{initials}</Text>
  //     </View>
  //   );
  // };

  // const getUnsplashImageSource = async (category) => {

  //   const accessKey = '7UVrYE94CZ8NKed1LdJph-Nsc4DxjhFgH4xriKpt1KE';
  //   const response = await fetch(`https://api.unsplash.com/search/photos?query=${category}&client_id=${accessKey}`);
  //   const data = await response.json();

  //   if (data && data.results && data.results.length > 0) {
  //     const imageUrl = data.results[0].urls.regular;
  //     return { uri: imageUrl };
  //   } else {
  //     console.log('No images found for the specified category');
  //     return null;
  //   }
  // };
  // const categories = [
  //   'test paper',
  //   'exam room',
  //   'study group',
  //   'multiple choice',
  //   'online quiz',
  //   'exam stress',
  //   'study notes',
  //   'question paper',
  //   'exam preparation',
  //   'revision'
  // ];
  // useEffect(() => {
  //   const fetchImageForCourse = async (course) => {
  //     const randomCategoryIndex = Math.floor(Math.random() * categories.length);
  //     const category = categories[randomCategoryIndex];
  //     const accessKey = '7UVrYE94CZ8NKed1LdJph-Nsc4DxjhFgH4xriKpt1KE';
  //     try {
  //       const response = await fetch(`https://api.unsplash.com/search/photos?query=${category}&client_id=${accessKey}`);
  //       const data = await response.json();
  //       if (data && data.results && data.results.length > 0) {
  //         const randomImageIndex = Math.floor(Math.random() * data.results.length);
  //         const imageUrl = data.results[randomImageIndex].urls.regular;
  //         setImageUris(prevUris => ({ ...prevUris, [course.id]: imageUrl }));
  //       }
  //     } catch (error) {
  //       console.error('Error fetching image for course:', course.id, error);
  //     }
  //   };

  //   courses.forEach((course) => {
  //     fetchImageForCourse(course);
  //   });
  // }, [courses]); 



  return (
    <ScrollView>
      {courses.map((course) => (
        <TouchableOpacity
          key={course.id}
          style={styles.container()}
          onPress={() => handlePress(course.topics, course._id)}
        >
          <View>
            <Image
              source={{ uri: getRandomImageUrl(), width: "100%", height: 145 }}
              style={styles.courseStyle}
            />

            {/* {renderInitialsPlaceholder(course.courseName)} */}

            {/* {imageUris[course.id] ? (
              <Image source={{ uri: imageUris[course.id] }} style={styles.courseStyle} />
            ) : (
              <Text>Loading...</Text>
            )} */}

          </View>
          <View style={styles.infoContainer}>
            <View style={styles.firstLine}>
              <Text style={styles.courseName} numberOfLines={1}>
                {`${course.courseName}`}
              </Text>
              <Image
                source={icons.chevronRight}
                style={styles.iconStyle}
              />
            </View>
            <View style={styles.weekStyle}>
              <Text style={styles.weekText} numberOfLines={1}>{getDateFormat(course.startDate, course.endDate)}</Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
              <Text style={styles.weekText} numberOfLines={1}>12 Weeks</Text>
            </View>
          </View>
          <View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default CourseCard;