import React from 'react';
import 'react-native-gesture-handler';
import {Text} from 'react-native';
import {Background} from './src/components/UI/Background';
import {LoginScreen} from './src/screens/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import {MyStack} from './src/navigation/Navigator';
import {AuthProvider} from './src/contexts/auth/AuthContext';

const AppState = ({children}: any) => {
  return <AuthProvider>{children}</AuthProvider>;
};

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <MyStack />
      </AppState>
    </NavigationContainer>
  );
};

export default App;
