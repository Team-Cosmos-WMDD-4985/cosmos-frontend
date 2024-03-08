import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Button, Dimensions, TextInput, ScrollView, Modal, Image, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { icons, images } from "../../constants";
import { COLORS, SIZES } from "../../constants";
import { NavigationProp } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const MultipleChoiceQue = ({navigation}) => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [color, SetColor] = useState("");
  



  const question = [
    { title: 'question 1', question: "Q.Which of the following best defines branding?", options: ['A.The process of designing a logo for a company.', 'B.The process of designing a logo for a company.', 'C.The process of designing a logo for a company.', 'D.The process of designing a logo for a company.'] },
    { title: 'question 2', question: "Where do you live?", options: ['A.The process of designing a logo for a company.', 'B.The process of designing a logo for a company.', 'C.The process of designing a logo for a company.', 'D.The process of designing a logo for a company.'] },
    { title: 'question 3', question: "What's your name?", options: ['A.The process of designing a logo for a company.', 'B.The process of designing a logo for a company.', 'C.The process of designing a logo for a company.', 'D.The process of designing a logo for a company.'] },
    { title: 'question 5', question: "What's dad name?", true: ['True', 'False'] },
    { title: 'question 6', question: "What's dad name?", options: ['Red', 'Blue', 'Green', 'blue'] },
    { title: 'question 7', question: "What's dad name?", options: ['Red', 'Blue', 'Green', 'blue'] },
    { title: 'question 8', question: "What's dad name?", options: ['Red', 'Blue', 'Green', 'blue'] },
  ];

  const handleNext = () => {
    if (currentIndex < question.length - 1) {
      carouselRef.current.snapToNext();
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      carouselRef.current.snapToPrev();
      setCurrentIndex(prevIndex => prevIndex - 1);
    }
  };

  const onCheckAns = () => {
    SetColor("red")
    
  }

  console.log(color);



  const renderItem = ({ item, index }) => {
    return (
      <View key={index} style={styles.carouselItem}>
        <Text style={{ textAlign: 'center', marginBottom: 40, marginTop: 10, fontWeight: 'bold', fontSize: 17 }}>{item.title}/30</Text>
        <Text style={{ textAlign: 'left', marginLeft: 10, fontWeight: 'bold', fontSize: 18, marginBottom: 17 }}>{item.question}</Text>
        {item.options ? (
          <View>
            {item.options.map((option, optionIndex) => (
              <View key={optionIndex} style={{ backgroundColor: "lightgrey", margin: 10, borderRadius: 5, }}><Button key={optionIndex} title={option} color="black" /></View>
            ))}
          </View>
        ) : (
          <TextInput style={styles.answerTextInput} placeholder="Enter your answer..." />
        )}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
          <View style={{ backgroundColor: "#A1A1A1", width: 100, height: 50, alignItems: "center", justifyContent: "center", borderRadius: 5 }}><Button color="black" title="Previous" onPress={handlePrevious} disabled={currentIndex === 0} /></View>
          <View style={{ backgroundColor: "#A1A1A1", width: 100, alignItems: "center", justifyContent: "center", borderRadius: 5 }}><Button color="black" title="Next" onPress={handleNext} disabled={currentIndex === question.length - 1} /></View>
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
            data={question}
            renderItem={renderItem}
            sliderWidth={width}
            itemWidth={width}
            loop
            onSnapToItem={index => setCurrentIndex(index)}
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
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    padding: 20
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
});

export default MultipleChoiceQue;
