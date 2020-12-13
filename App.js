import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {Text, View, Button, ActivityIndicator} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StackNavigator from '@react-navigation/stack/src/navigators/createStackNavigator';

const Stack = createStackNavigator();
export default function App() {
    const [isLoading, setLoading] = React.useState(true);
    const [userToken, setUserToken] = React.useState(null);

    return (

        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="HomeScreen" component={HomeScreen}/>
                <Stack.Screen name="LoginScreen" component={LoginScreen}/>
                <Stack.Screen name="SignupScreen" component={SignUpScreen}/>
            </Stack.Navigator>
        </NavigationContainer>

    );
}
