import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ActivityIndicator, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import RootStackScreen from './src/screens/home/RootStackScreen';
import FitnessStackScreen from './src/screens/fitness/FitnessStackScreen';
import {getAccessToken} from './src/repository/AuthHelper';
import {IStore} from './src/redux';
import {setToken} from './src/redux/user/user';

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

    return (
      <NavigationContainer>
          {loading ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large"/>
            </View>
          ) : userToken != null ? (
            <FitnessStackScreen/>
          ) : (
            <RootStackScreen/>
          )}
      </NavigationContainer>
    );
}
