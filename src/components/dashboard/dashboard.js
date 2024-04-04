import { useEffect, useState } from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet, Image, Dimensions } from "react-native";
import { icons, images } from "./../../constants";
import { SIZES, WEIGHT, COLORS } from "./../../constants/theme";
import QuizList from "./../home/QuizList";
import CourseList from "./../home/CourseList";
import  secoreStoreService from "../../services/secureStore";

const screenHeight = Dimensions.get('window').height;


const getFormattedDate = () => {
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date();
    const weekDay = weekDays[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${weekDay}, ${month} ${day < 10 ? `0${day}` : day}, ${year}`;
};


const Dashboard = ({navigation}) => {
    
    const [user, setUser] = useState({});
    useEffect(() => {
        getUserData();
    }, [])

    const getUserData = async () => {
        try {
            let userInfo = await secoreStoreService.getValueFor("user");
            setUser(userInfo)
            console.log("user info ", userInfo)
        } catch(err) {
            console.log("Error getting user info: ", err);
        }
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            // marginTop: 20,
            backgroundColor: COLORS.white,
        }} >
            <View style={{ flex: 1, padding: 20 }}>
                <View style={styles.header}>
                    <View style={styles.headerStack}>
                        <Text style={styles.dateText}>{getFormattedDate()}</Text>
                        <Text style={styles.headerText}>Welcome back, {user.name}</Text>
                    </View>
                    <Image source={images.profile} style={styles.profileImage} />
                </View>
                <View style={styles.courseHeader}>
                    <Text style={styles.courseHeaderTitle}>Courses</Text>
                </View>
                <CourseList width={200} height={screenHeight * 0.25} />
                <QuizList navigation={navigation} />
            </View>
        </SafeAreaView >
    )
}
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20,
    },
    headerText: {
        fontSize: SIZES.large,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginTop: 8,
    },
    profileImage: {
        width: 48,
        height: 48,
        // borderRadius: 20,
    },
    headerStack: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'left',
    },
    courseHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: SIZES.small,
        marginBottom: 0,
    },
    courseHeaderTitle: {
        fontSize: SIZES.large,
        color: COLORS.secondary,
        fontWeight: "700"
    },
})

export default Dashboard;