import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import SplashScreen from './SplashScreen';
import ProgramStack from './programStack/ProgramStackScreen';


const Tab = createMaterialBottomTabNavigator();

const RootStackScreen = ({navigation}) => {

    return (
        <Tab.Navigator>
            <Tab.Screen name="ProgramStack" component={ProgramStack} navigation={navigation}/>
            <Tab.Screen name="SplashScreen" component={SplashScreen} navigation={navigation}/>
        </Tab.Navigator>
    )
};
export default RootStackScreen;