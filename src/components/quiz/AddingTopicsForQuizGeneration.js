import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

const AddingTopicsForQuizGeneration = () => {
  const [topics, setTopics] = useState({
    topic1: '',
    topic2: '',
    topic3: '',
    topic4: '',
    topic5: '',

  });

  const handleInputChange = (topic, value) => {
    setTopics(prevTopics => ({
      ...prevTopics,
      [topic]: value,
    }));
  };

  const createQuiz = () => {
    // here you can write the Logic to handle quiz creation with the topics
    console.log(topics);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleInputChange('topic1', text)}
            value={topics.topic1}
            placeholder="topic1: Enter Topic"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleInputChange('topic2', text)}
            value={topics.topic2}
            placeholder="topic2: Enter Topic"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleInputChange('topic3', text)}
            value={topics.topic3}
            placeholder="topic3: Enter Topic"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleInputChange('topic4', text)}
            value={topics.topic4}
            placeholder="topic4: Enter Topic"
            />
            <TextInput  
            style={styles.input}
            onChangeText={(text) => handleInputChange('topic5', text)}
            value={topics.topic5}
            placeholder="topic5: Enter Topic"
            />
        </View>
        <Button title="Create Quiz" onPress={createQuiz} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  inputGroup: {
    marginVertical: 20,
  },
  input: {
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
  },
});

export default AddingTopicsForQuizGeneration;
