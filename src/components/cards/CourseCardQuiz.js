import React from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { COLORS, icons, images, SIZES,WEIGHT} from "../../constants";
import  styles  from "./CourseCardQuiz.style";

const CourseCard = ({ courses,navigation }) => {

  const getDateFormat = (date) => {
    let dateObj = new Date(date);
    const month = dateObj.getUTCMonth() + 1; 
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    return `${month}-${day}-${year}`
  }


    const handlePress = (topics, courseId) => {
        navigation.navigate('Choose Topics', { topics, courseId });
      };
  return (
    <ScrollView >
     
        {courses.map((course) => (
          <TouchableOpacity
            key={course.id}
            style={styles.container()}
           
            onPress={() =>  handlePress(course.topics, course._id)}
          >
            <View>
              <Image 
              source={images.course1}
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
              <Text style={styles.weekText} numberOfLines={1} >{getDateFormat(course.startDate)}</Text>
              </View>
              <View style={{display:"flex", flexDirection:"row", justifyContent:"flex-end"}}>
              <Text style={styles.weekText} numberOfLines={1} >12 Weeks</Text>
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
