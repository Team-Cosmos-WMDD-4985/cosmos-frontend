import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { icons, images, SIZES } from "../constants";

const Headers = ({ courseText, handleNavigate, display , courseTextDes}) => {
    return (
        <View style={styles.header}>
            <View style={styles.headerDiv}>
            {display ? (
                <TouchableOpacity onPress={() => handleNavigate()}>
                    <Image source={icons.chevronLeft} style={styles.backIcon} />
                </TouchableOpacity>
                ) : null}
                <View>
                    <Text style={styles.headerTitle}>{courseText}</Text>
                    <Text>{courseTextDes}</Text>
                </View>
            </View>
            
                <View style={styles.profileContainer}>
                    <Image source={images.profile} style={styles.profileImage} />
                </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    backIcon: {
        width: 24,
        height: 24,
    },
    headerDiv: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    headerTitle: {
        fontSize: SIZES.xxLarge,
        fontWeight: 'bold',
    },
    profileContainer: {
        marginRight: 10, 
    },
    profileImage: {
        width: 40, 
        height: 40, 
        resizeMode: 'contain'
    }
});

export default Headers;
