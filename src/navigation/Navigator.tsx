import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from '../screens/LoginScreen';
import {AuthContext} from '../contexts/auth/AuthContext';
import {Text} from 'react-native';
import {HomeScreen} from '../screens/HomeScreen';
import App from '../screens/ScanerScreen';

const Stack = createStackNavigator();

export const MyStack = () => {
  const {status, logOut} = useContext(AuthContext);

  if (status === 'checking') {
    logOut();
    <Text>Hola esamos porbando</Text>;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 0,
          backgroundColor: '#2c3169',
        },
        cardStyle: {
          backgroundColor: 'white',
        },
        headerTitleStyle:{
          color: 'white',
        }
      }}>
      {status !== 'authenticated' ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Empresas" component={HomeScreen} />
          <Stack.Screen name="qr" component={App} />
        </>
      )}
    </Stack.Navigator>
  );
};
