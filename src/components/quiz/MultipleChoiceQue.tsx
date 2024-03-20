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
  const { quiz } = route.params;
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [color, setColor] = useState("");

  const handleNext = () => {
    carouselRef.current.snapToNext();
  };

  const handlePrevious = () => {
    carouselRef.current.snapToPrev();
  };
  const optionLabels = ["A", "B", "C", "D"];

  const onCheckAns = () => {
    setColor("red");
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
          <TouchableOpacity style={styles.arrows} onPress={handleNext}>
            <Icon name="plus" size={15} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const [modalVisible, setModalVisible] = useState(false);

  const handleCancel = () => {
    setModalVisible(false);
    navigation.navigate("NavigationBar");
  };

  const handleConfirm = () => {
    setModalVisible(true);
    navigation.navigate("NavigationBar");
  };

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
      <View style={{ padding: 30 }}>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Carousel
            ref={carouselRef}
            layout="default"
            data={quiz.questions}
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
            <Text>Regenerate the quiz</Text>
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
