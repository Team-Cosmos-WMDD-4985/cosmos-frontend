import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { COLORS, icons, images, SIZES } from "./../../constants";


function CoursesScreen({ navigation }) {
  const hasCourses = false;
  const [linkPressed, setLinkPressed] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Courses</Text>
        <Image source={images.profile} style={styles.profileImage} />
      </View>
      <Text style={styles.greeting}>Hi, Kristen</Text>

      {hasCourses ? (
        <View>
          {/* List of courses */}
        </View>
      ) : (
        // This will display if there are no courses
        <View style={styles.noCoursesContainer}>
          <Image source={images.noCourse} style={styles.illustration} />
          <Text style={styles.noCoursesText}>You do not have any courses.</Text>
          <Text style={styles.noCoursesText}>Would you like to
            <Text 
            onPress={() => navigation.navigate('AddCourse')}
            style={styles.linkStyle}>
              {" create a course "}
            </Text>
            now?</Text>

          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddCourse')}>
            <Text style={styles.addButtonText}>+ Add Course</Text>
          </TouchableOpacity>

        </View>
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: SIZES.xxLarge,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  greeting: {
    fontSize: SIZES.xLarge,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
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
  }
});

export default CoursesScreen;
