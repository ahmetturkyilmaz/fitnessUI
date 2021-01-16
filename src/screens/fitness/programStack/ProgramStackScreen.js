import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TotalProgramListScreen from './TotalProgramListScreen';
import OneWeekProgramScreen from './OneWeekProgramScreen';
import EditDailyProgramScreen from './EditDailyProgramScreen';
import EditMappingScreen from './EditMappingScreen';

const ProgramStack = createStackNavigator();

const ProgramStackScreen = ({navigation}) => (
  <ProgramStack.Navigator>
    <ProgramStack.Screen
      name="TotalProgramList"
      options={{title: 'Programs'}}
      component={TotalProgramListScreen}
      navigation={navigation}
    />
    <ProgramStack.Screen
      name="OneWeekProgramScreen"
      options={{title: 'Weekly Program'}}
      component={OneWeekProgramScreen}
      navigation={navigation}
    />
    <ProgramStack.Screen
      name="EditDailyProgramScreen"
      options={{title: 'Daily Program'}}
      component={EditDailyProgramScreen}
      navigation={navigation}
    />
    <ProgramStack.Screen
      options={{title: 'Edit'}}
      name="EditMappingScreen"
      component={EditMappingScreen}
      navigation={navigation}
    />
  </ProgramStack.Navigator>
);
export default ProgramStackScreen;
