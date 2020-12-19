import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Text, View, Button, ActivityIndicator} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignupScreen';
import HomeScreen from './HomeScreen';
import {AuthContext} from "../../components/context";

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => {

    return (
            <RootStack.Navigator headerMode='none'>
                <RootStack.Screen name="LoginScreen" component={LoginScreen}/>
                <RootStack.Screen name="HomeScreen" component={HomeScreen}/>
                <RootStack.Screen name="SignupScreen" component={SignUpScreen}/>
            </RootStack.Navigator>
    )
};
export default RootStackScreen;