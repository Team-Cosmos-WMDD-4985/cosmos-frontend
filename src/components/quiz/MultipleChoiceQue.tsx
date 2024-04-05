import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  TextInput,
  ScrollView,
  Modal,
  Image,
  TouchableOpacity,

} from "react-native";
// import Picker from '@react-native-picker/picker';
// import Carousel from "react-native-snap-carousel";
import Carousel from 'react-native-reanimated-carousel';

import { icons, images, SHADOWS } from "../../constants";
import { COLORS, SIZES } from "../../constants";
// import { NavigationProp } from "@react-navigation/native";
import AxiosService from "../../services/axios.js";
import Icon from "react-native-vector-icons/FontAwesome";
import Headers from "../../common/Headers";
import { useDispatch } from "react-redux";
import { setLoader } from '../../redux/user';
import { SelectList } from 'react-native-dropdown-select-list'

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get('window').height;

const MultipleChoiceQue = ({ route, navigation }) => {
  const { quiz, type } = route.params
  const carouselRef = useRef(null);
  // const [currentIndex, setCurrentIndex] = useState(0);
  const [color, SetColor] = useState("");
  const [regeneratedQuiz, SetRegeneratedQuiz] = useState(null);
  const [isRegenerated, setIsRegenerated] = useState(false);

  const [modalVisible, setModalVisible] = useState(false)
  const [modalVisible2, setModalVisible2] = useState(false)
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [answer, setAnswer] = useState('');
  const [quizz, setQuizz] = useState([]);
  const [quizzTwo, setQuizTwo] = useState();
  const [isTrue, setIsTrue] = useState(false);
  const [selected, setSelected] = React.useState("");

  const dispatch = useDispatch();

  // const [quiz, SetQuiz] = useState();

  useEffect(() => {
    getQuizById()

  }, []);

  console.log(`routes: ${route.params.quiz.questions.length}`)


  const addQuestions = async () => {
    try {
      console.log("Before AxiosService");
      const response = await AxiosService("POST", `addQuestion/${quiz._id}`, true, {}, {
        question: question,
        options: options,
        answer: selected,
      });
      console.log("response ", response)
      await getQuizById();
      setModalVisible2(false)
      setIsRegenerated(false);
      setQuestion("")
      setOptions(["", "", "", ""])
      console.log("After getQuizById");
    } catch (error) {
      console.error("Error adding question:", error);
    }
  }

  // const getQuizById = async () => {
  //   try {
  //     const response = await AxiosService("POST", `getQuizForUpdate/${quiz._id}`, true);
  //     setQuizz(response.data.questions)
  //     setQuizTwo(response.data)
  //     console.log(`quizzTwo ${quizzTwo}`)
  //   } catch (error) {
  //     console.error("Error getting quiz details:", error);
  //   }
  // }

  const getQuizById = async () => {
    try {
      const response = await AxiosService("POST", `getQuizForUpdate/${quiz._id}`, true);

      // Type narrowing
      if ('data' in response) {
        // Now TypeScript knows response has a data property
        setQuizz(response.data.questions);
        setQuizTwo(response.data);
      } else {
        // Handle the case where response does not have a data property
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error getting quiz details:", error);
    }
  };


  console.log("this is quiz", JSON.stringify(quizz))

  // const fetchRegeneratedQuiz = async () => {
  //   try {
  //     dispatch(setLoader({ loader: true }))
  //     const response = await AxiosService("POST", `regenerateQuiz/${quiz._id}/${quiz.courseId}`, true, {}, { type: type });
  //     dispatch(setLoader({ loader: false }))
  //     if (response && response.data) {
  //       SetRegeneratedQuiz(response.data.data);
  //       console.log("this is ", response.data.data);
  //       setIsRegenerated(true);
  //     } else {
  //       console.log("Failed to regenerate quiz:", response.data.error);
  //     }
  //   } catch (err) {
  //     dispatch(setLoader({ loader: false }))
  //     console.log("Error fetching regenerated quiz:", err);
  //   }
  // };

  const fetchRegeneratedQuiz = async () => {
    try {
      dispatch(setLoader({ loader: true }))
      const response = await AxiosService("POST", `regenerateQuiz/${quiz._id}/${quiz.courseId}`, true, {}, { type: type });

      // Check if 'data' property exists on the response
      if ('data' in response) {
        SetRegeneratedQuiz(response.data.data);
        console.log("this is ", response.data.data);
        setIsRegenerated(true);
      } else {
        console.log("Failed to regenerate quiz: Missing data");
      }

      dispatch(setLoader({ loader: false }));
    } catch (err) {
      console.log("Error fetching regenerated quiz:", err);
      dispatch(setLoader({ loader: false }));
    }
  };


  const handleNext = () => {
    carouselRef.current?.next();
    setIsTrue(false);
  };

  const handlePrevious = () => {
    carouselRef.current.prev();
    setIsTrue(false);

  };
  const optionLabels = ["A", "B", "C", "D"];

  const onCheckAns = () => {
    SetColor("red");
    navigation.navigate("getAnswer", { quiz: quizz });
  };

  const isTrueFunc = () => {
    setIsTrue((prevIsTrue) => !prevIsTrue);
    console.log("his is", isTrue)
  }

  const renderItem = ({ item, index }) => {
    return (
      <View key={index} style={styles.carouselItem}>
        <View style={styles.box}>
          <View style={styles.questionDiv}>
            <Text
              style={{
                textAlign: "left",
                marginTop: 5,
                fontWeight: "bold",
                fontSize: 17,
                color: "white",
                marginBottom: 10,
              }}
            >
              Question {index + 1}
            </Text>

            <Text
              style={{
                textAlign: "left",
                fontSize: 13,
                marginBottom: 10,
                color: "white",
              }}
            >
              {item.question}
            </Text>
          </View>
          {item.options.map((option, optionIndex) => (
            <View key={optionIndex} style={styles.answerDiv}>
              <View
                style={[
                  {
                    // width: screenWidth * .85,
                    // marginHorizontal: 10,
                    // marginVertical: 10,
                    padding: 20,
                    paddingTop: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    borderColor: "black",
                    borderWidth: 1,
                    backgroundColor:
                      isTrue && option.optionValue === item.answer ? "#D7FFF3" : "white",
                  },
                  optionIndex === item.options.length - 1 && {
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                  },
                ]}
              >
                <Text>{optionLabels[optionIndex]}. </Text>
                <Text>{option.optionValue}</Text>
              </View>

            </View>
          ))}

        </View>

        <View style={styles.iconContainer}>
          <View style={{ flexDirection: "row", }}>
            {/* <TouchableOpacity style={styles.arrows} onPress={handlePrevious}> */}
            <TouchableOpacity style={styles.arrows}>
              <Icon name="chevron-left" size={15} color="black" onPress={handlePrevious}  />
            </TouchableOpacity>
            <Text style={{ fontSize: 30 }}>|</Text>
            {/* <TouchableOpacity style={styles.arrows} onPress={handleNext}> */}
            <TouchableOpacity style={styles.arrows} onPress={handleNext}>
              <Icon name="chevron-right" size={15} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.numQuestions}>
            <View style={styles.indexContainer}>
              <Text style={{ color: "white" }}>{index + 1}</Text>
            </View>
            <Text style={{ color: "black" }}>
              {isRegenerated ? regeneratedQuiz?.questions?.length ?? 0 : quizz?.length ?? 0}
            </Text>
          </View>

          <TouchableOpacity style={styles.arrows} onPress={handleConfirmTwo}>
            <Icon name="plus" size={15} color="black" />
          </TouchableOpacity>

        </View>
      </View>
    );
  };

  console.log(question)
  console.log(options)
  console.log(answer)

  const handleCancel = () => {
    setModalVisible(false);
    navigation.navigate("NavigationBar");
  };

  const handleCancel2 = () => {
    setModalVisible2(false);
    setQuestion('');
    setOptions(['', '', '', '']);
    setAnswer('');

  };

  const handleConfirm = () => {
    setModalVisible(true);
    navigation.navigate("NavigationBar");
  };
  const handleConfirmTwo = () => {
    setModalVisible2(true);
    console.log("Confirm Pressed");
  };


  const handleSave = () => {

  }

  const handleNavigate = () => {
    navigation.goBack();
  }

  const data = [
    { key: '1', value: 'Mobiles', disabled: true },
    { key: '2', value: 'Appliances' },
    { key: '3', value: 'Cameras' },
    { key: '4', value: 'Computers', disabled: true },
    { key: '5', value: 'Vegetables' },
    { key: '6', value: 'Diary Products' },
    { key: '7', value: 'Drinks' },
  ]

  return (
    <View style={styles.questionContainer}>

      <Headers courseText="Multiple Choice" handleNavigate={handleNavigate} display={true} courseTextDes="Feel free to edit the content" />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.centeredView}>
            <View style={styles.overlay} />
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Your quiz was successfully saved
              </Text>
              <Image source={icons.checkcircle} style={styles.checkcirclestyle} />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.createButton}
                  onPress={handleCancel}
                >
                  <Text style={styles.generateButtonText}>Return To Home</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>



        {/* ================================================================================ */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={() => {
            setModalVisible2(!modalVisible2);
          }}
        >
          <View style={styles.centeredView}>
            {/* <View style={styles.overlay} /> */}
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Enter your quiz details:</Text>

              <View style={styles.questionSection}>
                <Text style={styles.label}>Question:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={text => setQuestion(text)}
                  value={question}
                  placeholder="Enter question"
                />
              </View>

              <View style={styles.questionSection}>
                <Text style={styles.label}>Option 1:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={text => {
                    const updatedOptions = [...options];
                    updatedOptions[0] = text;
                    setOptions(updatedOptions);
                  }}
                  value={options[0]}
                  placeholder="Enter option 1"
                />
              </View>

              <View style={styles.questionSection}>
                <Text style={styles.label}>Option 2:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={text => {
                    const updatedOptions = [...options];
                    updatedOptions[1] = text;
                    setOptions(updatedOptions);
                  }}
                  value={options[1]}
                  placeholder="Enter option 2"
                />
              </View>

              <View style={styles.questionSection}>
                <Text style={styles.label}>Option 3:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={text => {
                    const updatedOptions = [...options];
                    updatedOptions[2] = text;
                    setOptions(updatedOptions);
                  }}
                  value={options[2]}
                  placeholder="Enter option 3"
                />
              </View>

              <View style={styles.questionSection}>
                <Text style={styles.label}>Option 4:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={text => {
                    const updatedOptions = [...options];
                    updatedOptions[3] = text;
                    setOptions(updatedOptions);
                  }}
                  value={options[3]}
                  placeholder="Enter option 4"
                />
              </View>

              <View style={styles.questionSection}>
                <Text style={styles.label}>Answer:</Text>
                <View>
                  <SelectList
                    setSelected={(val) => setSelected(val)}
                    data={options}
                    save="value"
                  />
                </View>
              </View>


              <View style={styles.buttonContainer2}>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={addQuestions}
                >
                  <Text style={styles.generateButtonText}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleCancel2}
                >
                  <Text style={styles.submitButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </Modal>

        {/* <Text style={styles.title}>Multiple Choice Question</Text> */}
        {/* <View style={{ marginTop: 19, alignSelf: "flex-end", marginRight: 20, flexDirection: 'row' }}> */}
        {/* <Button title='Check Answer' onPress={onCheckAns} /> */}
        {/* <Button title='regnerate Quiz' onPress={fetchRegeneratedQuiz} /> */}
        {/* </View> */}
        {/* <View style={{ padding: 10, flexDirection: "row", justifyContent: "center" }}> */}
        {/* <Carousel
              ref={carouselRef}
              layout="default"
              data={isRegenerated ? regeneratedQuiz.questions : quizz}
              renderItem={renderItem}
              sliderWidth={width}
              itemWidth={width}
              scrollEnabled={false}
            /> */}
        <Carousel
          data={isRegenerated ? regeneratedQuiz?.questions ?? [] : quizz ?? []}
          renderItem={renderItem}
          width={screenWidth * .9}
          height={screenHeight * .65}
          style={styles.questionCard}
          ref={carouselRef}
          
        />
        {/* </View> */}
        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, marginBottom:30,  gap:50  }}>
        <View style={{ marginTop: 30, alignSelf: "flex-end", marginRight: 20 }}>
          <Button title='Check Answer' onPress={onCheckAns} />
        </View>
        <View style={{ backgroundColor: "white",borderColor:"black", justifyContent: "center", width : 150, borderRadius:10 }}><Button color="black" title="Download PDF" onPress={handleCancel} /></View>
        <View style={{ backgroundColor: "#A1A1A1", justifyContent: "center", width:150, borderRadius:10 }}><Button color="black" title="Save Quiz" onPress={handleConfirm}  /></View>
      </View> */}
        <View style={styles.buttonContainer}>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={isTrueFunc}
            >
              <Text style={styles.cancelButtonText} numberOfLines={1}
              >Get Answer</Text>

            </TouchableOpacity>

            <TouchableOpacity
              style={styles.generateButton}
              onPress={handleConfirm}
            >
              <Text style={styles.generateButtonText} numberOfLines={1}
              >Save</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              onPress={handleCancel}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: COLORS.primary,
                alignItems: "center",
              }}
            >
              <Text onPress={onCheckAns}>View All Answers</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => { }}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: COLORS.primary,
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text onPress={fetchRegeneratedQuiz}>Regenerate the quiz</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  questionContainer: {
    paddingHorizontal: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: "center",
  },
  title: {
    fontSize: SIZES.large,
    // marginTop: 75,
    fontWeight: "bold",
    textAlign: "center",
  },
  carouselItem: {
    alignItems: "center",
    width: '100%',
    paddingHorizontal: 10,
  },
  questionCard: {
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
  },
  createButton: {
    backgroundColor: COLORS.button,
    // paddingVertical: 15,
    // paddingHorizontal: 30,
    borderRadius: 30,
    textAlign: "center",
  },

  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: 'space-evenly',
    marginTop: 10,
    width: '100%',
  },
  btnContainer: {
    display: 'flex',
    flexDirection: "row",
    width: '100%',
    justifyContent: "space-between",
    paddingBottom: 10,
    // marginTop: 20,
  },
  cancelButton: {
    backgroundColor: COLORS.lightGray,
    borderWidth: 1,
    borderColor: COLORS.button,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    width: '49%',
  },
  generateButton: {
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 1,
    width: '49%',
    paddingVertical: 10,

  },
  cancelButtonText: {
    fontSize: SIZES.large,
    color: COLORS.button,
    textAlign: "center",
    paddingHorizontal: 0,
    marginHorizontal: 0,
  },
  generateButtonText: {
    fontSize: SIZES.large,
    color: COLORS.midTeal,
    textAlign: "center",
    width: '100%',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 32,
    padding: 20,
    width: '100%',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 10,
    marginTop: 10,
    fontSize: SIZES.xLarge,
    textAlign: "center",
    fontWeight: 'bold',
  },
  answerTextInput: {
    marginBottom: 10,
    marginTop: 10,
    fontSize: SIZES.medium,
    textAlign: "center",
  },
  questionSection: {
    width: "100%",

  }
  ,
  checkcirclestyle: {
    width: 40,
    height: 40,
    margin: 30,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  questionDiv: {
    backgroundColor: COLORS.primary,
    padding: 10,
    width: "100%",
    // marginHorizontal:20,
    // height: 100,
    borderTopRightRadius: SIZES.medium,
    borderTopLeftRadius: SIZES.medium,
    justifyContent: "space-between",
    borderColor: "black",
    borderWidth: 1,
  },
  answerDiv: {
    width: '100%',
  },
  options: {
    width: '100%',
    // padding: 20,
    flexDirection: "row",
  },
  box: {
    alignItems: "center",
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    // borderColor: "black",
    // borderWidth: 1,
    // height: 400,
    width: '100%',
  },
  // separator: {
  //   height: 1,
  //   // backgroundColor: "black",
  // },

  iconContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: "row",
    flexWrap: 'nowrap',
    justifyContent: "space-between",
    paddingVertical: 10,
    alignItems: "center",
    // gap: 50
  },
  numQuestions: {
    flexDirection: "row",
    gap: 10,
    fontSize: 16,
    alignItems: "center",
  },
  indexContainer: {
    backgroundColor: "black",
    borderRadius: 8,
    paddingHorizontal: 10,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  arrows: {
    backgroundColor: "#F4F6F9",
    // backgroundColor: COLORS.lightGray,
    borderRadius: 24,
    paddingHorizontal: 10,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: "center"
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginBottom: 10,
    width: "100%",
    textAlign: "center"
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    width: '45%',
    marginBottom: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: "center"
  },
  buttonContainer2: {
    display: 'flex',
    marginTop: 20,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 10,
  }
});

export default MultipleChoiceQue;
