import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {View, ActivityIndicator, Alert} from 'react-native';

import RootStackScreen from './src/screens/home/RootStackScreen';
import FitnessStackScreen from './src/screens/fitness/FitnessStackScreen';
import {AuthContext} from './src/components/context';
import {
  storeAccessToken,
  getAccessToken,
  removeAccessToken,
} from './src/repository/AuthHelper';
import {getAuth, postAuth} from './src/repository/auth/user';
import {AuthConcept} from "./src/model/auth/AuthConcept";

export default function App() {
  type ACTIONTYPE =
    | { type: "prevState"; payload: number }
    | { type: "payload"; payload: string };

  const [state, dispatch] = React.useReducer(
    (prevState, payload) => {
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
      } catch (error) {
      }
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };
    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      getToken: () => state.userToken,
      signIn: async (authContext: AuthConcept) => {
        getAuth(authContext)
          .then((response) => response.data)
          .then((response) => {
            console.log(response);
            storeAccessToken(response.accessToken);
            dispatch({type: 'SIGN_IN', token: response.accessToken});
          })
          .catch((error) => {
            console.log('error', error.message);
          });
      },
      signOut: () => {
        removeAccessToken();
        dispatch({type: 'SIGN_OUT'});
      },
      signUp: async (authContext: AuthConcept) => {
        return postAuth(authContext)
          .then((response) => response.data)
          .then((response) => {
            console.log(response.message);
          })
          .catch((error) => {
            console.log('error', error.message);
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
            <ActivityIndicator size="large"/>
          </View>
        ) : state.userToken != null ? (
          <FitnessStackScreen name="FitnessStackScreen"/>
        ) : (
          <RootStackScreen name="RootStackScreen"/>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
