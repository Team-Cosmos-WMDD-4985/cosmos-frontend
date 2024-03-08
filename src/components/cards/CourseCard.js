import React from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { COLORS, icons, images, SIZES,WEIGHT } from "../../constants";

import { Card } from "react-native-elements";

const CourseCard = ({ courses,navigation }) => {

    const handlePress = (topics, courseId) => {
        navigation.navigate('SelectTopics', { topics, courseId });
      };
  return (
    <ScrollView>
      <Card containerStyle={styles.card}>
        <Card.Title style={styles.title}>Your Courses</Card.Title>
        {courses.map((course) => (
          <TouchableOpacity
            key={course.id}
            style={styles.courseContainer}
            onPress={() =>  handlePress(course.topics, course._id)}
          >
            <Image source={course.image} style={styles.image} />
            <Text>{course.courseName}</Text>
          </TouchableOpacity>
        ))}
      </Card>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  courseContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 163,
    borderRadius: 20,
    backgroundColor: "#D9D9D9",
    marginBottom: 20,
    borderWidth: 0,

  },
    card: {
        borderWidth: 0,
        elevation: 0,
        shadowColor: 'rgba(0,0,0, .2)',
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0, 
    shadowRadius: 0
      
        
       
    },
  title:{
fontSize:SIZES.xLarge,
color:COLORS.primary,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default CourseCard;
