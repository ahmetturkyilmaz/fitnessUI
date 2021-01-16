import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import SplashScreen from './SplashScreen';
import ProgramStack from './programStack/ProgramStackScreen';
import {DefaultTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

const RootStackScreen = ({navigation}) => {
  return (
    <Tab.Navigator barStyle={{backgroundColor: DefaultTheme.colors.primary}}>
      <Tab.Screen
        name="Programs"
        component={ProgramStack}
        navigation={navigation}
        options={{
          tabBarLabel: 'Programs',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="text-box-check-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Calorie Calculator"
        component={SplashScreen}
        navigation={navigation}
        options={{
          tabBarLabel: 'Calorie Calculator',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="calculator" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default RootStackScreen;
