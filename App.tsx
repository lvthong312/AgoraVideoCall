// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './src/screens/HomePage';
import VideoCallPage from './src/screens/VideoCallPage';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen
          name="VideoCallPage"
          component={VideoCallPage}
          options={{ headerShown: false, presentation: 'transparentModal' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
