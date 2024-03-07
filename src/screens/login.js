import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import { useEffect, React, useState } from 'react';
import { formGroup, head1, head2, input, label, link, link2 } from '../common/formcss'
import { button1 } from '../common/button'
import { COLORS, SIZES } from "../constants/theme";
import AxiosService from "./../services/axios";
import secoreStoreService from "./../services/secureStore";
import images from './../constants/images'
import { icons } from '../constants';
import { Input } from 'react-native-elements';
// import CheckBox from '@react-native-community/checkbox';


const Login = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSelected, setSelection] = useState(false);


  const submitLogin = async () => {
    const data = await AxiosService('POST', 'auth/login', false, {}, { email, password },)
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
          <Image style={styles.logo} source={icons.logo}></Image>
          <Text style={styles.h1} onPress={() => navigation.navigate('Welcome')}>Welcome Back Joyce</Text>
        </View>
        <View style={styles.s2}>
          <Text style={head1}>Login</Text>
          <Text style={head2}>Please login to your account.</Text>
          <View style={formGroup}>
            <Text style={label}>Email</Text>
            <TextInput style={input} placeholder='Enter Your Email' onChangeText={(text) => setEmail(text)} />
          </View>
          <View style={formGroup}>
            <Text style={label}>Password</Text>
            <TextInput style={input} placeholder='Enter Your Password' onChangeText={(text) => setPassword(text)} />
          </View>
          <View style={styles.fp}>
            {/* <View>
              <CheckBox
                value={isSelected}
                onValueChange={setSelection}
                style={{ alignSelf: 'center' }}
              />
              <Text>Stay Loggined</Text>
            </View> */}
            <Text style={styles.loginLinks}>Forget Password</Text>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('NavigationBar')}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          <Text style={link2}>Dont have an account? <Text style={styles.loginLinks} onPress={() => navigation.navigate('Signup')}>SIGN UP</Text></Text>
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
    marginTop: 110,
    height: 123,
    height: 110,
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
    color: COLORS.midTeal,
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
  },
  input: {
    backgroundColor: COLORS.lightTeal,
    borderRadius: 20,
    padding: 10
  },
  loginLinks: {
    textDecorationLine: 'underline',
    color: COLORS.darkGray,
  },
  loginButton: {
    width: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 54,
  }
  ,
  loginText: {
    color: COLORS.midTeal,
    fontSize: 20,
    margin: 'auto',
    textAlign: 'center',
  }
})