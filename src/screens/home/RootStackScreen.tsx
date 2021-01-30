import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => {
  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        navigation={navigation}
      />
      <RootStack.Screen
        name="SignupScreen"
        component={SignUpScreen}
        navigation={navigation}
      />
    </RootStack.Navigator>
  );
};
export default RootStackScreen;
