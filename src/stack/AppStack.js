import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { Image, TouchableOpacity , View, Text} from "react-native";
import { StyleSheet } from 'react-native';




// componenets
import Welcome from "../screens/welcome";
import Signup from "../screens/signup";
// import AddingTopicsForQuizGeneration from "./../components/quiz/AddingTopicsForQuizGeneration";
import CreateYourQuiz from "../components/quiz/CreateYourQuiz";
import MultipleChoiceQue from "../components/quiz/MultipleChoiceQue";
import NavigationBar from "../screens/NavigationBar";
import Dashboard from "./../components/dashboard/dashboard";
import AddCourse from "../components/courses/AddCourse";
import AddTopics from "../components/courses/AddTopics";
import SplashScreen from "../screens/SplashScreen";
import Login from "../screens/login";
import SelectTopics from "../components/quiz/SelectTopics";
import CourseCard from "../components/cards/CourseCardQuiz";
import GenerateQuizByAi from "../components/quiz/GenerateQuizByAi";
import OpenAI from "../components/chatbot/ChatUi";
import { COLORS, SIZES, WEIGHT, images } from "./../constants";
import { Svg, Path } from 'react-native-svg';


// import CreateYourQuiz from '../components/quiz/CreateYourQuiz';
import Feature2 from "../components/features/Feature2";
import Feature3 from "../components/features/Feature3";
import Feature4 from "../components/features/Feature4";
import Feature1 from "../components/features/Feature1";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AppStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NavigationBar"
          component={NavigationBar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddCourse"
          component={AddCourse}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddTopics"
          component={AddTopics}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MultipleChoiceQue"
          component={MultipleChoiceQue}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen name="AddingTopicsForQuizGeneration" component={AddingTopicsForQuizGeneration} options={{ headerShown: false }} /> */}
        {/* <Stack.Screen
          name="Choose Topics"
          component={SelectTopics}
          options={{ headerShown: true }}
        /> */}

<Stack.Screen
  name="Choose Topics"
  component={SelectTopics}
  options={({ navigation }) => ({
    headerShown: true,
    headerTitle: () => (
      <View style={{ flexDirection: 'column'}}>
        <Text style={{ fontSize: SIZES.xLarge, marginRight: 10 }}>Choose Topics</Text>
        <Text style={{fontSize:SIZES.medium}}>Select topics to create a quiz</Text>
      </View>
    ),
    headerRight: () => (
      <Image
        source={images.profile}
        style={{ width: 40, height: 40, borderRadius: 20, marginRight: 20 }}

      />
    ),
  })}
/>


        <Stack.Screen
          name="CourseCard"
          component={CourseCard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GenerateQuizByAi"
          component={GenerateQuizByAi}
          options={{ headerShown: false }}
        />
<Stack.Screen
  name="CreateYourQuiz"
  component={CreateYourQuiz}
  options={({ navigation }) => ({
    headerShown: true,
    headerTitle: () => (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View>
          <Text style={{ fontSize: SIZES.xLarge }}>Create Quiz</Text>
          <Text style={{fontSize:SIZES.medium}}>Start to prepare your quiz</Text>
        </View>
       
      </View>
    ),
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Image
          source={images.profile}
          style={{ width: 40, height: 40, borderRadius: 20, marginRight: 20 }}
        />
      </TouchableOpacity>
    ),
  })}
/>


        <Stack.Screen
          name="OpenAi"
          component={OpenAI}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}




export default AppStack;
