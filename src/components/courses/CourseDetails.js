import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { icons, COLORS, SIZES, images } from "../../constants";


const CourseDetails = ({ route, navigation }) => {



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
});

export default CourseDetails;
