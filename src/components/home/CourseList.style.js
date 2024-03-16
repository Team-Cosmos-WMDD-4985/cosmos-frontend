import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
import { COLORS, FONT, SIZES } from "../../constants";
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xLarge,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SIZES.small,
  },
  headerTitle: {
    fontSize: SIZES.large,
    color: COLORS.secondary,
    fontWeight: "700"
  },
  cardsContainer: {
    marginTop: SIZES.medium,
    gap: SIZES.small,
    height: screenHeight * 0.25, // 25% of the screen height
    borderRadius: 20,
  },
});

export default styles;
