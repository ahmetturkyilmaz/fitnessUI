import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {View, ActivityIndicator, Alert} from 'react-native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import RootStackScreen from './src/screens/home/RootStackScreen';
import FitnessStackScreen from './src/screens/fitness/FitnessStackScreen';
import {
  storeAccessToken,
  getAccessToken,
  removeAccessToken,
} from './src/repository/AuthHelper';
import {IStore, store} from './src/redux';
import {setToken} from './src/redux/user';

export default function App() {
  const dispatch = useDispatch();
  const loading = useSelector<IStore>((state) => state.core.loading);
  const userToken = useSelector<IStore>((state) => state.user.token);
  React.useEffect(() => {
    const bootstrapAsync = async () => {
      getAccessToken().then((token) => {
        if (token) {
          dispatch(setToken(token));
        }
      });
    };
    bootstrapAsync();
  }, []);

  /*  const authContext = React.useMemo<IAuthContext>(
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
    );*/

  return (
    <Provider store={store}>
      <NavigationContainer>
        {loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" />
          </View>
        ) : userToken != null ? (
          <FitnessStackScreen />
        ) : (
          <RootStackScreen />
        )}
      </NavigationContainer>
    </Provider>
  );
}
