import { StyleSheet, Text, View, Image, Button } from 'react-native'
import React from 'react'
import pattern from '../../assets/pattern.jpg'
import welcomeLogo from '../../assets/logo.png'
import { button1 } from '../common/button'


const Welcome = ({ navigation }) => {


  return (
    <View style={styles.container}>
      <Image style={styles.patternbg} source={pattern} />
      <View style={styles.container1}>
        {/* <Image style={styles.logo} source={welcomeLogo} /> */}
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
  container1:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    height: "100%"
  },
  logo:{
    // width: "70%",
    height:"20%",
    resizeMode:'contain',
    marginBottom:20

  },
  // button1:{
  //   backgroundColor:"#3b5998"
  // }
})