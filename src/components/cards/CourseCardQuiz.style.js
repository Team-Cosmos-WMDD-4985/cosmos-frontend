import { StyleSheet, Dimensions } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: () => ({
    // width: 389,
    // height: 240,
    height: screenHeight * 0.25,
    margin: 1,
    textAlign: "center",
    // padding: SIZES.xLarge,
    backgroundColor: "#FFF",
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
    marginTop: 20,

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
    padding: 10,
    gap: 5,

  },
  iconStyle: {
    width: 24,
    height: 24
  },
  firstLine: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  courseName: ({
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
    color: COLORS.primary,
    // lineHeight: SIZES.small
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
    height: screenHeight * 0.125,
  },
  initialsPlaceholder: {
    width: "100%",
    height: 100,
    borderTopLeftRadius: SIZES.medium,
    borderTopRightRadius: SIZES.medium,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    color: COLORS.white,
  },
  initialsText: {
    color: COLORS.midTeal,
    fontSize: SIZES.xLarge,
  },
  // courseStyle: {
  //   width: "100%",


},

);

export default styles;
