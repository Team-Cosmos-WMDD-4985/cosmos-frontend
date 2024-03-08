import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: () => ({
    width: 250,
    height: 240,
    // padding: SIZES.xLarge,
    backgroundColor: "#FFF",
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
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
    height: 120,
    marginTop: SIZES.xSmall,
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column"
  },
  iconStyle: {
    width: 24,
    height: 24
  },
  firstLine: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row"
  },
  courseName: ({
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.primary,
    // lineHeight: SIZES.small
  }),
  weekStyle: {
    display: 'flex',
    color: COLORS.midGray,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    
  },
  weekText: {
    padding: 10,
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
  }
});

export default styles;
