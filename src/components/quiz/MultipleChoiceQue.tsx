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
import Carousel from "react-native-snap-carousel";
import { icons, images, SHADOWS } from "../../constants";
import { COLORS, SIZES } from "../../constants";
import { NavigationProp } from "@react-navigation/native";
import AxiosService from "../../services/axios.js";
import Icon from "react-native-vector-icons/FontAwesome";

const { width } = Dimensions.get("window");

const MultipleChoiceQue = ({ route, navigation }) => {
  const { quiz, type } = route.params
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [color, SetColor] = useState("");
  const [regeneratedQuiz, SetRegeneratedQuiz] = useState(null);
  const [isRegenerated, setIsRegenerated] = useState(false);



  const [modalVisible, setModalVisible] = useState(false)
  const [modalVisible2, setModalVisible2] = useState(false)
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [answer, setAnswer] = useState('');
  const [quizz, setQuizz] = useState();

  // const [quiz, SetQuiz] = useState();

  useEffect(() => {

    console.log(`this is type${type}`)
  }, []);

  console.log(`routes: ${route.params.quiz.questions.length}`)



  const addQuestions = async () => {
    try {
        const response = await AxiosService("POST", `addQuestion/${quiz._id}`, true, {}, { question: question, options: options, answer: answer });
        await getQuizById();
    } catch (error) {
        console.error("Error adding question:", error);
    }
}

const getQuizById = async () => {
    try {
        const response = await AxiosService("POST", `getQuizForUpdate/${quiz._id}`, true);
        console.log("Updated quiz details:", response.data);
        setQuizz(response.data)
    } catch (error) {
        console.error("Error getting quiz details:", error);
    }
}

  const fetchRegeneratedQuiz = async () => {
    try {
      const response = await AxiosService("POST", `regenerateQuiz/${quiz._id}/${quiz.courseId}`, true, {}, { type: type });
      if (response && response.data) {
        SetRegeneratedQuiz(response.data.data);
        console.log("this is ", response.data.data);
        setIsRegenerated(true);


      } else {
        console.log("Failed to regenerate quiz:", response.data.error);

      }
    } catch (err) {
      console.log("Error fetching regenerated quiz:", err);
    }
  };




  // const question = [
  //   { title: 'question 1', question: "Q.Which of the following best defines branding?", options: ['A.The process of designing a logo for a company.', 'B.The process of designing a logo for a company.', 'C.The process of designing a logo for a company.', 'D.The process of designing a logo for a company.'] },
  //   { title: 'question 2', question: "Where do you live?", options: ['A.The process of designing a logo for a company.', 'B.The process of designing a logo for a company.', 'C.The process of designing a logo for a company.', 'D.The process of designing a logo for a company.'] },
  //   { title: 'question 3', question: "What's your name?", options: ['A.The process of designing a logo for a company.', 'B.The process of designing a logo for a company.', 'C.The process of designing a logo for a company.', 'D.The process of designing a logo for a company.'] },
  //   { title: 'question 5', question: "What's dad name?", true: ['True', 'False'] },
  //   { title: 'question 6', question: "What's dad name?", options: ['Red', 'Blue', 'Green', 'blue'] },
  //   { title: 'question 7', question: "What's dad name?", options: ['Red', 'Blue', 'Green', 'blue'] },
  //   { title: 'question 8', question: "What's dad name?", options: ['Red', 'Blue', 'Green', 'blue'] },
  // ];



  const handleNext = () => {
    carouselRef.current.snapToNext();
  };

  const handlePrevious = () => {
    carouselRef.current.snapToPrev();
  };
  const optionLabels = ["A", "B", "C", "D"];

  const onCheckAns = () => {
    SetColor("red");
    navigation.navigate("getAnswer", { quiz: quiz });
  };

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
              <View style={styles.options}>
                <Text>{optionLabels[optionIndex]}. </Text>
                <Text>{option.optionValue}</Text>
              </View>
              {optionIndex !== item.options.length - 1 && (
                <View style={styles.separator}></View>
              )}
            </View>
          ))}
        </View>
        <View style={styles.iconContainer}>
          <View style={{ flexDirection: "row" }}>
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
            <Text style={{ color: "black" }}>{quiz.totalQuestion}</Text>
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
    navigation.navigate("NavigationBar");
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


  return (
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

            {/* Input for the question */}
            <Text style={styles.label}>Question:</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => setQuestion(text)}
              value={question}
              placeholder="Enter your question"
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



            <Text style={styles.label}>Answer:</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => setAnswer(text)}
              value={answer}
              placeholder="Enter the correct answer"
            />

            <View style={styles.buttonContainer}>
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

      <Text style={styles.title}>Multiple Choice Question</Text>
      <View style={{ marginTop: 30, alignSelf: "flex-end", marginRight: 20, flexDirection: 'row' }}>
        <Button title='Check Answer' onPress={onCheckAns} />
        <Button title='regnerate Quiz' onPress={fetchRegeneratedQuiz} />
      </View>
      <View style={{ padding: 30 }}>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Carousel
            ref={carouselRef}
            layout="default"
            data={isRegenerated ? regeneratedQuiz.questions : quiz.questions}
            renderItem={renderItem}
            sliderWidth={width}
            itemWidth={width}

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
            onPress={onCheckAns}
          >
            <Text style={styles.cancelButtonText}>Get Answers</Text>
          </TouchableOpacity>
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
            <Text>Download PDF</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {}}
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
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
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
    height: 550,
    padding: 20,
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
    // paddingHorizontal: 30,
    borderRadius: 30,
    marginRight: 10,
    width: 184,
    height: 54,
  },
  generateButton: {
    backgroundColor: COLORS.primary,
    // paddingVertical: 15,
    // paddingHorizontal: 30,
    borderRadius: 30,
    borderWidth: 1,
    width: 184,
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
    borderColor: "black",
    borderWidth: 1,
    height: 400,
    width: 350,
  },
  separator: {
    height: 1,
    backgroundColor: "black",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    alignItems: "center",
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
    borderRadius: 24,
    paddingHorizontal: 10,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MultipleChoiceQue;
