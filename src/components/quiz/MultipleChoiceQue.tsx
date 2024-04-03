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
import Carousel from "react-native-snap-carousel";
import { icons, images, SHADOWS } from "../../constants";
import { COLORS, SIZES } from "../../constants";
import { NavigationProp } from "@react-navigation/native";
import AxiosService from "../../services/axios.js";
import Icon from "react-native-vector-icons/FontAwesome";
import Headers from "../../common/Headers";
import { useDispatch } from "react-redux";
import { setLoader } from '../../redux/user';
import { SelectList } from 'react-native-dropdown-select-list'
import Picker from "react-native";



const { width } = Dimensions.get("window");

const MultipleChoiceQue = ({ route, navigation }) => {
  const { quiz, type } = route.params
  const carouselRef = useRef(null);
  // const [currentIndex, setCurrentIndex] = useState(0);
  const [color, SetColor] = useState("");
  const [regeneratedQuiz, SetRegeneratedQuiz] = useState(null);
  const [isRegenerated, setIsRegenerated] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(0);




  const [modalVisible, setModalVisible] = useState(false)
  const [modalVisible2, setModalVisible2] = useState(false)
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [answer, setAnswer] = useState('');
  const [quizz, setQuizz] = useState();
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

  const getQuizById = async () => {
    try {
      const response = await AxiosService("POST", `getQuizForUpdate/${quiz._id}`, true);
      setQuizz(response.data.questions)
      setQuizTwo(response.data)
      console.log(`quizzTwo ${quizzTwo}`)
    } catch (error) {
      console.error("Error getting quiz details:", error);
    }
  }


  console.log("this is quiz", JSON.stringify(quizz))




  const fetchRegeneratedQuiz = async () => {
    try {

      dispatch(setLoader({ loader: true }))
      const response = await AxiosService("POST", `regenerateQuiz/${quiz._id}/${quiz.courseId}`, true, {}, { type: type });
      dispatch(setLoader({ loader: false }))
      if (response && response.data) {
        SetRegeneratedQuiz(response.data.data);
        console.log("this is ", response.data.data);
        setIsRegenerated(true);


      } else {
        console.log("Failed to regenerate quiz:", response.data.error);

      }
    } catch (err) {
      dispatch(setLoader({ loader: false }))
      console.log("Error fetching regenerated quiz:", err);
    }
  };







  const handleNext = () => {
    carouselRef.current.snapToNext();
    setIsTrue(false);
  };

  const handlePrevious = () => {
    carouselRef.current.snapToPrev();
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
              }}
            >
              Question {index + 1}
            </Text>

            <Text
              style={{
                textAlign: "left",
                fontSize: 13,
                marginBottom: 17,
                color: "white",
              }}
            >
              {item.question}
            </Text>
          </View>
          {item.options.map((option, optionIndex) => (
            <View key={optionIndex}>
              <View
                style={[
                  {
                    width: 350,
                    padding: 20,
                    paddingTop: 35,
                    flexDirection: "row",
                    alignItems: "center",
                    borderColor: "black",
                    borderWidth: 0.5,
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
            <TouchableOpacity style={styles.arrows} onPress={handlePrevious}>
              <Icon name="chevron-left" size={15} color="black" />
            </TouchableOpacity>
            <Text style={{ fontSize: 30 }}>|</Text>
            <TouchableOpacity style={styles.arrows} onPress={handleNext}>
              <Icon name="chevron-right" size={15} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.numQuestions}>
            <View style={styles.indexContainer}>
              <Text style={{ color: "white" }}>{index + 1}</Text>
            </View>

            <Text style={{ color: "black" }}>/</Text>
            <Text style={{ color: "black" }}>{isRegenerated ? regeneratedQuiz.questions.length : quizz.length}</Text>
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
    <View>

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
            <View style={styles.overlay} />
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Enter your quiz details:</Text>

              
              <Text style={styles.label}>Question:</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => setQuestion(text)}
                value={question}
                placeholder="Enter question"
              />


              <View>
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

              <View>
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

              <View>
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

              <View>
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





              {/*
              <TextInput
                style={styles.input}
                onChangeText={text => setAnswer(text)}
                value={answer}
                placeholder="Enter the correct answer"
              /> */}


              <Text style={styles.label}>Answer:</Text>
              <View style={{ width: 200 }}>
                <SelectList
                  setSelected={(val) => setSelected(val)}
                  data={options}
                  save="value"
                />
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
        <View style={{ marginTop: 19, alignSelf: "flex-end", marginRight: 20, flexDirection: 'row' }}>
          {/* <Button title='Check Answer' onPress={onCheckAns} /> */}
          {/* <Button title='regnerate Quiz' onPress={fetchRegeneratedQuiz} /> */}
        </View>
        <View style={{ padding: 30 }}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Carousel
              ref={carouselRef}
              layout="default"
              data={isRegenerated ? regeneratedQuiz.questions : quizz}
              renderItem={renderItem}
              sliderWidth={width}
              itemWidth={width}
              scrollEnabled={false}
            />
          </View>
        </View>
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
              style={[styles.button, styles.cancelButton]}
              onPress={isTrueFunc}
            >
              <Text style={styles.cancelButtonText}>Get Answer</Text>

            </TouchableOpacity>
            {/* <Text onPress={isTrueFunc} style={styles.cancelButtonText}>Get Answers2</Text> */}
            <TouchableOpacity
              style={[styles.button, styles.generateButton]}
              onPress={handleConfirm}
            >
              <Text style={styles.generateButtonText}>Save</Text>
            </TouchableOpacity>
          </View>

          {/* <View style={{  justifyContent: "center", width : 150, borderRadius:10 }}><Button  title="Download PDF" onPress={handleCancel} /></View> */}
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
  scrollViewContent: {
    flexGrow: 1,
    // marginRight:30,
    alignItems: "center",
  },
  title: {
    fontSize: 23,
    marginTop: 75,
    fontWeight: "bold",
    textAlign: "center",
  },
  carouselItem: {
    width: width - 30,
    height: 520,
    alignItems: "center",

  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  createButton: {
    backgroundColor: COLORS.button,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    textAlign: "center",
  },

  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
    // justifyContent: 'space-evenly',
    paddingBottom: 20,
    // marginTop: 20,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20,
    // marginTop: 20,
  },
  cancelButton: {
    backgroundColor: COLORS.lightGray,
    borderWidth: 1,
    borderColor: COLORS.button,
    // paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    // paddingHorizontal: 30,
    borderRadius: 30,
    marginRight: 10,
    width: 164,
    height: 54,
  },
  generateButton: {
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 1,
    width: 164,
    height: 54,
  },
  cancelButtonText: {
    fontSize: SIZES.large,
    color: COLORS.button,
    textAlign: "center",
  },
  generateButtonText: {
    fontSize: SIZES.large,
    color: COLORS.midTeal,
    textAlign: "center",
    width:60
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
    width: 300,
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
    fontSize: SIZES.medium,
    textAlign: "center",
  },
  answerTextInput: {
    marginBottom: 10,
    marginTop: 10,
    fontSize: SIZES.medium,
    textAlign: "center",
  },
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
    height: 100,
    borderTopRightRadius: SIZES.medium,
    borderTopLeftRadius: SIZES.medium,
    justifyContent: "space-between",
    borderColor: "black",
    borderWidth: 1,
  },
  options: {
    width: 350,
    padding: 20,
    flexDirection: "row",
  },
  box: {
    alignItems: "center",
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    // borderColor: "black",
    // borderWidth: 1,

    height: 400,
    width: 350,
  },
  // separator: {
  //   height: 1,
  //   // backgroundColor: "black",
  // },

  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: "10%",
    alignItems: "center",
    gap: 50


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
    height: 44,
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
    textAlign:"center"
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 60,
    paddingVertical: 8,
    marginBottom: 10,
    width:"80%",
    textAlign:"center"
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    width:70,
    textAlign:"center"
  },
  buttonContainer2: {
    marginTop:20,
    flexDirection: 'row',
    gap: 10,
  }
});

export default MultipleChoiceQue;
