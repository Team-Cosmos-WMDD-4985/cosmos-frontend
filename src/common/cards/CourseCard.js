import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'
import { icons, images } from "./../../constants"
import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";
import CourseDetails from '../../components/courses/CourseDetails';
import { useNavigation } from '@react-navigation/native';

const CourseCard = ({ courses, item, index, width = 400, height = Dimensions.get('window').height * 0.5 }) => {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState('');

  const handleCoursePress = (topics) => {
    const { courseId } = item;
    // navigation.navigate('CourseDetails', { courseId });
    // navigation.navigate('CourseDetails', { topics, courseId: item });
    navigation.navigate('CourseDetails', { courseId: item, finalCourseData: item, schedule: item });

  };

  const dynamicStyles = StyleSheet.create({
    container: {
      width: width,
      height: height,
      backgroundColor: "#FFF",
      borderRadius: 20,
      justifyContent: "space-between",
      borderRadius: SIZES.medium,
      borderColor: COLORS.lightGray,
      borderWidth: 1,
      ...SHADOWS.medium,
      shadowColor: COLORS.lightGray,
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.3,
      shadowRadius: 20,
      elevation: 8,
      marginBottom: 10,
    },
    logoContainer: {
      width: "100%",
      height: height * 0.5,
      backgroundColor: COLORS.primary,
      justifyContent: "center",
      alignItems: "center",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,

    },
    infoContainer: {
      height: height * 0.5,
      paddingHorizontal: 10,
      paddingVertical: 5,

    },
    initialsText: {
      color: COLORS.midTeal,
      fontSize: SIZES.xLarge,
    },

    courseStyle: {
      width: '100%',
      height: '100%',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
  });

  // const getImageSource = () => {
  //   if (item.image && item.image !== '') {
  //     return { uri: item.image };
  //   }
  //   return { uri: `https://picsum.photos/300/200?random=${index}` };
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
    'education', 'learning', 'school', 'study', 'classroom',
    'books', 'university', 'homework', 'online learning', 'library',
    'student life', 'teacher', 'lecture', 'science', 'mathematics'
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

  const renderInitialsPlaceholder = (topicName) => {
    const initials = topicName && topicName.length > 0 ? topicName.substring(0, 2).toUpperCase() : '';

    return (
      <View style={styles.initialsPlaceholder}>
        <Text style={dynamicStyles.initialsText}>{initials}</Text>
      </View>
    );
  };


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


  return (

    <TouchableOpacity style={dynamicStyles.container}
      onPress={handleCoursePress}
    >

      <View style={dynamicStyles.logoContainer}>
        {/* <Image source={getImageSource()} style={styles.courseStyle} /> */}
        {/* {renderInitialsPlaceholder(item.courseName)} */}
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={dynamicStyles.courseStyle} />
        ) : (
          // Placeholder or loading state if needed
          <Text>Loading...</Text>
        )}
      </View>

      <View style={dynamicStyles.infoContainer}>
        <View style={styles.firstLine}>
          <Text style={styles.courseName} numberOfLines={1}>
            {`${item.courseName}`}
          </Text>
          <Image
            source={icons.chevronRight}
            style={styles.iconStyle}
          />
        </View>

        <View >
          <Text style={styles.weekText} numberOfLines={1}>{getDateFormat(item.startDate, item.endDate)}</Text>
        </View>

        <View style={styles.weekStyle}>
          <Text style={styles.weekText} numberOfLines={1} >12 Weeks</Text>
        </View>

      </View>
    </TouchableOpacity >
  )
}
const screenHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
  container: () => ({
    width: 250,
    height: screenHeight * 0.25, // 25% of the screen height
    backgroundColor: "#FFF",
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
    borderRadius: 20,
  }),
  logoContainer: {
    width: "100%",
    height: screenHeight * 0.125, // 12.5% of the screen height
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,

  },
  logoImage: {
    width: 50,
    height: 50,
  },
  courseDate: {
    fontSize: SIZES.medium,
    color: COLORS.midGray,
    marginTop: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  infoContainer: {
    height: screenHeight * 0.125, // 12.5% of the screen height
    marginTop: SIZES.xSmall,
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    padding: 10,
  },
  iconStyle: {
    width: 24,
    height: 24
  },
  firstLine: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  courseName: ({
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.primary,
    fontWeight: 'bold',
  }),
  weekStyle: {
    display: 'flex',
    color: COLORS.midGray,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  weekText: {
    // padding: 10,
    marginTop: 5,
    fontSize: SIZES.small,
    color: COLORS.midGray,
    fontSize: SIZES.small,
  },
  publisher: (selectedJob) => ({
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.bold,
    color: selectedJob === item.job_id ? COLORS.white : COLORS.primary,
  }),
  location: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
  },
  courseStyle: {
    width: '100%',
    height: screenHeight * 0.125, // 12.5% of the screen height
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,

  }
});

export default CourseCard