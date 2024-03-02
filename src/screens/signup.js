import { StyleSheet, Text, View, Image, TextInput,ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import pattern from '../../assets/pattern.jpg'
import logo from '../../assets/logo.png'
import { formGroup, head1, head2, input, label, link, link2 } from '../common/formcss'
import { button1 } from '../common/button';
import axiosService from "./../services/axios";

const Signup = ({ navigation }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');


  const submitSignUp = async () => {
    try {
      let obj = {
        name, 
        email, 
        password
      }
      const response = await axiosService("POST", "auth/signup", false, {}, obj );
      console.log("response is ", response.data);
      navigation.navigate('Dashboard');
    } catch (error) {
      console.error('Error during signup:', error);
    }
  }
  

  return (
    <View style={styles.container}>
      <Image style={styles.patternbg} source={pattern} />
      <View style={styles.container1}>
       <View style={styles.s1}></View>

        <ScrollView style={styles.s2}>
          <Text style={head1}>Create A New Account</Text>
          <Text style={link2}>Alredy Registered? <Text style={link} onPress={() => navigation.navigate('Login')}>Login Here</Text></Text>
          <View style={formGroup}>
            <Text style={label}>Name</Text>
            <TextInput style={input} placeholder='Enter Your Name' onChangeText={(text) => setName(text)}/>
          </View>
          <View style={formGroup}>
            <Text style={label}>Email</Text>
            <TextInput style={input} placeholder='Enter Your Email' onChangeText={(text) => setEmail(text)}/>
          </View>
          {/* <View style={formGroup}>
            <Text style={label}>Date Of Birth</Text>
            <TextInput style={input} placeholder='Enter Your DOB' onChangeText={(text) => setDob(text)}/>
          </View> */}
          <View style={formGroup}>
            <Text style={label}>Password</Text>
            <TextInput style={input} placeholder='Enter Your Password' onChangeText={(text) => setPassword(text)} />
          </View>
          <View style={formGroup}>
            <Text style={label}>Confirm Password</Text>
            <TextInput style={input} placeholder='Enter Your Password'/>
          </View>
          <View style={styles.fp}>
          <Text style={link}>Forget Password</Text>
          </View>
          <TouchableOpacity style={button1} onPress={submitSignUp}>
            <Text>Sign-Up</Text>
          </TouchableOpacity>
          <Text style={link2}>Dont Have An Account? <Text style={link}>Create an Account</Text></Text>
        </ScrollView>
      </View>
    </View>
  )
}

export default Signup

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
  container1: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  logo: {
    width: "70%",
    height: "70%"

  },
  s1: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
    height: "10%"

  },
  h1: {
    fontSize: 30,
    color: "white",
  },
  small: {
    fontSize: 15,
    color: "white",
  },
  s2: {
    display: "flex",
    backgroundColor: "white",
    width: "100%",
    height: "90%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20
  },
  fp:{
    display:'flex',
    alignItems:"flex-end",
    marginHorizontal:5,
    marginVertical:5

  }
})