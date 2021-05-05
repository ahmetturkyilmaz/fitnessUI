import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import NutritionStackScreen from './nutritionStack/NutritionStackScreen';
import ProgramStack from './programStack/ProgramStackScreen';
import {DefaultTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

const RootStackScreen = () => {
    return (
      <Tab.Navigator barStyle={{backgroundColor: DefaultTheme.colors.primary}}>
          <Tab.Screen
            name="Programs"
            component={ProgramStack}
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
            name="NutritionStack"
            component={NutritionStackScreen}
            options={{
                tabBarLabel: 'Calorie Calculator',
                tabBarIcon: ({color}) => (
                  <MaterialCommunityIcons name="calculator" color={color} size={26}/>
                ),
            }}
          />
      </Tab.Navigator>
    );
};
export default RootStackScreen;
