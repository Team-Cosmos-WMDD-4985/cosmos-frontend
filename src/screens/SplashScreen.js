import { Center } from '@gluestack-ui/themed';
import { useEffect, React } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { COLORS, icons, images, SIZES } from "./../constants";
import Loader from "./../common/Loader";
import SmartCourse from '../components/features/SmartCourse';

function SplashScreen({ navigation }) {
  const navigateToNext = () => {
    navigation.navigate('SmartCourse');
  };

  return (
    <View style= {{flex: 1}}>
    <ImageBackground source={images.splash} style={styles.container}>
      <TouchableOpacity onPress={navigateToNext}>
        <Image source={images.logo} style={styles.logo} />
      </TouchableOpacity>
      <View style={styles.titleStyle}>
        <Text style={styles.title}>SMART COURSE</Text>
        <Text style={styles.title}>MANAGEMENT SYSTEM</Text>
      </View>
    </ImageBackground>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#263750',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 160,
    height: 240,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    color: COLORS.midTeal,
    marginTop: 20,
    textAlign: 'center',
  },

  titleStyle: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
  }
});

export default SplashScreen;
