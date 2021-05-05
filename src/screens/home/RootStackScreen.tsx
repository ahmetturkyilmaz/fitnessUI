import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignupScreen';

const RootStack = createStackNavigator();

const RootStackScreen = () => {
  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen name="LoginScreen" component={LoginScreen} />
      <RootStack.Screen name="SignupScreen" component={SignUpScreen} />
    </RootStack.Navigator>
  );
};
export default RootStackScreen;
