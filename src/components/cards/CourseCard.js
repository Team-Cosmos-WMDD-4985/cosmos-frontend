// import React from "react";
// import {
//   View,
//   ScrollView,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import { COLORS, icons, images, SIZES,WEIGHT } from "../../constants";

// import { Card } from "react-native-elements";

// const CourseCard = ({ courses,navigation }) => {

//   console.log(courses)

//   console.log(courses)

//   console.log(courses)

//     const handlePress = (topics, courseId) => {
//         navigation.navigate('SelectTopics', { topics, courseId });
//       };
//   return (
//     <ScrollView>
//       <Card containerStyle={styles.card}>
//         <Card.Title style={styles.title}>Your Courses</Card.Title>
//         {courses.map((course) => (
//           <TouchableOpacity
//             key={course.id}
//             style={styles.courseContainer}
//             onPress={() =>  handlePress(course.topics, course._id)}
//           >
//             <Image source={course.image} style={styles.image} />
//             <Text>{course.courseName}</Text>
//             {/* <Text>{course.courseName}</Text> */}
//           </TouchableOpacity>
//         ))}
//       </Card>
//   </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   courseContainer: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "space-evenly",
//     alignItems: "center",
//     height: 163,
//     borderRadius: 20,
//     backgroundColor: "#D9D9D9",
//     marginBottom: 20,
//     borderWidth: 0,

//   },
//     card: {
//         borderWidth: 0,
//         elevation: 0,
//         shadowColor: 'rgba(0,0,0, .2)',
//     shadowOffset: { height: 0, width: 0 },
//     shadowOpacity: 0, 
//     shadowRadius: 0
      
        
       
//     },
//   title:{
// fontSize:SIZES.xLarge,
// color:COLORS.primary,
//   },
//   image: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//   },
// });

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