import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import { icons, COLORS, SIZES, images, WEIGHT } from "../../constants";
import AxiosService from "../../services/axios";
import { Theme } from "@gluestack-style/react";
import Headers from "../../common/Headers";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const CourseDetails = ({ route, navigation }) => {
  const [courseId, setCourseId] = useState(route.params.courseId);
  const { finalCourseData } = route.params;
  const [schedule, setSchedule] = useState(route.params.schedule);
  const { finalData } = route.params;
  const [courseDetails, setCourseDetails] = useState(null);
  const [courseData, setCourseData] = useState(route.params.courseData);
  const [expandedWeeks, setExpandedWeeks] = useState({});
  const [expandedWeekIndex, setExpandedWeekIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTopic, setEditedTopic] = useState("");
  const [activeIndexToAdd, setActiveIndexToAdd] = useState(null);

  useEffect(() => {
    getCourseDetails();
  }, []);

  useEffect(() => {
    console.log("useEffect finalCourseData", finalCourseData);
  }, [finalCourseData]);

  const toggleWeekBody = (index) => {
    setExpandedWeekIndex((prevExpandedWeekIndex) =>
      prevExpandedWeekIndex === index ? null : index
    );
  };
  const getCourseDetails = async () => {
    console.log("this is courseId", courseId._id);
    try {
      const response = await AxiosService("GET", `courses`, true);
      if (response.data) {
        setCourseDetails(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  const chunkTopicsIntoPairs = (topics) => {
    let pairs = [];
    for (let i = 0; i < topics.length; i += 2) {
      pairs.push(topics.slice(i, i + 2));
    }
    return pairs;
  };

  const handleNavigate = () => {
    navigation.navigate("NavigationBar");
  };

  const handleEdit = () => {
    setIsEditing(true); // Set editing mode to true
  };

  const handleCancelEdit = () => {
    setIsEditing(false); // Set editing mode to false
  };
  const clearName = () => {
    setEditedTopic("");
  };

  const handleConfirm = async () => { };

  const handleDelete = async () => {

  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: COLORS.white,
      }}
    >
      <Headers
        courseText="Course Details"
        handleNavigate={handleNavigate}
        display={true}
        courseTextDes="course Detail"
      />

      <ScrollView style={styles.scrollViewStyle}>
        {courseId ? (
          <View>
            {courseId.topics &&
              chunkTopicsIntoPairs(courseId.topics).map((pair, weekIndex) => (
                <View style={styles.weekBox} key={`week-${weekIndex}`}>
                  <TouchableOpacity
                    style={styles.weekHeader}
                    onPress={() => toggleWeekBody(weekIndex)}
                    activeOpacity={1}
                  >
                    <Text style={styles.weekLabel}>Week {weekIndex + 1}</Text>
                    <Image
                      source={
                        expandedWeekIndex === weekIndex
                          ? icons.chevronUp
                          : icons.chevronDown
                      }
                      style={styles.ArrowStyle}
                    />
                  </TouchableOpacity>

                  {expandedWeekIndex === weekIndex && (
                    <View style={styles.weekBody}>
                      <View style={styles.topicsContainer}>
                        {pair.map((topic, topicIndex) => (
                          <View key={`topic-${topicIndex}`} style={styles.topicContainer}>
                            <Text style={styles.topicText}>{topic}</Text>
                            {isEditing && (
                              <TouchableOpacity onPress={() => handleDelete(weekIndex, topicIndex)}>
                                <Icon
                                  name="close-circle"
                                  size={20}
                                  color={COLORS.black}
                                  style={styles.deleteIcon}
                                />
                              </TouchableOpacity>
                            )}
                          </View>
                        ))}
                      </View>
                      {!isEditing && (
                        <TouchableOpacity onPress={handleEdit} style={styles.editIconLocation}>
                          <Image source={icons.edit} style={styles.editIcon} />
                        </TouchableOpacity>
                      )}
                    </View>
                  )}


                  {isEditing && expandedWeekIndex === weekIndex && (
                    <View style={styles.editContainer}>
                      <TextInput style={styles.addTopictext}>
                        Add topic
                      </TextInput>

                      <View style={styles.editInput}>
                        <TextInput
                          style={styles.editInputText}
                          onChangeText={setEditedTopic}
                          value={editedTopic}
                          placeholder="Topic name"
                        />
                        <TouchableOpacity
                          onPress={clearName}
                          style={styles.clearButton}
                        >
                          <Icon
                            name="close-circle"
                            size={20}
                            color={COLORS.black}
                          />
                        </TouchableOpacity>
                      </View>

                      <View style={styles.buttonContainer}>
                        <TouchableOpacity
                          style={styles.cancelButton}
                          onPress={handleCancelEdit}
                        >
                          <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.createButton}
                          onPress={handleConfirm}
                        >
                          <Text style={styles.generateButtonText}>Add</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              ))}
          </View>
        ) : (
          <View style={styles.loadingContainer}>
            <Image
              source={require("../../assets/images/loading.gif")}
              style={styles.loadingImage}
            />
            <Text style={styles.courseName}>
              Course Name: {courseId.courseName}
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.aiContainer}>
        <TouchableOpacity
          style={[styles.aiButton]}
          onPress={() =>
            navigation.navigate("AI Assistant", { courseId: courseId._id })
          }
        >
          <Image source={icons.aiImage} style={styles.aiImage} />
          <Text style={styles.aiButtonText}>AI Assistant</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: SIZES.xxLarge,
    fontWeight: "bold",
  },
  courseName: {
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    fontWeight: "bold",
    textAlign: "center",
  },
  backIcon: {
    width: 24,
    height: 24,
  },

  scrollViewStyle: {
    display: "flex",
    marginTop: 10,
    width: "100%",
  },
  weekBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "left",
    marginTop: 10,
    borderRadius: 16,
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  weekLabel: {
    fontSize: SIZES.large,
    color: COLORS.white,
    fontWeight: "bold",
  },
  weekHeader: {
    backgroundColor: COLORS.primary,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 16,
    padding: 5,
    paddingHorizontal: 10,
    height: 48,
  },
  weekBody: {
    backgroundColor: COLORS.white,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 16,
    paddingHorizontal: 10,
  },
  topic: {
    borderRadius: 16,
    marginVertical: 10,
    backgroundColor: COLORS.white,
    color: COLORS.primary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: COLORS.primary,
    borderWidth: 1,
    alignSelf: "flex-start",
    marginHorizontal: 5,

  },
  editIcon: {
    marginTop: 40,
  },
  aiImage: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    marginTop: 10,
  },
  editIconLocation: {
    position: 'absolute',
    bottom: 10,
    left: '90%',
    right: 10,
  },
  aiButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 16,
    width: "100%",
    backgroundColor: COLORS.teal,
    borderWidth: 1,
    borderColor: COLORS.teal,
  },
  aiButtonText: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    textAlign: "center",
    fontWeight: "bold",
  },
  topicsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  addTopictext: {
    textAlign: "center",
    fontSize: SIZES.xLarge,
    fontWeight: "bold",
    marginBottom: 10,
  },
  topicText: {
    backgroundColor: COLORS.white,
    color: COLORS.primary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: COLORS.primary,
    alignSelf: 'flex-start',
    marginHorizontal: 5,
  },
  editInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 10,
  },
  editInputText: {
    borderColor: COLORS.primary,
  },

  aiContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 10,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: COLORS.midGray,
    borderRadius: 30,
    marginRight: 10,
    width: 120,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    textAlign: "center",
  },
  createButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    width: 120,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
  },
  generateButtonText: {
    fontSize: SIZES.large,
    color: COLORS.midTeal,
    textAlign: "center",
  },
  clearButton: {
    position: "absolute",
    right: 10,
  },
  topicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 1,
    padding: 5,
    margin: 5,

  }
});

export default CourseDetails;
