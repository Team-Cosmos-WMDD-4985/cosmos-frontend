import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { icons, COLORS, SIZES, images } from "../../constants";
import AxiosService from "../../services/axios"

const CourseDetails = ({ route, navigation }) => {
    // const { item } = route.params;
    const { courseId } = route.params;
    const { finalCourseData } = route.params;
    const { schedule } = route.params;
    const { finalData } = route.params;

    const [courseDetails, setCourseDetails] = useState(null);
    const [courseData, setCourseData] = useState(route.params.courseData);

    useEffect(() => {
        getCourseDetails();
    }, []);

    useEffect(() => {
        console.log("useEffect finalCourseData", finalCourseData);
    }, [finalCourseData]);

    useEffect(() => {
        console.log("useEffect finalCourseData", finalCourseData);
    }, [schedule]);

    // const handleConfirm = async () => {
    //     setModalVisible(false);
    //     try {
    //         const finalCourseData = JSON.parse(JSON.stringify(courseData));
    //         finalCourseData.schedule = schedule;
    //         setCourseData(finalCourseData)
    //         const response = await AxiosService("POST", "updateSchedule", true, {}, {finalCourseData, courseId});
    //         console.log(response.data)
    //         console.log("AddTopic finalCourseData: ",finalCourseData)

    //         navigation.navigate("NavigationBar")
    //     } catch (err) {
    //         console.log(err)
    //     }
    // };

    console.log("AddTopic finalCourseData: ", finalCourseData)

    console.log("schedule is : ", schedule)


    const getCourseDetails = async () => {
        console.log("this is courseId", courseId._id);
        try {
            const response = await AxiosService("GET", `courses`, true);
            if (response.data) {
                setCourseDetails(response.data.data);
            }     
        } catch (error) {
        console.error('Error fetching course details:', error);
    }
};

// console.log("test topics : ", courseId.topics);
// console.log("test schedule : ", courseId.finalData);
console.log("this is finalCourseData  ", finalCourseData);
console.log("this is finalData  ", finalData);

return (
    <SafeAreaView style={{
        flex: 1,
        marginTop: 20,
        backgroundColor: COLORS.white,
    }} >
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={icons.chevronLeft} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Course Details</Text>
            <Image source={images.profile} style={styles.profileImage} />
            <View />
        </View>


        <View style={styles.content}>
            {courseId ? (

                <View>
                    <Text style={styles.courseName}>Course Name: {courseId.courseName}</Text>
                    {/* {courseDetails.schedule && courseDetails.schedule.map((week, index) => (
                            <View key={index}>
                                <Text style={styles.weekLabel}>Week {week.weekName}</Text>
                                {week.topics && week.topics.map((topic, topicIndex) => (
                                    <Text key={topicIndex} style={styles.topic}>{topic}</Text>
                                ))}
                            </View>
                        ))} */}
                    <View style={styles.topicsArea}>
                        {courseId.topics && courseId.topics.map((topic, index) => (
                            <Text key={index} style={styles.topic}>{topic}</Text>
                        ))}
                    </View>
                </View>
            ) : (
                <View style={styles.loadingContainer}>
                    <Image source={require('../../assets/images/loading.gif')} style={styles.loadingImage} />
                    <Text style={styles.courseName}>Course Name: {courseId.courseName}</Text>

                </View>
            )}
        </View>


        <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.aiButton]} onPress={() => navigation.goBack()}>
                <Image source={icons.aiImage} style={styles.aiImage} />
                <Text style={styles.aiButtonText}>AI Assistant</Text>
            </TouchableOpacity>
        </View>

    </SafeAreaView >
);
};

const styles = StyleSheet.create({
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
    courseName: {
        fontSize: SIZES.xLarge,
        color: COLORS.primary,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    backIcon: {
        width: 24,
        height: 24,
    },
    aiImage: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    aiButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 20,
        width: '90%',
        backgroundColor: COLORS.teal,
        borderWidth: 1,
        borderColor: COLORS.teal,
        padding: 15,
    },
    aiButtonText: {
        fontSize: SIZES.large,
        color: COLORS.primary,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    topicsArea: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topic: {
        borderRadius: 5,
        width: '90%',
        height: 30,
        marginTop: 10,
        backgroundColor: COLORS.primary,
        color: COLORS.white,
        padding: 5,
        paddingLeft: 10,
    },
});

export default CourseDetails;
