// export default CourseCard;
import React from "react";
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

const CourseCard = ({ courses, navigation }) => {
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
              source={{ uri: getRandomImageUrl(), width:"100%" , height: 145 }}
              style={styles.courseStyle}
            />
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