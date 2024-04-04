import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, FlatList, Dimensions } from 'react-native';
import { COLORS, icons, images, SIZES } from "./../../constants";
import CourseList from '../home/CourseList';
import AxiosService from "./../../services/axios";
import Headers from '../../common/Headers';

const screenHeight = Dimensions.get('window').height;

function CoursesScreen({ navigation }) {

  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    const response = await AxiosService("GET", "courses", true);
    if (response.data && response.data.success) {
      setCourseList(response.data.data.courses);
    }
  };




  return (

    <SafeAreaView style={styles.container}>
      <Headers courseText="Courses" display={false} courseTextDes="View / add your new course" />

      {courseList.length > 0 ? (
        <View style={styles.courseContainer} >
          {/* <Text style={styles.viewAdd}>View / add you new course</Text> */}
          <CourseList isHorizontal={false} height={screenHeight * 0.25} width={'100%'} courses={courseList} navigation={navigation} />

        </View>
      ) : (
        // This will display if there are no courses
        <View style={styles.noCoursesContainer}>
          <Text style={styles.greeting}>Hi, Kristen</Text>
          <Image source={images.noCourse} style={styles.illustration} />
          <Text style={styles.noCoursesText}>You do not have any courses.</Text>
          <Text style={styles.noCoursesText}>Would you like to
            <Text
              onPress={() => navigation.navigate('AddCourse')}
              style={styles.linkStyle}>
              {" create a course "}
            </Text>
            now?</Text>
        </View>
      )}
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddCourse')}>
        <Text style={styles.addButtonText}>+ Add Course</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  courseContainer: {
    flex: 1,
    width: '200',
    paddingTop: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
  },
  headerTitle: {
    fontSize: SIZES.xxLarge,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  profileImage: {
    width: 64,
    height: 64,

  },
  greeting: {
    fontSize: SIZES.xLarge,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  noCoursesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  illustration: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
  },
  noCoursesText: {
    fontSize: SIZES.large,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold'
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 30,
    marginBottom: 10,
    width: '100%',
    height: 48,
    alignSelf: 'center',

  },
  addButtonText: {
    fontWeight: 'bold',
    fontSize: SIZES.large,
    color: COLORS.midTeal,
    textAlign: 'center',

  },
  linkStyle: {
    color: COLORS.secondary,
    fontSize: SIZES.large,
    textAlign: 'center',
    marginTop: 50,
    fontWeight: 'bold',
  },
  viewAdd: {
    color: COLORS.darkGray,
    fontSize: SIZES.medium,
    marginBottom: 10,
  }
});

export default CoursesScreen;
