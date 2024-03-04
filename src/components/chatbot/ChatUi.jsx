import React, {useState, useRef, useEffect} from 'react';
import {SafeAreaView, View, TextInput, Button, Text, ScrollView, StyleSheet} from 'react-native';

import {sendMessageToOpenAI} from './ChatBot';

const OpenAi = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const scrollViewRef = useRef();

  const handleSend = async () => {

    const userMessage = {role: 'user', content: message};
    setChat([...chat, userMessage]);
    setMessage('');

    const botResponse = await sendMessageToOpenAI(message);
    const botMessage = {role: 'bot', content: botResponse};
    setChat((chat) => [...chat, botMessage]);
  };

  console.log(chat)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({animated: true})}
      >
        {chat.map((msg, index) => (
          <View key={index} style={[styles.message, msg.role === 'user' ? styles.userMessage : styles.botMessage]}>
            <Text style={styles.messageText}>{msg.content}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setMessage}
          value={message}
          placeholder="Type a message..."
          onSubmitEditing={handleSend}
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  scrollView: {
    flex: 1,
  },
  message: {
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#0078fe',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'lightgreen',
  },
  messageText: {
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingLeft: 10,
  },
});

export default OpenAi;
