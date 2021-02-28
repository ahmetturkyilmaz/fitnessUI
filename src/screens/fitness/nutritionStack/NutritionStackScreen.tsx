import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UserNutritionScreen from './UserNutritionScreen';

type ProgramStackParamsList = {
  UserNutritionScreen: {};
};

const NutritionStack = createStackNavigator<ProgramStackParamsList>();
const NutritionStackScreen = ({navigation}: {navigation: any}) => (
  <NutritionStack.Navigator>
    <NutritionStack.Screen
      name="UserNutritionScreen"
      options={{title: 'User Nutrition'}}
      component={UserNutritionScreen}
    />
  </NutritionStack.Navigator>
);
export default NutritionStackScreen;
