import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TotalProgramListScreen from './TotalProgramListScreen';
import OneWeekProgramScreen from "./OneWeekProgramScreen";


const ProgramStack = createStackNavigator();


const ProgramStackScreen = ({navigation}) => (
    <ProgramStack.Navigator>
        <ProgramStack.Screen name="TotalProgramList" component={TotalProgramListScreen} navigation={navigation}/>
        <ProgramStack.Screen name="OneWeekProgramScreen" component={OneWeekProgramScreen} navigation={navigation}/>
    </ProgramStack.Navigator>
)
export default ProgramStackScreen;