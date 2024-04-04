import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../constants";

const styles = StyleSheet.create({
  btnContainer: {
    width: 64,
    height: 64,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small / 1.25,
    justifyContent: "center",
    alignItems: "center",
  },
  btnImg: (dimension) => ({
    width: dimension,
    height: dimension,
    borderRadius: SIZES.small / 1.25,
  }),
});

export default styles;
