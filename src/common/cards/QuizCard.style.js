import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: screenHeight * 0.125, // 12.5% of the screen height
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: SIZES.xSmall,
    borderRadius: SIZES.small,
    backgroundColor: "#FFF",
    ...SHADOWS.medium,
    marginBottom: 10,
  },
  logoContainer: {
    width: screenHeight * 0.1, // 12.5% of the screen height
    height: screenHeight * 0.1, // 12.5% of the screen height
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
  logoImage: {
    width: screenHeight * 0.1, // 12.5% of the screen height
    height: screenHeight * 0.1, // 12.5% of the screen height
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  jobName: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  jobType: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
    marginTop: 3,
    textTransform: "capitalize",
  },
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
initialsText:{
  color: COLORS.midTeal,
  fontSize: SIZES.xLarge,
    },
});

export default styles;
