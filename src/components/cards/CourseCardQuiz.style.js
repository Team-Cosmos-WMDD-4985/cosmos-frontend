import { StyleSheet, Dimensions } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";

const screenHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
  container: () => ({
    height: screenHeight * 0.25,
    textAlign: "center",
    backgroundColor: "#FFF",
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
    marginTop: 20,
    // width: "100%",

  }),

  logoContainer: {
    width: "100%",
    height: 120,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",


  },
  logoImage: {
    width: 50,
    height: 50,

  },
  courseDate: {
    fontSize: SIZES.medium,
    // fontFamily: FONT.regular,
    color: COLORS.midGray,
    // marginTop: SIZES.xSmall,
    padding: 10,
  },
  infoContainer: {
    height: screenHeight * 0.125,
    // marginTop: SIZES.xSmall,
    display: "flex",
    flexDirection: "column",
    padding: 5,
    gap: 5,

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
    // lineHeight: SIZES.small
    fontWeight: 'bold',

  }),
  weekStyle: {
    display: 'flex',
    flexDirection: 'row',
    color: COLORS.midGray,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',

  },
  weekText: {
    // padding: 10,
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
    borderTopLeftRadius: SIZES.medium,
    borderTopRightRadius: SIZES.medium,
    width: '100%',
  }
  // courseStyle: {
  //   width: "100%",

  // }
});

export default styles;
