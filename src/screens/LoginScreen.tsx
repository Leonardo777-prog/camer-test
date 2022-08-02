import React, {useContext, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
  TouchableOpacity,
} from 'react-native';

import {useForm} from '../hooks/useForm';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthContext} from '../contexts/auth/AuthContext';
import {Background} from '../components/UI/Background';
import {loginStyles} from '../themes/loginTheme';

interface Props extends StackScreenProps<any, any> {}

export const LoginScreen = ({navigation}: Props) => {
  const {signIn, errorMessage, removeError} = useContext(AuthContext);

  const {taxId, password, onChange} = useForm({
    taxId: '20422055518',
    password: '@meli2o21',
  });

 
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  
    if (errorMessage?.length === 0) return;

    Alert.alert('Login incorrecto', errorMessage, [
      {
        text: 'Ok',
        onPress: removeError,
      },
    ]);
  }, [errorMessage]);

  const onLogin = () => {
    console.log({taxId, password});
    Keyboard.dismiss();
    signIn({taxId, password});
  };

  return (
    <>
      {/* Background */}
      <Background />

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={loginStyles.formContainer}>

          <Text style={loginStyles.title}>Infocontrol</Text>

          <Text style={loginStyles.label}>Usuario:</Text>
          <TextInput
            placeholder="Usuario o N° de Identificación"
            placeholderTextColor="rgba(255,255,255,0.4)"
            keyboardType="email-address"
            underlineColorAndroid="white"
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIOS,
            ]}
            selectionColor="white"
            onChangeText={value => onChange(value, 'taxId')}
            value={taxId}
            onSubmitEditing={onLogin}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={loginStyles.label}>Contraseña:</Text>
          <TextInput
            placeholder="******"
            placeholderTextColor="rgba(255,255,255,0.4)"
            underlineColorAndroid="white"
            secureTextEntry
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIOS,
            ]}
            selectionColor="white"
            onChangeText={value => onChange(value, 'password')}
            value={password}
            onSubmitEditing={onLogin}
            autoCapitalize="none"
            autoCorrect={false}
          />

          {/* Boton login */}
          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={loginStyles.button}
              onPress={onLogin}>
              <Text style={loginStyles.buttonText}>Ingresar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
