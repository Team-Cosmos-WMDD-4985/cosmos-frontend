import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Image, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { COLORS, SIZES } from "./../../constants";
import secoreStoreService from "../../services/secureStore";

function AddCourse({ navigation }) {

    const [courseName, setCourseName] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [file, setFile] = useState();

    useEffect(() => {
        getToken()
    }, [])

    const getToken = async () => {
        const myToken = await secoreStoreService.getValueFor('token');
        console.log(myToken)
    }


    const pickImage = async (setter) => {
        // let result = await ImagePicker.launchImageLibraryAsync({
        //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
        //     allowsEditing: true,
        //     aspect: [4, 3],
        //     quality: 1,
        // });

        // if (!result.cancelled) {
        //     setter(result.uri);
        // }

        let result = await DocumentPicker.getDocumentAsync({
            type: "application/pdf"
        })

        console.log(result)

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setFile(result.assets[0]);
          }
        // if (!result.cancelled) {
        //     setter(result.uri);
        // }
    };

    const handleGenerate = () => {
        console.log(courseName); 
        console.log(startDate);
        console.log(endDate); 
     };

    return (
        <View style={styles.container}>

            {/*  Add Course Header*/}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('./../../assets/icons/chevron-left.png')} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Course Details</Text>
                <View />
            </View>

            <View style={styles.content}>

                {/* Course Name Section */}
                <View>
                    <Text style={styles.label}>Course Name</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setCourseName}
                        value={courseName}
                        placeholder="Project 2"
                    />
                </View>

                {/* Course Lenght Section */}
                <View >
                    <Text style={styles.label}>Course Length</Text>
                    <View style={styles.datePickerRow}>
                        <TouchableOpacity onPress={() => setShowStartDatePicker(true)} >
                            <Text style={styles.label}>Start</Text>
                        </TouchableOpacity>
                        {showStartDatePicker && (
                            <DateTimePicker
                                value={startDate}
                                mode="date"
                                display="default"
                                onChange={(event, selectedDate) => {
                                    setShowStartDatePicker(Platform.OS === 'ios');
                                    setStartDate(selectedDate || startDate);
                                }}
                            />
                        )}
                        <Image source={require('./../../assets/icons/calendar.png')} style={styles.icon} />
                        <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
                            <Text style={styles.label}>End</Text>
                        </TouchableOpacity>
                        {showEndDatePicker && (
                            <DateTimePicker
                                value={endDate}
                                mode="date"
                                display="default"
                                onChange={(event, selectedDate) => {
                                    setShowEndDatePicker(Platform.OS === 'ios');
                                    setEndDate(selectedDate || endDate);
                                }}
                            />
                        )}
                    </View>
                </View>

                {/* The upload Course Topics Section */}
                <View>
                    <Text style={styles.label}>Upload Course pdf</Text>
                    <View style={styles.uploadButton}>
                        <TouchableOpacity style={styles.center} onPress={() => pickImage(setWeeklyTopics)}>
                            <Image source={require('./../../assets/icons/upload.png')} style={styles.icon} />
                            <Text style={styles.link}>Click here to browse</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* The upload Course Topics Section */}
                <View>
                    <Text style={styles.label}>Upload Course Picture</Text>
                    <View style={styles.uploadButton}>
                        <TouchableOpacity style={styles.center} onPress={() => pickImage(setCoursePicture)}>
                            <Image source={require('./../../assets/icons/upload.png')} style={styles.icon} />
                            <Text style={styles.link}>Click here to browse</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* The Action Button Section */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => navigation.goBack()}>
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.generateButton]} onPress={handleGenerate}>
                        <Text style={styles.generateButtonText}>Generate</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
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
        fontSize: SIZES.xxLarge,
        fontWeight: 'bold',
    },
    content: {
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.gray,
        paddingVertical: 10,
        marginBottom: 20,
        fontSize: SIZES.medium,
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    label: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: SIZES.medium,
        fontWeight: 'bold',
    },
    datePickerRow: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: COLORS.gray,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    uploadButton: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        borderStyle: "dotted",
    },
    link: {
        textDecorationLine: 'underline',
    },
    backIcon: {
        width: 24,
        height: 24,
    },
    center: {
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 20,
    },
    cancelButton: {
        backgroundColor: COLORS.lightGray,
        borderWidth: 1,
        borderColor: COLORS.button,
        padding: 15,
    },
    generateButton: {
        backgroundColor: COLORS.button,
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
});

export default AddCourse;
