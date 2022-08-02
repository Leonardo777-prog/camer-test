import React, {createContext, useEffect, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LoginData,
  UserData,
  LoginResponseOk,
  LoginResponseFail,
} from '../../interfaces/appInterfaces';
import {authReducer, AuthState} from './authReducer';
import {infocontrolApiMobile} from '../../apis/infocontrolApi';

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  user: UserData | null;
  status: 'checking' | 'authenticated' | 'not-authenticated';
  signIn: (loginData: LoginData) => void;
  logOut: () => void;
  removeError: () => void;
};

const authInicialState: AuthState = {
  status: 'not-authenticated',
  token: null,
  user: null,
  errorMessage: '',
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(authReducer, authInicialState);

  useEffect(() => {
    // checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');

    // No token, no autenticado
    if (!token) return dispatch({type: 'notAuthenticated'});

    // Hay token
    const resp = await infocontrolApiMobile.get('/auth');
    if (resp.status !== 200) {
      return dispatch({type: 'notAuthenticated'});
    }

    await AsyncStorage.setItem('token', resp.data.token);
    dispatch({
      type: 'signUp',
      payload: {
        token: resp.data.token,
        user: resp.data.usuario,
      },
    });
  };

  const signIn = async ({taxId, password}: LoginData) => {
    try {
      const {data} = await infocontrolApiMobile.get<LoginResponseOk>(
        `/service/login?username=${taxId}&password=${password}`);
      console.log(data);
      dispatch({
        type: 'signUp',
        payload: {
          token: data.data.Bearer,
          user: data.data.userData,
        },
      });

      await AsyncStorage.setItem('token', data.data.Bearer);
    } catch (error) {
      dispatch({
        type: 'addError',
        payload: 'Información incorrecta',
      });
    }
  };

  const logOut = async () => {
    await AsyncStorage.removeItem('token');
    dispatch({type: 'logout'});
  };

  const removeError = () => {
    dispatch({type: 'removeError'});
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        logOut,
        removeError,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
