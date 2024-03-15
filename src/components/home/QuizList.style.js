import { StyleSheet } from "react-native";

import { FONT, SIZES, COLORS } from "../../constants";

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xLarge,
    // height: 250,

  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.secondary,
    fontWeight: "bold",

  },
  headerBtn: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.secondary,
  },
  cardsScrollContainer: {
    // maxHeight: 240,
  },
  cardsContainer: {
    marginTop: SIZES.medium,
    // height:240,
  },
});

export default styles;
