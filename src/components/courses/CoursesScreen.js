import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, FlatList, Dimensions } from 'react-native';
import { COLORS, icons, images, SIZES } from "./../../constants";
import CourseList from '../home/CourseList';

const screenHeight = Dimensions.get('window').height;

function CoursesScreen({ navigation }) {
  const hasCourses = true;
  const [linkPressed, setLinkPressed] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Courses</Text>
        <Image source={images.profile} style={styles.profileImage} />
      </View>

      {hasCourses ? (
        <View style={styles.courseContainer} >
          <Text style={styles.viewAdd}>View / add you new course</Text>
          <CourseList isHorizontal={false} height={screenHeight * 0.25} width={'100%'} />
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
    padding: 20,
  },
  courseContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
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
    paddingHorizontal: 20,
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
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 40,
    width: '100%',
    height: 54,
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

  }
});

export default CoursesScreen;
