
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { COLORS, SIZES } from "../../constants";
import Headers from "../../common/Headers";

const SelectTopics = ({ route, navigation }) => {
  const { topics, courseId } = route.params;
  console.log("courseId", courseId);
  const [selectedTopics, setSelectedTopics] = useState(
    topics.map((topic) => ({ name: topic, selected: false }))
  );

  const toggleTopic = (index) => {
    setSelectedTopics((currentSelectedTopics) =>
      currentSelectedTopics.map((t, i) =>
        i === index ? { ...t, selected: !t.selected } : t
      )
    );
  };

  const createQuiz = () => {
    const selTopics = selectedTopics
      .filter((topic) => topic.selected)
      .map((topic) => topic.name);
    navigation.navigate("CreateYourQuiz", {
      topics: selTopics,
      courseId: courseId,
    });
  };

  const renderTopicItem = ({ item, index }) => (

    <TouchableOpacity
      style={[styles.topicItem, item.selected ? styles.topicItemSelected : {}]}
      onPress={() => toggleTopic(index)}
    >
      <Icon
        name={item.selected ? "checkbox-marked" : "checkbox-blank"}
        size={24}
        color="#000"
        style={styles.checkboxIcon}
      />
      <View style={styles.textContainer}>
        <Text style={styles.weekText}>{`Topic ${index + 1}:`}</Text>
        <Text style={styles.topicText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleNavigate = () => {
    navigation.goBack();
  }
  return (
    <View style={styles.flexContainer}>
      <Headers courseText="Choose Topics" display={true} handleNavigate={handleNavigate} courseTextDes="Select topics to create quiz" />

      <FlatList
        data={selectedTopics}
        renderItem={renderTopicItem}
        keyExtractor={(item, index) => `topic-${index}`}
        style={styles.container}

      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.generateButton]}
          onPress={createQuiz}
        >
          <Text style={styles.generateButtonText}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    backgroundColor: "#fff",
    // marginTop: 20,
    paddingHorizontal: 20,
  },
  container: {
    paddingTop: 20,
  },
  topicItem: {
    width: '100%',
    display: 'flex',
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.gray,
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: SIZES.medium,
    borderRadius: 30,
    // paddingHorizontal: 50,
    paddingRight: 50,
  },
  topicItemSelected: {
    backgroundColor: COLORS.lightTeal,
    paddingHorizontal: 10,
  },
  checkboxIcon: {
    marginRight: 10,
    paddingHorizontal: 10,
  },
  weekText: {
    marginRight: 10,
  },
  topicText: {
    fontSize: SIZES.medium,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  cancelButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.midGray,
    padding: 15,
    width: '49%',
  },
  generateButton: {
    backgroundColor: COLORS.primary,
    width: '49%',

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
});

export default SelectTopics;
