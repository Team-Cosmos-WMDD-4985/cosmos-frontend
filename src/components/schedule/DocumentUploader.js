import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import axios from 'axios';

export default function DocumentUploader() {
  const [responseText, setResponseText] = useState('');

  const handleSubmit = async () => {
    const data = {
      prompt: "Your text here", 
      max_tokens: 50,
    };

    try {
      const response = await axios.post('https://api.openai.com/v1/completions', data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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`,
        },
      });

      setResponseText(response.data.choices[0].text);
      Alert.alert('Success', 'Response received from OpenAI');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to get response from OpenAI');
    }
  };

  return (
    <View style={styles.container}>
      {/* Your existing UI for file selection */}
      <Button title="Submit to OpenAI" onPress={handleSubmit} />
      <Text>Response from OpenAI: {responseText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
