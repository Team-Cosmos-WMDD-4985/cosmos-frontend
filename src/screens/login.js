import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import { useEffect, React, useState } from 'react';
import { formGroup, head1, head2, input, label, link, link2 } from '../common/formcss'
import { button1 } from '../common/button'
import { COLORS, SIZES } from "../constants/theme";
import AxiosService from "./../services/axios";
import secoreStoreService from "./../services/secureStore";

const Login = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const submitLogin = async () => {
    const data = await AxiosService( 'POST', 'auth/login',  false,  {}, { email, password },)
      .then(async function (response) {
        console.log(response.data);
        await secoreStoreService.save("token", response.data.token);
        navigation.navigate("NavigationBar")
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (

    <View style={styles.container}>
      <View style={styles.container1}>
        <View style={styles.s1}>
          {/* <Image style={styles.logo} source={logo}></Image> */}
          <Text style={styles.h1} onPress={() => navigation.navigate('Welcome')}>Welcome To My App</Text>
          <Text style={styles.small}>My Guru</Text>
        </View>
        <View style={styles.s2}>
          <Text style={head1}>Login</Text>
          <Text style={head2}>Sign-In to Continue</Text>
          <View style={formGroup}>
            <Text style={label}>Email</Text>
            <TextInput style={input} placeholder='Enter Your Email' onChangeText={(text) => setEmail(text)} />
          </View>
          <View style={formGroup}>
            <Text style={label}>Password</Text>
            <TextInput style={input} placeholder='Enter Your Password' onChangeText={(text) => setPassword(text)} />
          </View>
          <View style={styles.fp}>
            <Text style={link}>Forget Password</Text>
          </View>
          {/* <Text style={button1} onPress={submitLogin}>Login</Text> */}
          <Text style={button1} onPress={() => submitLogin()}>Login</Text>

          <Text style={link2}>Dont Have An Account? <Text style={link} onPress={() => navigation.navigate('Signup')}>Create an Account</Text></Text>
        </View>
      </View>
    </View>

  )
}

export default Login;

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
  container1: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  logo: {
    // width: "70%",
    height: 80,
    resizeMode: 'contain'


  },
  s1: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
    height: "40%"

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
    height: "60%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20
  },
  fp: {
    display: 'flex',
    alignItems: "flex-end",
    marginHorizontal: 5,
    marginVertical: 5

  }
  // formGroup: {
  //   display: "flex",
  //   marginVertical:10
  // },
  // label: {
  //   fontSize: 17,
  //   margin: 5
  // },
  // input: {
  //   backgroundColor: "#FFB0CC",
  //   borderRadius: 20,
  //   padding: 10
  // }
})