// import React from 'react';
// import { View, Text, StyleSheet, Button, Alert } from 'react-native';
// // import DocumentUploader from './DocumentUploader'; 

// function HomeScreen({navigation}) {

//   const moveTo = () => {
    
//   }
//   return (
//     <View style={styles.container}>
//       <Text>Welcome to the Home Screen!</Text>
//       {/* <DocumentUploader /> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// export default HomeScreen;


import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Dashboard</Text>
        <Image source={require('./../../assets/userImage.png')} style={styles.profileImage} />
      </View>
      <Text style={styles.greeting}>Hey, Kristen</Text>
      
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Courses</Text>
      </View>
      <View style={styles.coursesContainer}>
        {/* Course 1 */}
        <TouchableOpacity style={styles.courseCard}>
          <Text style={styles.courseTitle}>Project Management</Text>
          <Text style={styles.courseDate}>Jan 6 - Apr 6, 2024</Text>
          <Text style={styles.courseDuration}>12 weeks</Text>
        </TouchableOpacity>
        {/* Course 2 */}
        <TouchableOpacity style={styles.courseCard}>
          <Text style={styles.courseTitle}>Project Management</Text>
          <Text style={styles.courseDate}>Jan 6 - Apr 6, 2024</Text>
          <Text style={styles.courseDuration}>12 weeks</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Quizzes</Text>
        <TouchableOpacity>
          <Text style={styles.showAll}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.quizzesContainer}>
        <TouchableOpacity style={styles.quizCard}>
          <Text style={styles.quizTitle}>W1 - Overview</Text>
        </TouchableOpacity>
        {/* Add more quizzes as needed */}
      </View>
      
      <View style={styles.bottomNavigation}>
        {/* Navigation Icons */}
      </View>
    </ScrollView>
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
    paddingTop: 40,
  },
  headerText: {
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
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  showAll: {
    fontSize: 16,
    color: '#0000ff',
  },
  coursesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  courseCard: {
    backgroundColor: '#0000ff',
    padding: 20,
    borderRadius: 10,
    width: '45%',
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  courseDate: {
    fontSize: 14,
    color: '#fff',
  },
  courseDuration: {
    fontSize: 14,
    color: '#fff',
  },
  quizzesContainer: {
    // Styles for your quizzes container
  },
  quizCard: {
    // Styles for your individual quiz cards
  },
  bottomNavigation: {
    // Styles for your bottom navigation
  },
});

export default HomeScreen;
