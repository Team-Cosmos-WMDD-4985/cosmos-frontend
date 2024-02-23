import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import AppStack from './src/stack/AppStack';

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <GluestackUIProvider config={config}>
          <AppStack />
        </GluestackUIProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
