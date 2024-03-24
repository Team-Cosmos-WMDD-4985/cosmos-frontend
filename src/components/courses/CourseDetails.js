import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { icons, COLORS, SIZES, images } from "../../constants";
import AxiosService from "../../services/axios"
import { Theme } from '@gluestack-style/react';
import Headers from '../../common/Headers';

const CourseDetails = ({ route, navigation }) => {
    const { courseId } = route.params;
    const { finalCourseData } = route.params;
    const [schedule, setSchedule] = useState(route.params.schedule);
    const { finalData } = route.params;
    const [courseDetails, setCourseDetails] = useState(null);
    const [courseData, setCourseData] = useState(route.params.courseData);
    const [expandedWeeks, setExpandedWeeks] = useState({});
    const [expandedWeekIndex, setExpandedWeekIndex] = useState(null);

    useEffect(() => {
        getCourseDetails();
    }, []);

    useEffect(() => {
        console.log("useEffect finalCourseData", finalCourseData);
    }, [finalCourseData]);

    const toggleWeekBody = (index) => {
        setExpandedWeekIndex((prevExpandedWeekIndex) => (
            prevExpandedWeekIndex === index ? null : index
        ));
    };
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

    const chunkTopicsIntoPairs = (topics) => {
        let pairs = [];
        for (let i = 0; i < topics.length; i += 2) {
            pairs.push(topics.slice(i, i + 2));
        }
        return pairs;
    };

    const handleNavigate = () => {
        navigation.navigate("NavigationBar");
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            marginTop: 20,
            backgroundColor: COLORS.white,
        }} >

            <Headers courseText="Course Details" handleNavigate={handleNavigate} display={true} courseTextDes="course Detail"/>
            {/* <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={icons.chevronLeft} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Course Details</Text>
                <Image source={images.profile} style={styles.profileImage} />
                <View />
            </View> */}
            {/* <Text style={styles.courseName}>Course Name: {courseId.courseName}</Text> */}

            <ScrollView style={styles.scrollViewStyle}>
                {courseId ? (
                    <View>
                        {/* {courseDetails.schedule && courseDetails.schedule.map((week, index) => (
                            <View key={index}>
                                <Text style={styles.weekLabel}>Week {week.weekName}</Text>
                                {week.topics && week.topics.map((topic, topicIndex) => (
                                    <Text key={topicIndex} style={styles.topic}>{topic}</Text>
                                ))}
                            </View>
                        ))} */}
                        {/* <View style={styles.topicsArea}>
                            {courseId.topics && courseId.topics.map((topic, index) => (
                                <Text key={index} style={styles.topic}>{topic}</Text>
                            ))}
                        </View> */}
                        {courseId.topics && chunkTopicsIntoPairs(courseId.topics).map((pair, weekIndex) => (
                            <View style={styles.weekBox} key={`week-${weekIndex}`}>
                                <TouchableOpacity
                                    style={styles.weekHeader}
                                    onPress={() => toggleWeekBody(weekIndex)}
                                >
                                    <Text style={styles.weekLabel}>Week {weekIndex + 1}</Text>
                                    <Image
                                        source={expandedWeekIndex === weekIndex ? icons.chevronUp : icons.chevronDown}
                                        style={styles.ArrowStyle}
                                    />
                                </TouchableOpacity>
                                {expandedWeekIndex === weekIndex && (<View style={styles.weekBody}>
                                    {pair.map((topic, topicIndex) => (
                                        <Text key={`topic-${topicIndex}`} style={styles.topic}>
                                            {topic}
                                        </Text>
                                    ))}
                                    <Image source={icons.edit} style={styles.editIcon} />
                                </View>
                                )}
                            </View>
                        ))}
                    </View>
                ) : (
                    <View style={styles.loadingContainer}>
                        <Image source={require('../../assets/images/loading.gif')} style={styles.loadingImage} />
                        <Text style={styles.courseName}>Course Name: {courseId.courseName}</Text>
                    </View>
                )}
            </ScrollView>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.aiButton]} onPress={() => navigation.navigate("AI Assistant", { courseId: courseId._id })}>
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

    scrollViewStyle: {
        display: 'flex',
        marginTop: 10,
        paddingHorizontal: 20,
        width: '100%'
    },
    weekBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'left',
        marginTop: 10,
        borderRadius: 16,
        borderColor: COLORS.primary,
        borderWidth: 1,
    },
    weekLabel: {
        fontSize: SIZES.large,
        color: COLORS.white,
        fontWeight: 'bold',
    },
    weekHeader: {
        backgroundColor: COLORS.primary,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 16,
        padding: 5,
        paddingHorizontal: 10,
        height: 48,
    },
    weekBody: {
        backgroundColor: COLORS.white,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topic: {
        borderRadius: 15,
        marginVertical: 10,
        backgroundColor: COLORS.white,
        color: COLORS.primary,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderColor: COLORS.primary,
        borderWidth: 1,
        alignSelf: 'flex-start',
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
        flexDirection: 'row',
        justifyContent: 'space-around',
        // position: 'absolute',
        // bottom: 10,
        // left: 0,
        // right: 0,
        paddingVertical: 10,
        marginTop: 10,
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
});

export default CourseDetails;
