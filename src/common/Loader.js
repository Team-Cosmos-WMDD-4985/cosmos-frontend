import { View, ActivityIndicator, StyleSheet, Text, Image } from "react-native"
import loaderGif from "./../assets/images/loading.gif";

const Loader = () => {
  return (
    <View style={styles.loaderContainer}>
        <Image source={loaderGif} style={styles.imageSize} />
    </View>
  )
}

export default Loader;

const styles = StyleSheet.create({
  loaderContainer: {
    zIndex: 999,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  imageSize: {
    width: 80,
    height: 80
  },
});