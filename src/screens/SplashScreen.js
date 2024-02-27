import { Center } from '@gluestack-ui/themed';
import { useEffect, React } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

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
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateToDashBoard}>
        <Image source={require('./../../assets/logo.png')} style={styles.logo} />
      </TouchableOpacity>
      <View style={styles.titleStyle}>
        <Text style={styles.title}>SMART COURSE</Text>
        <Text style={styles.title}>MANAGEMENT SYSTEM</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#263750',
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
    color: '#D9D9D9',
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
