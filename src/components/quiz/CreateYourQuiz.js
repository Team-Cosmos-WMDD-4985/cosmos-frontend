

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import AxiosService from "../../services/axios";
import { COLORS, SIZES } from "../../constants";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import Headers from "../../common/Headers";
import { useDispatch } from "react-redux";
import { setLoader } from '../../redux/user';


const CreateYourQuiz = ({ route, navigation }) => {
  const { topics, courseId } = route.params;
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [numQuestions, setNumQuestions] = useState("");

  const dispatch = useDispatch();

  const handleTypeSelection = (selectedType) => {
    setType(selectedType);
  };

  const handleDifficultySelection = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
  };

  // const sendQuizInfo = async () => {
  //   // navigation.navigate("MultipleChoiceQue");
  //   navigation.navigate("MultipleChoiceQue", { quiz: response.data.data });
  //   try {
  //     const response = await AxiosService(
  //       "POST",
  //       "sendTopics",
  //       true,
  //       {},
  //       { topics, courseId, name, type, difficulty, numQuestions }
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const sendQuizInfo = async () => {
    try {
      dispatch(setLoader({loader: true}))
      const response = await AxiosService(
        "POST",
        "sendTopics",
        true,
        {},
        { topics, courseId, name, type, difficulty, numQuestions }
      );
      dispatch(setLoader({loader: false}))
      if (response.data.success) {
        navigation.navigate("MultipleChoiceQue", {
          quiz: response.data.data,
          name: name,
          courseId: courseId,
          type: type,
          topics: topics,
          difficulty: difficulty,
          numQuestions: numQuestions
        });
      }
    } catch (err) {
      dispatch(setLoader({loader: false}))
      console.log(err);
    }
  };
  const clearName = () => {
    setName("");
  };
  const decreaseNumQuestions = () => {
    if (Number(numQuestions) > 0) {
      setNumQuestions(Number(numQuestions) - 1);
    }
  };

  const increaseNumQuestions = () => {
    if (Number(numQuestions) < 30) {
      setNumQuestions(Number(numQuestions) + 1);
    }
  };

  const handleNavigate = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.flexContainer}>
      <Headers courseText="Quizzes" display={true} handleNavigate={handleNavigate} courseTextDes="course Detail" />

      <View style={styles.container}>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Quiz Name</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="Advanced Graphic Techniques Quiz"
              value={name}
              onChangeText={setName}
            />
            <TouchableOpacity onPress={clearName} style={styles.clearButton}>
              <Icon name="close-circle" size={20} color={COLORS.black} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Question Type</Text>
          {["True or False", "Multiple Choice", "Long/Short Answer"].map(
            (option, index) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.qInput,
                  type === option && styles.selectedButton,
                ]}
                onPress={() => handleTypeSelection(option)}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Icon
                    name={
                      type === option
                        ? "checkbox-marked"
                        : "checkbox-blank"
                    }
                    size={24}
                    color={COLORS.black}
                  />
                  <Text style={styles.buttonText}>{option}</Text>
                </View>
              </TouchableOpacity>
            )
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Level</Text>
          <View style={styles.buttonDiv}>
            {["EASY", "MEDIUM", "HARD"].map((level, index) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.button,
                  difficulty === level && styles.selectedButton,
                ]}
                onPress={() => handleDifficultySelection(level)}
              >
                <Text style={styles.buttonText}>{level}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Number of Questions</Text>
          <View style={styles.numberInputContainer}>
            <TextInput
              // style={styles.input}
              placeholder="30 items"
              keyboardType="number-pad"
              value={numQuestions.toString()}
              onChangeText={setNumQuestions}
            />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* <TouchableOpacity onPress={decreaseNumQuestions} style={styles.iconButton}>
                            <Icon name="minus-circle" size={20} color={COLORS.midGray}/>
                        </TouchableOpacity>
                        <Text style={styles.separator}>|</Text>
                        <TouchableOpacity onPress={increaseNumQuestions} style={styles.iconButton}>
                            <Icon name="plus-circle" size={20} color={COLORS.midGray}/>
                        </TouchableOpacity> */}
              <TouchableOpacity
                onPress={decreaseNumQuestions}
                style={styles.iconButton}
              >
                <FontAwesomeIcon
                  icon={faCircleMinus}
                  size={20}
                  color={COLORS.midGray}
                />
              </TouchableOpacity>
              <Text style={styles.separator}>|</Text>
              <TouchableOpacity
                onPress={increaseNumQuestions}
                style={styles.iconButton}
              >
                <FontAwesomeIcon
                  icon={faCirclePlus}
                  size={20}
                  color={COLORS.midGray}
                />
              </TouchableOpacity>
            </View>
          </View>
          <TextInput style={styles.helperText}>Maximum of 30 questions only</TextInput>
        </View>
        {/* <View style={styles.inputContainer}>
                    <Text style={styles.label}>Number of Questions</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="30 items"
                        keyboardType="number-pad"
                        value={numQuestions}
                        onChangeText={setNumQuestions}
                    />
                    <Text style={styles.helperText}>Maximum of 30 questions only</Text>
                </View> */}
        {/* <TouchableOpacity style={styles.button} onPress={() => sendQuizInfo()}>
                    <Text style={styles.buttonText}>Create Quiz</Text>
                </TouchableOpacity> */}
        <View style={styles.buttonContainer1}>
          {/* <TouchableOpacity
            style={[styles.button1, styles.cancelButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={[styles.button1, styles.generateButton]}
            onPress={() => sendQuizInfo()}
          >
            <Text style={styles.generateButtonText}>Create Quiz</Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    backgroundColor: "#fff",
    // marginTop: 20,
    // alignItems: "center",
    borderColor: COLORS.midGray,
    // paddingHorizontal: 20,
  },
  formContainer: {
    width: "80%",
    justifyContent: "space-around",

  },
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 20,



  },
  label: {
    fontSize: 20,
    marginBottom: 2,

  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.midGray,
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 8,
    height: 54,
  },
  helperText: {
    fontSize: 12,
    color: COLORS.primary,
    marginTop: 5,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 30,
    borderColor: COLORS.midGray,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 20,
    justifyContent: "center",
    height: 48,
    marginTop: 10,
  },
  buttonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
  buttonDiv: {
    flexDirection: "row",
    justifyContent: "space-between",


  },
  selectedButton: {
    backgroundColor: COLORS.lightTeal,
  },
  buttonContainer1: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 70,
  },
  button1: {
    paddingVertical: 10,
    width: "100%",
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 20,
  },
  cancelButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.midGray,
    padding: 15,
  },
  generateButton: {
    backgroundColor: COLORS.primary,
  },
  cancelButtonText: {
    fontSize: SIZES.large,
    color: COLORS.midGray,
    textAlign: "center",
  },
  generateButtonText: {
    fontSize: SIZES.large,
    color: COLORS.midTeal,
    textAlign: "center",

  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.midGray,
    borderRadius: 30,
    paddingHorizontal: 0,
    paddingVertical: 10,
    height: 54,
    paddingLeft: 10,
  },
  clearButton: {
    position: "absolute",
    right: 10,
  },
  numberInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    borderWidth: 1,
    borderColor: COLORS.midGray,
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 10,
    height: 54,
  },
  iconButton: {
    padding: 5,
  },
  separator: {
    marginHorizontal: 5,
    fontSize: 20,
    color: COLORS.midGray,
  },
  iconWrapper: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.midGray,
    padding: 5,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 30,
    marginTop: 40,
    width: '100%',
    height: 54,
  },
  qInput: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 30,
    borderColor: COLORS.midGray,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 20,

    height: 48,
    marginTop: 10,
  }
});

export default CreateYourQuiz;
