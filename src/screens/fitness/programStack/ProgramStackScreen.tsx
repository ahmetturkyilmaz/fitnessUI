import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TotalProgramListScreen from './TotalProgramListScreen';
import OneWeekProgramScreen from './OneWeekProgramScreen';
import EditDailyProgramScreen from './EditDailyProgramScreen';
import EditMappingScreen from './EditMappingScreen';
import {StackNavigationProp} from '@react-navigation/stack';

type ProgramStackParamsList = {
  TotalProgramList: {};
  OneWeekProgramScreen: {};
  EditDailyProgramScreen: {};
  EditMappingScreen: {};
};

const ProgramStack = createStackNavigator<ProgramStackParamsList>();

const ProgramStackScreen = () => (
  <ProgramStack.Navigator initialRouteName="TotalProgramList">
    <ProgramStack.Screen
      name="TotalProgramList"
      options={{title: 'Programs'}}
      component={TotalProgramListScreen}
    />
    <ProgramStack.Screen
      name="OneWeekProgramScreen"
      options={{title: 'Weekly Program'}}
      component={OneWeekProgramScreen}
    />
    <ProgramStack.Screen
      name="EditDailyProgramScreen"
      options={{title: 'Daily Program'}}
      component={EditDailyProgramScreen}
    />
    <ProgramStack.Screen
      options={{title: 'Edit'}}
      name="EditMappingScreen"
      component={EditMappingScreen}
    />
  </ProgramStack.Navigator>
);
export default ProgramStackScreen;
