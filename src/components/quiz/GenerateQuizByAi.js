import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, icons, images, SIZES,WEIGHT } from "../../constants";


const GenerateQuizByAi = ({ route }) => {
  const { selectedTopics } = route.params;
  
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Generate Quiz By AI</Text>
      {selectedTopics.map((topic, index) => (
        <Text key={index} style={styles.topic}>{topic}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: SIZES.xLarge,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  topic: {
    fontSize: SIZES.large,
    marginVertical: 5,
  },
});

export default GenerateQuizByAi;