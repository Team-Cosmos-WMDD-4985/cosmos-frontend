import { StyleSheet, Text, View, Image, Button } from 'react-native'
import { useEffect, React, useState } from 'react';
import welcomeLogo from '../../assets/logo.png'
import { button1 } from '../common/button'
import { COLORS, SIZES } from "./../constants/theme";


const Welcome = ({ navigation }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);


  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Image style={styles.logo} source={welcomeLogo} />
        {/* <Text style={styles.head}>Welcome To</Text> */}
        <View>
          <Text style={button1} onPress={() => navigation.navigate('Login')}>Login</Text>
          <Text style={button1} onPress={() => navigation.navigate('Signup')}>Signup</Text>
        </View>
      </View>

    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({

  container: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.primary,
   },

  patternbg: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  head: {
    color: "white",
    fontSize: 30
  },
  container1: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  },
  logo: {
    // width: "70%",
    height: "20%",
    resizeMode: 'contain',
    marginBottom: 20

  },
  // button1:{
  //   backgroundColor:"#3b5998"
  // }
})