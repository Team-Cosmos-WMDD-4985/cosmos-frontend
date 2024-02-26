import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';

function CoursesScreen({ navigation }) {
  const hasCourses = false;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Courses</Text>
        <Image source={require('./path-to-your-profile-image.jpg')} style={styles.profileImage} />
      </View>
      <Text style={styles.greeting}>Hi, Professor</Text>

      {hasCourses ? (
        // If there are courses, display them here
        <View>
          {/* List of courses */}
        </View>
      ) : (
        // This will display if there are no courses
        <View style={styles.noCoursesContainer}>
          <Image source={require('./path-to-illustration.jpg')} style={styles.illustration} />
          <Text style={styles.noCoursesText}>You did not have any courses.</Text>
          <Text style={styles.noCoursesPrompt}>Would you like to create a course now?</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('CreateCourse')}>
            <Text style={styles.addButtonText}>+ Add Course</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Bottom navigation goes here */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  greeting: {
    fontSize: 20,
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
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  noCoursesPrompt: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 10,
  },
  addButton: {
    backgroundColor: 'orange',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 20,
  },
  addButtonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  // Add styles for your bottom navigation
});

export default CoursesScreen;
