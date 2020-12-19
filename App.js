import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, Button, ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import LoginScreen from './src/screens/home/LoginScreen';
import SignUpScreen from './src/screens/home/SignupScreen';
import HomeScreen from './src/screens/home/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StackNavigator from '@react-navigation/stack/src/navigators/createStackNavigator';
import RootStackScreen from "./src/screens/home/RootStackScreen";
import { AuthContext } from "./src/components/context";
import { useEffect } from "react/cjs/react.production.min";
import SplashScreen from './src/screens/home/SplashScreen'

const Stack = createStackNavigator();
//const Tab = createMaterialBottomTabNavigator();

export default function App() {
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
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
            signIn: async data => {
                // we need to send some data (usually username, password) to server and get a token
                // need to handle errors if sign in failed
                // After getting token, we need to persist the token using `AsyncStorage`

                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
            signOut: () => dispatch({ type: 'SIGN_OUT' }),
            signUp: async data => {
                dispatch({ type: 'SIGN_UP', token: 'dummy-auth-token' });
            },
        }),
        []
    );

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {state.isLoading ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" />
                    </View>
                ) : state.userToken != null ? (
                    <Stack.Navigator>
                        <Stack.Screen name="HomeScreen" component={HomeScreen} />
                    </Stack.Navigator>)
                        :
                        (<RootStackScreen name="RootStackScreen" />)
                }
            </NavigationContainer>
        </AuthContext.Provider>

    );
}
