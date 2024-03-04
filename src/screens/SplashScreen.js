import { Center } from '@gluestack-ui/themed';
import { useEffect, React } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { COLORS, icons, images, SIZES } from "./../constants";

function SplashScreen({ navigation }) {


  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Welcome');
    }, 3000);

    // Cleanup function to clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [navigation]);


  const navigateToDashBoard = () => {
    navigation.navigate('Welcome');
  };

  return (
    <ImageBackground source={images.splash} style={styles.container}>
      <TouchableOpacity onPress={navigateToDashBoard}>
        <Image source={images.logo} style={styles.logo} />
      </TouchableOpacity>
      <View style={styles.titleStyle}>
        <Text style={styles.title}>SMART COURSE</Text>
        <Text style={styles.title}>MANAGEMENT SYSTEM</Text>
      </View>
    </ImageBackground>
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
    bottom: 20,
    left: 0,
    right: 0,
  }
});

export default SplashScreen;
