import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../constants";

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
    fontSize: SIZES.medium,
    // fontFamily: FONT.medium,
    color: COLORS.secondary,
    // lineHeight: 28,
    fontWeight: "700"
  },
  cardsContainer: {
    marginTop: SIZES.medium,
    gap: SIZES.small,
    height:240,
  },
});

export default styles;
