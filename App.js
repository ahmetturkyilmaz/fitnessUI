import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, Button, ActivityIndicator, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RootStackScreen from "./src/screens/home/RootStackScreen";
import FitnessStackScreen from "./src/screens/fitness/FitnessStackScreen"
import { AuthContext } from "./src/components/context";

import { getAuth } from './src/service/user';

const Stack = createStackNavigator();

export default function App() {
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
        }
    );

    /*
    const authContext = React.useMemo(() => ({
        signIn: () => {
            setUserToken("asdasda");
            setLoading(false);
        },
        signOut: () => {
            setUserToken(null);
            setLoading(false);
        },
        signUp: () => {
            setUserToken("asdasda");
            setLoading(false);
        }
    }));
*/
    React.useEffect(() => {

        const bootstrapAsync = async () => {
            let userToken;
            try {
                userToken = await AsyncStorage.getItem('userToken');
            } catch (error) {

            }
            dispatch({ type: 'RESTORE_TOKEN', token: userToken });

        }
        bootstrapAsync();
    }, []);


    const authContext = React.useMemo(
        () => ({
            getToken: () => (
                state.userToken
            ),
            signIn: async data => {
                getAuth(data.email, data.password)
                    .then(response => response.data)
                    .then(response => {
                        console.log(response)
                        dispatch({ type: 'SIGN_IN', token: response.accessToken });
                    })
                    .catch(error => {
                        console.log('error', error.message);
                    })
            },
            signOut: () => dispatch({ type: 'SIGN_OUT' }),
            signUp: async data => {
                dispatch({ type: 'SIGN_UP', token: 'dummy-auth-token' });
            },
        }),
        [state.userToken]
    );
    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {state.isLoading ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" />
                    </View>
                ) : state.userToken != null ?
                        (<FitnessStackScreen name="FitnessStackScreen" />)
                        :
                        (<RootStackScreen name="RootStackScreen" />)
                }
            </NavigationContainer>
        </AuthContext.Provider>

    );
}
