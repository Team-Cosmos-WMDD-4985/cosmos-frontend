import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Dimensions, TextInput, ScrollView, Modal, Image, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { icons, images } from "../../constants";
import { COLORS, SIZES } from "../../constants";
import { NavigationProp } from '@react-navigation/native';
import AxiosService from '../../services/axios.js'

const { width } = Dimensions.get('window');

const MultipleChoiceQue = ({route, navigation}) => {
  const { quiz } = route.params
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [color, SetColor] = useState("");
  // const [quiz, SetQuiz] = useState();
  

console.log(`routes: ${route.params.quiz.questions.length}`)
 



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

  const onCheckAns = () => {
    SetColor("red")
    navigation.navigate('getAnswer', { quiz: quiz });
  }

  console.log(color);
console.log("this is quiz",quiz)


const renderItem = ({ item, index }) => {
  return (
    <View key={index} style={styles.carouselItem}>
      <View style={styles.questionDiv}>
        <Text style={{ textAlign: 'left', marginTop: 5, fontWeight: 'bold', fontSize: 17, color: "white" }}>Question {index + 1}</Text>
        <Text style={{ textAlign: 'left', fontSize: 13, marginBottom: 17, color: "white" }}>{item.question}</Text>
      </View>
      {item.options.map((option, optionIndex) => (
        <View key={optionIndex} style={styles.options}>
          <Text>{option.optionValue}</Text>
        </View>
      ))}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
        <View style={{ width: 100, height: 50, alignItems: "center", justifyContent: "center", borderRadius: 5 }}>
          <Button color="black" title="Previous" onPress={handlePrevious} />
        </View>
        <View style={{ width: 100, alignItems: "center", justifyContent: "center", borderRadius: 5 }}>
          <Button color="black" title="Next" onPress={handleNext} />
        </View>
      </View>
    </View>
  );
};




  const [modalVisible, setModalVisible] = useState(false)

  const handleCancel = () => {
    setModalVisible(false);
    navigation.navigate('NavigationBar')
    console.log("Cancel Pressed");
  };

  const handleConfirm = () => {
    setModalVisible(true);
    console.log("Confirm Pressed");

  };
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);

        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.overlay} />
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Your quiz was successfully saved</Text>
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

      {/* =============== Main View ================== */}
      <Text style={styles.title}>Multiple Choice Question</Text>
      <View style={{ marginTop: 30, alignSelf: "flex-end", marginRight: 20 }}>
        <Button title='Check Answer' onPress={onCheckAns} />
      </View>
      <View style={{ padding: 30 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
          <Carousel
            ref={carouselRef}
            layout="default"
            data={quiz.questions}
            renderItem={renderItem}
            sliderWidth={width}
            itemWidth={width}
            // loop
            // onSnapToItem={index => setCurrentIndex(index)}
          />
        </View>

      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, marginBottom:30,  gap:50  }}>
        <View style={{ backgroundColor: "white",borderColor:"black", justifyContent: "center", width : 150, borderRadius:10 }}><Button color="black" title="Download PDF" onPress={handleCancel} /></View>
        <View style={{ backgroundColor: "#A1A1A1", justifyContent: "center", width:150, borderRadius:10 }}><Button color="black" title="Save Quiz" onPress={handleConfirm}  /></View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 23,
    marginTop: 75,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  carouselItem: {
    width: width - 30,
    height: 550,
    // backgroundColor: '#D9D9D9',
    borderRadius: 10,
    padding: 20,
    alignItems:"center"
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
  },
  cancelButtonText: {
    fontSize: SIZES.large,
    color: COLORS.button,
    textAlign: 'center',
  },
  generateButtonText: {
    fontSize: SIZES.large,
    color: COLORS.white,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 20,
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: COLORS.lightGray,
    borderWidth: 1,
    borderColor: COLORS.button,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginRight: 10,
  },

  modalView: {
    backgroundColor: "white",
    borderRadius: 32,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.75,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalText: {
    marginBottom: 10,
    marginTop: 10,
    fontSize: SIZES.medium,
    textAlign: "center"
  },
  answerTextInput: {
    marginBottom: 10,
    marginTop: 10,
    fontSize: SIZES.medium,
    textAlign: "center"
  },
  checkcirclestyle: {
    width: 40,
    height: 40,
    margin: 30
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  questionDiv:{
    backgroundColor:"black",
    padding:10,
    width: 350,
    height: 100,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  options: {
    width: 350,
    borderColor: "black",
    borderWidth: 0.5, 
    padding: 20,
    
  }
});

export default MultipleChoiceQue;
