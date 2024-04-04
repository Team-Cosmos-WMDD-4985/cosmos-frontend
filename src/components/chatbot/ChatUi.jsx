import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, View, TextInput, Button, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import AxiosService from "./../../services/axios";
import { icons, COLORS, SIZES, images } from "../../constants";
import { sendMessageToOpenAI } from './ChatBot';
import Headers from '../../common/Headers';

const OpenAi = ({ route, navigation }) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const scrollViewRef = useRef();

  const { courseId } = route.params;

  // console.log(courseId);

  const handleSend = async () => {
    console.log(message)

    const userMessage = { role: 'user', content: message };
    setChat([...chat, userMessage]);
    setMessage('');
    const response = await AxiosService("GET", `chatai/${courseId}?message=${message}`, true);
    console.log(response.data);
    console.log(response.data.text);
    const botMessage = { role: 'bot', content: response.data.text };

    setChat((chat) => [...chat, botMessage]);



    // const botResponse = await sendMessageToOpenAI(message);
    // const botMessage = {role: 'bot', content: botResponse};
    // setChat((chat) => [...chat, botMessage]);
  };

  // console.log(chat)

  const handleNavigate = () => {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Headers courseText="Chat Bot" courseTextDes="Chat With PDF" handleNavigate={handleNavigate} display={true} />
      <ScrollView
        style={styles.scrollView}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
        {chat.map((msg, index) => (
          <View key={index} style={[styles.message, msg.role === 'user' ? styles.userMessage : styles.botMessage]}>
            <Text style={[msg.role === 'user' ? styles.messageTextUser : styles.messageTextBot]}>{msg.content}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setMessage}
          value={message}
          placeholder="Type a message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={() => handleSend()}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: COLORS.midTeal,
    fontSize: 20,
    margin: 'auto',
    textAlign: 'center',
  },
  sendButton: {
    width: 100,
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    // margin: 10,
    paddingHorizontal: 20,
  },
  scrollView: {
    flex: 1,
  },
  message: {
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
    width: '100%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.midGray,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.white,
  },
  messageTextUser: {
    color: 'white',
  },
  messageTextBot: {
    color: COLORS.primary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingLeft: 10,
    borderRadius: 30,
  },
});

export default OpenAi;
