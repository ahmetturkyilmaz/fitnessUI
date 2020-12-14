import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Text, View, Button, ActivityIndicator} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import LoginScreen from './src/screens/home/LoginScreen';
import SignUpScreen from './src/screens/home/SignupScreen';
import HomeScreen from './src/screens/home/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StackNavigator from '@react-navigation/stack/src/navigators/createStackNavigator';
import RootStackScreen from "./src/screens/home/RootStackScreen";


const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function App() {
    const [isLoading, setLoading] = React.useState(true);
    const [userToken, setUserToken] = React.useState(null);
    const style = {
        headerStyle: {
            backgroundColor: "#E57D14"
        },
        headerTintColor: '#000000',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }
    return (
        <NavigationContainer>
            <RootStackScreen name="RootStackScreen"/>
        </NavigationContainer>
    );
}
