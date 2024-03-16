import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Image, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { COLORS, SIZES, icons, SHADOWS } from "./../../constants";
import secoreStoreService from "../../services/secureStore";
import AxiosService from "./../../services/axios";

function AddCourse({ navigation }) {

    const [courseName, setCourseName] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [file, setFile] = useState(null);
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        getToken()
    }, [])

    const getToken = async () => {
        const myToken = await secoreStoreService.getValueFor('token');
    }


    //     if (!result.cancelled) {
    //         setter(result.uri);
    //     }

    //     // let result = await DocumentPicker.getDocumentAsync({
    //     //     type: "application/pdf"
    //     // })


    //     if (!result.canceled && result.assets && result.assets.length > 0) {
    //         setFile(result.assets[0]);
    //     }
    //     if (!result.cancelled) {
    //         setter(result.uri);
    //     }
    // };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    };

    const uploadPdf = async () => {

        try {
            let res = await DocumentPicker.getDocumentAsync({
                type: "application/pdf"
            });

            const file = res.assets[0];
            const pdfUpload = {
                name: file.name.split(".")[0],
                uri: file.uri,
                type: file.mimeType,
                size: file.size
            }
            setFile(pdfUpload);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log("User cancelled")
            } else {
                console.log(err)
            }
        }


        // console.log(result)

        // if (!result.canceled && result.assets && result.assets.length > 0) {
        //     setFile(result.assets[0]);
        //   }
    }

    const handleGenerate = async () => {
        setShowLoader(true);
        const toSend = {
            file: file,
            name: courseName,
            startDate: startDate,
            endDate: endDate
        }
        let formdata = new FormData();
        formdata.append('file', file);
        formdata.append("name", courseName);
        formdata.append("startDate", startDate.toString());
        formdata.append("endDate", endDate.toString())

        try {
            const response = await AxiosService("POST", "addCourse", true, {}, formdata, { "Content-Type": `multipart/form-data` })
            navigation.navigate("AddTopics", response.data.data);
            showLoader(false)
            // if (response.data.success) { // Ensure the response is successful before navigation
            //     navigation.navigate("AddTopics", response.data.data);
            // }

        } catch (err) {
            console.log(err)
            showLoader(false)
        }


    };

    const deleteFile = async () => {
        setFile(null);
    }

    return (
        <View style={styles.container}>
        
        {
            showLoader && <View style={styles.loaderContainer}>
                            <ActivityIndicator size="large" color={COLORS.midTeal} />
                        </View>
        }
        
            {/*  Add Course Header*/}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={icons.chevronLeft} style={styles.backIcon} />
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
                        <TouchableOpacity onPress={() => setShowStartDatePicker(Platform.OS === 'ios')} >
                            {
                                startDate != null ? (<Text style={styles.label}>{startDate.toDateString()}</Text>) : (<Text style={styles.label}>Start</Text>)
                            }

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
                        <TouchableOpacity onPress={() => setShowEndDatePicker(Platform.OS === 'ios')}>
                            {
                                endDate != null ? (<Text style={styles.label}>{endDate.toDateString()}</Text>) : (<Text style={styles.label}>End</Text>)
                            }
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

                    {
                        file ? (<View style={styles.fileContainer}>
                                    <View style={styles.fileInner}>
                                        <Image source={icons.pdf} style={styles.pdfIcon} />
                                        <Text> {file.name}</Text>
                                    </View>
                                    <TouchableOpacity onPress={deleteFile}>
                                        <Image source={icons.deleteIcon} style={styles.pdfIcon} />
                                    </TouchableOpacity>
                                    
                        </View>) : (
                            <View style={styles.uploadButton}>
                                <TouchableOpacity style={styles.center} onPress={() => uploadPdf()}>
                                    <Image source={require('./../../assets/icons/upload.png')} style={styles.icon} />
                                    <Text style={styles.link}>Click here to browse</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }


                </View>

                {/* The upload Course Topics Section */}
                {/* <View>
                    <Text style={styles.label}>Upload Course Image</Text>
                    <View style={styles.uploadButton}>
                        <TouchableOpacity style={styles.center} onPress={() => pickImage()}>
                            <Image source={require('./../../assets/icons/upload.png')} style={styles.icon} />
                            <Text style={styles.link}>Click here to browse</Text>
                        </TouchableOpacity>
                    </View>
                </View> */}

                {/* The Action Button Section */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => navigation.goBack()}>
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.generateButton]}
                        onPress={() => {
                            handleGenerate();
                        }}>
                        <Text style={styles.generateButtonText}>Generate</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    );

}
const styles = StyleSheet.create({
    loaderContainer: {
        zIndex: 999,
        position: "absolute",
        height: "100%",
        width: "100%",
        justifyContent: 'space-around',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
      },
    fileContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"space-between",
        height: 50,
        borderRadius: 5,
        borderWidth: 1,
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        borderStyle: "dotted",
    }, 
    fileInner: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
    pdfIcon: {
        width: 30,
        height: 30
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
    icon: {
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
        borderColor: COLORS.midGray,
        padding: 15,
    },
    generateButton: {
        backgroundColor: COLORS.primary,
    },
    cancelButtonText: {
        fontSize: SIZES.large,
        color: COLORS.midGray,
        textAlign: 'center',
    },
    generateButtonText: {
        fontSize: SIZES.large,
        color: COLORS.midTeal,
        textAlign: 'center',
    },
});

export default AddCourse;
