import React from 'react'
import { View, Text,StyleSheet } from 'react-native'



const CreateYourQuiz = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Create Your Quiz!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
    },
    title: {
        textAlign: "center",
        paddingTop: 50,
        fontSize: 23,
        fontWeight:  "bold"
    }
})

export default CreateYourQuiz