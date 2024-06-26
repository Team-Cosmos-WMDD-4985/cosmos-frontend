import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { COLORS, SIZES, WEIGHT, images } from "./../constants";

// componenets
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
import QuizDetails from "../components/quiz/QuizDetails";
import CourseCard from "../components/cards/CourseCard";
import GenerateQuizByAi from "../components/quiz/GenerateQuizByAi";
import OpenAI from "../components/chatbot/ChatUi";
// import CheckAnswer from '../components/quiz/GetAnswer'
// import CreateYourQuiz from '../components/quiz/CreateYourQuiz';
import getAnswer from "../components/quiz/GetAnswers";
import LoaderComponent from "../common/Loader";

//Feature Screens
import SmartCourse from "../components/features/SmartCourse";
import Feature1 from "../components/features/Feature1";
import Feature2 from "../components/features/Feature2";
import Feature3 from "../components/features/Feature3";
import Feature4 from "../components/features/Feature4";

import { useSelector } from "react-redux";
import CourseDetails from "../components/courses/CourseDetails";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AppStack() {

  const loader = useSelector(state => state.user.loader);

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SmartCourse"
            component={SmartCourse}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Feature1"
            component={Feature1}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Feature2"
            component={Feature2}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Feature3"
            component={Feature3}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Feature4"
            component={Feature4}
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
            name="CourseDetails"
            component={CourseDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MultipleChoiceQue"
            component={MultipleChoiceQue}
            options={({ navigation }) => ({
              headerShown: false,
              // headerTitle: () => (
              //   <View style={{ flexDirection: "column" }}>
              //     <Text style={{ fontSize: SIZES.xLarge, marginRight: 10 }}>
              //       Multiple Choice
              //     </Text>
              //     <Text style={{ fontSize: SIZES.medium }}>
              //       Feel free to edit the content
              //     </Text>
              //   </View>
              // ),
              // headerRight: () => (
              //   <Image
              //     source={images.profile}
              //     style={{
              //       width: 40,
              //       height: 40,
              //       borderRadius: 20,
              //       marginRight: 20,
              //     }}
              //   />
              // ),
            })}
          />
          <Stack.Screen
            name="SelectTopics"
            component={SelectTopics}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AI Assistant"
            component={OpenAI}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="getAnswer"
            component={getAnswer}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="QuizDetails"
            component={QuizDetails}
            options={({ navigation }) => ({
              headerShown: false,
              // headerTitle: () => (
              //   <View style={{ flexDirection: "column" }}>
              //     <Text style={{ fontSize: SIZES.xLarge, marginRight: 10 }}>
              //       Quizzes
              //     </Text>
              //     <Text style={{ fontSize: SIZES.medium }}>
              //       Summary of your quiz
              //     </Text>
              //   </View>
              // ),
              // headerRight: () => (
              //   <Image
              //     source={images.profile}
              //     style={{
              //       width: 40,
              //       height: 40,
              //       borderRadius: 20,
              //       marginRight: 20,
              //     }}
              //   />
              // ),
            })}
          />
          <Stack.Screen
            name="Choose Topics"
            component={SelectTopics}
            options={({ navigation }) => ({
              headerShown: false,
              // headerTitle: () => (
              //   <View style={{ flexDirection: "column" }}>
              //     <Text style={{ fontSize: SIZES.xLarge, marginRight: 10 }}>
              //       Choose Topics
              //     </Text>
              //     <Text style={{ fontSize: SIZES.medium }}>
              //       Select topics to create a quiz
              //     </Text>
              //   </View>
              // ),
              // headerRight: () => (
              //   <Image
              //     source={images.profile}
              //     style={{
              //       width: 40,
              //       height: 40,
              //       borderRadius: 20,
              //       marginRight: 20,
              //     }}
              //   />
              // ),
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
              headerShown: false,
              // headerTitle: () => (
              //   <View
              //     style={{
              //       flexDirection: "row",
              //       alignItems: "center",
              //       justifyContent: "space-between",
              //     }}
              //   >
              //     <View>
              //       <Text style={{ fontSize: SIZES.xLarge }}>Create Quiz</Text>
              //       <Text style={{ fontSize: SIZES.medium }}>
              //         Start to prepare your quiz
              //       </Text>
              //     </View>
              //   </View>
              // ),
              // headerRight: () => (
              //   <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              //     <Image
              //       source={images.profile}
              //       style={{
              //         width: 40,
              //         height: 40,
              //         borderRadius: 20,
              //         marginRight: 20,
              //       }}
              //     />
              //   </TouchableOpacity>
              // ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>

      {
        loader && <LoaderComponent />
      }
    </View>
  );
}

export default AppStack;
