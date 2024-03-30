// SmartCourse.js

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { icons, images, COLORS, SIZES } from '../../constants';

const SmartCourse = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={images.splash} style={styles.container}>
                <View style={styles.textContainer}>

                    <Text style={styles.title}>SMART COURSE</Text>
                    <Text style={styles.title}>MANAGEMENT SYSTEM</Text>
                    <Text style={styles.description}>Let's begin experiencing right now.</Text>
                </View>
                <Image
                    source={icons.decoration}
                    style={styles.image}
                    resizeMode="contain"
                />
                <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Feature1')}>
                    <Text style={styles.nextText}>Next</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        marginTop: '50%',
    },
    image: {
        width: 40,
        height: 20,
        marginTop: 20,
    },
    title: {
        fontSize: SIZES.large,
        marginTop: 20,
        textAlign: 'center',
        color: COLORS.midTeal,
    },
    description: {
        ontSize: 18,
        marginTop: 10,
        textAlign: 'center',
        color: COLORS.white,
    },
    paginationContainer: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20,
    },
    paginationDot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: COLORS.primary,
        marginHorizontal: 5
    },
    paginationDotInactive: {
        backgroundColor: COLORS.lightGray
    },
    nextButton: {
        width: '90%',
        backgroundColor: COLORS.primary,
        borderWidth: 1,
        borderColor: COLORS.midTeal,
        borderRadius: 30,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 54,
        marginTop: '50%',
    },
    nextText: {
        color: COLORS.midTeal,
        fontSize: 24,
        margin: 'auto',
        textAlign: 'center',
    }
});

export default SmartCourse;
