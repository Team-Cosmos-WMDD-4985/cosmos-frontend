import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'
import { icons, images } from "./../../constants"
import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";

const CourseCard = ({ courses, navigation, item, index, width = 400, height = Dimensions.get('window').height * 0.5 }) => {

  const dynamicStyles = StyleSheet.create({
    container: {
      width: width,
      height: height,
      backgroundColor: "#FFF",
      borderRadius: 20,
      justifyContent: "space-between",
      borderRadius: SIZES.medium,
      borderColor: COLORS.lightGrey,
      borderWidth: 1,
      ...SHADOWS.medium,
      shadowColor: COLORS.lightGrey,
      shadowOffset: { width: 0, height: 10 }, // This defines the shadow's x and y offset
      shadowOpacity: 0.3, // This defines the opacity of the shadow
      shadowRadius: 20, // This defines the blur radius of the shadow
      elevation: 8, // Use elevation for Android
      marginBottom: 10,
      // paddingBottom: 10,
    },
    logoContainer: {
      width: "100%",
      height: height * 0.5, // 50% of the container height
      backgroundColor: COLORS.primary,
      justifyContent: "center",
      alignItems: "center",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    infoContainer: {
      height: height * 0.5, // Remaining 50% for the info container
      paddingHorizontal: 10,
      paddingVertical: 5,

    },
    courseStyle: {
      width: '100%',
      height: '100%', // Adjust as needed
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    // Add other styles as needed
  });

  const getImageSource = () => {
    if (item.image && item.image !== '') {
      return { uri: item.image };
    }
    return { uri: `https://picsum.photos/300/200?random=${index}` };
  };


  const getDateFormat = (startDate, endDate) => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    const startMonth = months[startDateObj.getMonth()];
    const endMonth = months[endDateObj.getMonth()];

    const startDay = startDateObj.getDate();
    const endDay = endDateObj.getDate();

    const startYear = startDateObj.getFullYear();
    const endYear = endDateObj.getFullYear();

    return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${startYear}`;
  }


  return (

    <TouchableOpacity style={dynamicStyles.container}
      onPress={() => navigation.navigate('CourseDetails', { course: item })}
    >

      <View style={dynamicStyles.logoContainer}>
        <Image source={getImageSource()} style={styles.courseStyle} />
      </View>

      <View style={dynamicStyles.infoContainer}>
        <View style={styles.firstLine}>
          <Text style={styles.courseName} numberOfLines={1}>
            {`${item.courseName}`}
          </Text>
          <Image
            source={icons.chevronRight}
            style={styles.iconStyle}
          />
        </View>

        <View >
          <Text style={styles.weekText} numberOfLines={1}>{getDateFormat(item.startDate, item.endDate)}</Text>
        </View>

        <View style={styles.weekStyle}>
          <Text style={styles.weekText} numberOfLines={1} >12 Weeks</Text>
        </View>

      </View>
    </TouchableOpacity >
  )
}
const screenHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
  container: () => ({
    width: 250,
    height: screenHeight * 0.25, // 25% of the screen height
    backgroundColor: "#FFF",
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
    borderRadius: 20,
  }),
  logoContainer: {
    width: "100%",
    height: screenHeight * 0.125, // 12.5% of the screen height
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,

  },
  logoImage: {
    width: 50,
    height: 50,
  },
  courseDate: {
    fontSize: SIZES.medium,
    color: COLORS.midGray,
    marginTop: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  infoContainer: {
    height: screenHeight * 0.125, // 12.5% of the screen height
    marginTop: SIZES.xSmall,
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    padding: 10,
  },
  iconStyle: {
    width: 24,
    height: 24
  },
  firstLine: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  courseName: ({
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.primary,
    fontWeight: 'bold',
  }),
  weekStyle: {
    display: 'flex',
    color: COLORS.midGray,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  weekText: {
    // padding: 10,
    marginTop: 5,
    fontSize: SIZES.small,
    color: COLORS.midGray,
    fontSize: SIZES.small,
  },
  publisher: (selectedJob) => ({
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.bold,
    color: selectedJob === item.job_id ? COLORS.white : COLORS.primary,
  }),
  location: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
  },
  courseStyle: {
    width: '100%',
    height: screenHeight * 0.125, // 12.5% of the screen height
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,

  }
});

export default CourseCard