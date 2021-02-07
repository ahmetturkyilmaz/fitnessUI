import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TotalProgramListScreen from './TotalProgramListScreen';
import WeeklyProgramsScreen from './WeeklyProgramsScreen';
import EditDailyProgramScreen from './EditDailyProgramScreen';
import EditMappingScreen from './EditMappingScreen';

type ProgramStackParamsList = {
  TotalProgramList: {};
  WeeklyProgramsScreen: {};
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
      name="WeeklyProgramsScreen"
      options={{title: 'Weekly Program'}}
      component={WeeklyProgramsScreen}
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
