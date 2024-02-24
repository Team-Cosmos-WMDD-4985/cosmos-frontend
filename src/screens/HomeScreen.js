import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
// import DocumentUploader from './DocumentUploader'; 

function HomeScreen({navigation}) {

  const moveTo = () => {
    
  }
  return (
    <View style={styles.container}>
      <Text>Welcome to the Home Screen!</Text>
      {/* <DocumentUploader /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
