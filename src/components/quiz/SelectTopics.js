
import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, icons, images, SIZES, WEIGHT } from "../../constants";

const SelectTopics = ({ route, navigation }) => {
  const { topics } = route.params;
  const [selectedTopics, setSelectedTopics] = useState(
    topics.map((topic) => ({ name: topic, selected: false }))
  );
  const [modalVisible, setModalVisible] = useState(false);

  const toggleTopic = (index) => {
    setSelectedTopics((currentSelectedTopics) =>
      currentSelectedTopics.map((t, i) =>
        i === index ? { ...t, selected: !t.selected } : t
      )
    );
  };

  const goToGenerateByAi = () => {
    const filteredTopics = selectedTopics
      .filter((topic) => topic.selected)
      .map((topic) => topic.name);
    navigation.navigate("CreateYourQuiz");
    // navigation.navigate("GenerateQuizByAi", { selectedTopics: filteredTopics });
  };

  const handleOptionSelect = (option) => {
    setModalVisible(false);
    if (option === 'Generate by AI') {
      goToGenerateByAi();
    } else {
      // YOu can write the codes for handling the 'By yourself' option
    }
  };

  const renderTopicItem = ({ item, index }) => (
    <TouchableOpacity
      style={[styles.topicItem, item.selected ? styles.topicItemSelected : {}]}
      onPress={() => toggleTopic(index)}
    >
      <Icon
        name={item.selected ? "checkbox-outline" : "checkbox-blank-outline"}
        size={24}
        color="#000"
        style={styles.checkboxIcon}
      />
      <View style={styles.textContainer}>
        <Text style={styles.weekText}>{`Week ${index + 1}:`}</Text>
        <Text style={styles.topicText}>{item.name}</Text>
      </View>
    </TouchableOpacity>

  );

  return (
    <View style={styles.flexContainer}>
      {/* <ScrollView style={styles.container}> */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Prepare your Quiz</Text>
        <View />
      </View>
      <Text style={styles.introText}>
        Select your topics to create a quiz
      </Text>
      <FlatList
        data={selectedTopics}
        renderItem={renderTopicItem}
        keyExtractor={(item, index) => `topic-${index}`}
      />
      {/* </ScrollView> */}
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('OpenAi')}>
        <Text style={styles.addButtonText}>Chat With AI</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.createQuizButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.createQuizButtonText}>Create Quiz</Text>
      </TouchableOpacity>

      <Modal

        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Icon name="close" style={styles.closeIcon} />
            </TouchableOpacity>
            <Text style={styles.modalText}>How do you want to create your quiz?</Text>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleOptionSelect('By yourself')}
            >
              <Text style={styles.optionButtonText}>By yourself</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleOptionSelect('Generate by AI')}
            >
              <Text style={styles.optionButtonText}>Generate by AI</Text>
            </TouchableOpacity>
          </View>
        </View>

      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    backgroundColor: "#fff"
  },
  container: {
    backgroundColor: "#fff",
    marginTop: 60
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  headerTitle: {
    fontSize: SIZES.large,
    // fontWeight: WEIGHT.bold,
    color: COLORS.primary,
  },
  introText: {
    textAlign: "center",
    padding: 10,
  },
  topicItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  topicItemSelected: {
    backgroundColor: "#D9D9D9",
  },
  checkboxIcon: {
    marginRight: 10,
  },
  weekText: {
    marginRight: 10,
    // fontWeight: WEIGHT.bold,
  },
  topicText: {
    fontSize: SIZES.medium,
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  createQuizButton: {
    backgroundColor: "#FFA500",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  createQuizButtonText: {
    color: "#FFFFFF",
    fontSize: SIZES.large,
    // fontWeight: WEIGHT.bold,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,

    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    width: 368,
    height: 358,
    borderRadius: 32,
    border: "1px solid #000000",
    alignItems: "center",
    shadowColor: "#000",
    justifyContent: 'space-around',
    paddingVertical: 35,
    paddingHorizontal: 35,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  optionButton: {
    backgroundColor: "#A1A1A1",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
    marginTop: 1,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  optionButtonText: {
    color: "#000000",
    // fontWeight: WEIGHT.bold,
    textAlign: "center",
    fontSize: SIZES.large,
    width: 190,
    height: 25,
    lineHeight: 23.44,
    // size: SIZES.large,
    textAlign: "center",

  },
  modalText: {
    width: 283,
    height: 62,
    marginBottom: 5,
    textAlign: "center",
    // fontWeight: WEIGHT.bold,
    fontSize: SIZES.large,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: "#A1A1A1",
    borderRadius: 50,
  },
  closeIcon: {
    fontSize: SIZES.xLarge,
  },
  addButton: {
    backgroundColor: COLORS.button,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'flex-end',
    marginLeft: 200,
    marginRight: 20,
    marginBottom: 20,
  },
  addButtonText: {
    fontSize: SIZES.large,
    color: '#fff',
    textAlign: 'center',
  },
});

export default SelectTopics;
