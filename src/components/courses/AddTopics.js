import React, { useState } from 'react';
import { View, Text, TextInput ,StyleSheet, Button, Image, TouchableOpacity, ScrollView, SafeAreaView, Modal } from 'react-native';
import { COLORS, SIZES } from "./../../constants";
import { HStack, VStack } from 'native-base';
import { icons, images } from "./../../constants";
import AxiosService from "./../../services/axios";

function AddTopics({ navigation, route }) {

    const [schedule, setSchedule] = useState(route.params.schedule);
    const [courseId, setCourseId] = useState(route.params.courseId);
    const [courseData, setCourseData] = useState(route.params.courseData);

    const [modalVisible, setModalVisible] = useState(false);
    const [topicInputModal, setTopicInputModal] = useState(false);
    const [activeIndexToAdd, setActiveIndexToAdd] = useState(null);
    const [newTopicValue, setNewTopicValue] = useState("")

    const handleClick = () => {
        console.info('You clicked the Chip.');
    };

    const handleDelete = (outerIndex, innerIndex) => {
        console.info('You clicked the delete icon.');
        const itemToDelete = schedule[outerIndex].topics[innerIndex];
        console.log(itemToDelete)
        let scheduleCopy = JSON.parse(JSON.stringify(schedule));
        scheduleCopy[outerIndex].topics.splice(innerIndex, 1);
        // console.log(scheduleCopy[outerIndex])
        setSchedule(scheduleCopy);
    };


    const handleCreate = () => {
        setModalVisible(true);
    };

    const handleTopicConfirm = () => {
        const copySchedule = JSON.parse(JSON.stringify(schedule));
        if( copySchedule[activeIndexToAdd].topics && Array.isArray(copySchedule[activeIndexToAdd].topics) ) {
            copySchedule[activeIndexToAdd].topics.push(newTopicValue)
        } else {
            copySchedule[activeIndexToAdd].topics = [newTopicValue];
        }

        setSchedule(copySchedule)
        setNewTopicValue(null)
        setTopicInputModal(false);
    }

    const handleTopicCancel = () => {
        setNewTopicValue(null)
        setTopicInputModal(false)
    }

    const addTopics = async (index) => {
        console.log(index)
        setActiveIndexToAdd(index)
        setTopicInputModal(true)

    }

    const handleCancel = () => {
        setModalVisible(false);
    };

    const handleConfirm = async () => {
        setModalVisible(false);
        try {
            const finalCourseData = JSON.parse(JSON.stringify(courseData));
            finalCourseData.schedule = schedule;
            setCourseData(finalCourseData)
            const response = await AxiosService("POST", "updateSchedule", true, {}, {finalCourseData, courseId});
            console.log(response.data)
            console.log("AddTopic finalCourseData: ",finalCourseData)

            navigation.navigate("NavigationBar")
        } catch (err) {
            console.log(err)
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={true}>

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
                            <Image source={icons.checkcircle} style={styles.checkcirclestyle} />
                            <Text style={styles.modalText}>Confirm to Create Course.</Text>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.cancelButton}
                                    onPress={handleCancel}
                                >
                                    <Text style={styles.cancelButtonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.createButton}
                                    onPress={handleConfirm}
                                >
                                    <Text style={styles.generateButtonText}>Confirm</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={topicInputModal}
                    onRequestClose={() => {
                        setModalVisible(!topicInputModal);

                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.overlay} />
                        <View style={styles.modalView}>
                            {/* <Image source={icons.checkcircle} style={styles.checkcirclestyle} /> */}
                            <Text style={styles.modalText}>Add topic</Text>
                            <View >

                                    <TextInput 
                                        style={styles.addTopicInput} 
                                        placeholder='Enter topic'
                                        onChangeText={(text) => {setNewTopicValue(text)}}
                                        value={newTopicValue}
                                    />

                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        style={styles.cancelButton}
                                        onPress={handleTopicCancel}
                                    >
                                        <Text style={styles.cancelButtonText}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.createButton}
                                        onPress={handleTopicConfirm}
                                    >
                                        <Text style={styles.generateButtonText}>Confirm</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </View>
                </Modal>

                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={icons.chevronLeft} style={styles.backIcon} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Manage Topics</Text>
                </View>

                {
                    schedule.length > 0 ? (
                        schedule.map((week, index) => (
                            <View style={styles.topicByWeek} key={`week-schedule-${index}`}>
                                <Text style={styles.WeekLabel}>Week {week.weekName}</Text>
                                <View style={styles.topicBox} >
                                    {
                                        week.topics.map((item, innerIndex) => (
                                            <View style={styles.chip} key={`tag-${innerIndex}`}>
                                                <Text
                                                    key={`text-${innerIndex}`}
                                                    // onPress={handleClick}
                                                    // onClose={handleDelete}
                                                >
                                                    {item}
                                                </Text>
                                                <TouchableOpacity onPress={() => handleDelete(index, innerIndex)}>
                                                    <View style={styles.deleteSign}>
                                                        <Text style={styles.addSignText}>x</Text>
                                                    </View>
                                                </TouchableOpacity>
                                               
                                            </View>
                                        ))
                                    }
                                    <TouchableOpacity style={styles.addSign} onPress={() => addTopics(index) }>
                                        <View >
                                            <Text style={styles.addSignText}>+</Text>
                                        </View>
                                    </TouchableOpacity>
                                    
                                </View>
                            </View>
                        ))
                    ) : (<Text>No schedule found</Text>)
                }

            </ScrollView>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
                    <Text style={styles.generateButtonText}>Create</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    addTopicInput: {
        borderWidth: 1,
        borderColor: COLORS.midGray,
        padding: 5,
        borderRadius: 10
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 40,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: SIZES.xLarge,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    backIcon: {
        width: 24,
        height: 24,
    },
    topicItem: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
    },
    weekText: {
        fontWeight: 'bold',
        marginBottom: 10,
    },
    topic: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    topicText: {
        fontSize: SIZES.medium,
        marginRight: 10,
    },

    topicByWeek: {
        flexDirection: 'column',
        marginVertical: 10,
        marginHorizontal: 20,
    },
    topicBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        borderWidth: 1,
        flexWrap: "wrap",
        gap: 10,
        borderColor: COLORS.darkGray,
        padding: 15,
        borderRadius: 10,
        position: 'relative',
        // height: 104,
        paddingBottom: 40,
    },
    WeekLabel: {
        fontSize: SIZES.medium,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingBottom: 20,
        marginTop: 20,
    },
    cancelButton: {
        borderWidth: 1,
        borderColor: COLORS.midGray,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        marginRight: 10,
    },
    createButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
    },
    cancelButtonText: {
        fontSize: SIZES.large,
        color: COLORS.primary,
        textAlign: 'center',
    },
    generateButtonText: {
        fontSize: SIZES.large,
        color: COLORS.midTeal,
        textAlign: 'center',
    },
    chip: {
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        height: 38,
        borderWidth: 1,
        borderRadius: 19,
        alignItems: 'center',
        justifyContent: 'center',
    }
    ,
    chipText: {
        fontSize: SIZES.xSmall,
        borderColor: COLORS.darkGray,
        marginRight: 20,
    },

    deleteSign: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: COLORS.primary,
        marginLeft: 10,


    },
    addSign: {
        position: 'absolute',
        bottom: 10,
        left: '50%',
        transform: [{ translateX: -10 }],
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: COLORS.primary,
        marginTop: 10,
    },
    addSignText: {
        fontSize: SIZES.small,
        color: COLORS.midTeal,
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

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
        elevation: 5,
        borderColor: COLORS.midTeal,
        borderWidth: 3,

    },

    modalText: {
        marginBottom: 10,
        marginTop: 10,
        fontSize: SIZES.medium,
        textAlign: "center"
    },
    checkcirclestyle: {
        width: 80,
        height: 80,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
});

export default AddTopics;

