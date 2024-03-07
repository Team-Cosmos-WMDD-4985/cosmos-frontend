import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, ScrollView, SafeAreaView, Modal } from 'react-native';
import { COLORS, SIZES } from "./../../constants";
import { HStack, VStack } from 'native-base';
import { icons, images } from "./../../constants";

// import { Chip } from 'react-native-paper';
// import Chip from '@mui/material/Chip';
// import Stack from '@mui/material/Stack';
// import Fab from '@mui/material/Fab';
// import AddIcon from '@mui/icons-material/Add';



function AddTopics({ navigation, route }) {

    console.log("params are ",route.params);
    const handleClick = () => {
        console.info('You clicked the Chip.');
    };
    
    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };


    const [schedule, setSchedule] = useState(route.params)
    const [modalVisible, setModalVisible] = useState(false);


    const handleCreate = () => {
        setModalVisible(true);
    };

    const handleCancel = () => {
        setModalVisible(false);
        console.log("Cancel Pressed");
    };

    const handleConfirm = () => {
        setModalVisible(false);
        console.log("Confirm Pressed");
        navigation.navigate("NavigationBar")
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

                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={icons.chevronLeft} style={styles.backIcon} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Arrange or Add Topics</Text>
                </View>

                {
                    schedule.length > 0 ? (
                        schedule.map((week, index) => (
                            <View style={styles.topicByWeek} key={`week-schedule-${index}`}>
                                <Text style={styles.WeekLabel}>Week {week.weekName}</Text>
                                <View style={styles.topicBox} >
                                    {
                                       week.topics.map((item, innerIndex) => (
                                        <Text
                                            key={`text-${innerIndex}`}
                                            style={styles.chip}
                                            onPress={handleClick}
                                            onClose={handleDelete}
                                        >
                                            { item }
                                        </Text>
                                       ))
                                    }
                                    <View style={styles.addSign}>
                                        <Text >+</Text>
                                    </View>
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
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    headerTitle: {
        fontSize: SIZES.xLarge,
        fontWeight: 'bold',
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        borderWidth: 1,
        flexWrap: "wrap",
        gap: 14,
        borderColor: COLORS.lightGray,
        padding: 15,
        borderRadius: 10,
    },
    WeekLabel: {
        fontSize: SIZES.medium,
        marginBottom: 10,
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
    chip: {
        width: 120,
        fontSize: SIZES.small,
        marginRight: 10,
        padding: 5,
        backgroundColor: COLORS.gray2,
        borderRadius: 8,
        textAlign: "center"

    },
    outlinedChip: {
        borderWidth: 1,
        fontSize: SIZES.small,

    },
    addSign: {
        fontSize: SIZES.large,
        color: COLORS.white,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.primary,
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
        elevation: 5
    },

    modalText: {
        marginBottom: 10,
        marginTop: 10,
        fontSize: SIZES.medium,
        textAlign: "center"
    },
    checkcirclestyle: {
        width: 40,
        height: 40,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
});

export default AddTopics;

