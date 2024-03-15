import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';

import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";
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
    padding: 10,
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

export default styles;
