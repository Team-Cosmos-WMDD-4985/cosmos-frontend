// Feature1.js

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import images from '../../constants/images'
import { COLORS, SIZES } from '../../constants/theme'

const Feature4 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
      <Image
        source={images.feature4}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Customize Themes</Text>
      <Text style={styles.description}>for any the academy / company / your personal</Text>
      <View style={styles.paginationContainer}>
        {/* You can make these pagination dots dynamic depending on the number of features */}
        <View style={[styles.paginationDot, styles.paginationDotInactive]} />
        <View style={[styles.paginationDot, styles.paginationDotInactive]} />
        <View style={[styles.paginationDot, styles.paginationDotInactive]} />
        <View style={styles.paginationDot} />
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.nextText}>Sign Up Now</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.white,
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    padding: 10
  },
  skipText: {
    color: COLORS.primary,
    fontSize: 16,
    textDecorationLine: 'underline',
  },

  image: {
    width: 240,
    height: 240,
    marginTop: 150,
  },
  title: {
    fontSize: SIZES.xxLarge,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: COLORS.primary,
  },
  description: {
    ontSize: 18,
    marginTop: 10,
    textAlign: 'center',
    color: COLORS.primary,
  },
  paginationContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
  },
  paginationDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    marginHorizontal: 5
  },
  paginationDotInactive: {
    backgroundColor: COLORS.lightGrey
  },
  nextButton: {
    width: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 54,
  },
  nextText: {
    color: COLORS.midTeal,
    fontSize: 20,
    margin: 'auto',
    textAlign: 'center',
  }
});

export default Feature4;
