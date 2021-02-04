import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {View, ActivityIndicator, Alert} from 'react-native';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import store from './store';
import RootStackScreen from './src/screens/home/RootStackScreen';
import FitnessStackScreen from './src/screens/fitness/FitnessStackScreen';
import {AuthContext} from './src/components/context';
import {
  storeAccessToken,
  getAccessToken,
  removeAccessToken,
} from './src/repository/AuthHelper';
import {getAuth, postAuth} from './src/repository/auth/user';
import {LoginRequest} from './src/types/auth/LoginRequest';
import {IAuthContext} from './src/types/auth/IAuthContext';
import {JWTResponse} from './src/types/auth/JWTResponse';

export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState: any, payload: any) => {
      switch (payload.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: payload.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: payload.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await getAccessToken();
      } catch (error) {}
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };
    bootstrapAsync();
  }, []);

  const authContext = React.useMemo<IAuthContext>(
    () => ({
      getToken: () => state.userToken,

      signIn: async (authContext: LoginRequest): Promise<JWTResponse> => {
        return getAuth(authContext).then((response) => {
          console.log(response);
          storeAccessToken(response.accessToken);
          dispatch({type: 'SIGN_IN', token: response.accessToken});
          return response;
        });
      },

      signOut: () => {
        removeAccessToken();
        dispatch({type: 'SIGN_OUT'});
      },

      signUp: async (authContext: LoginRequest): Promise<string> => {
        return postAuth(authContext).then((response) => {
          console.log(response);
          return response;
        });
      },
    }),
    [state.userToken],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {state.isLoading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" />
          </View>
        ) : state.userToken != null ? (
          <FitnessStackScreen />
        ) : (
          <RootStackScreen />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
