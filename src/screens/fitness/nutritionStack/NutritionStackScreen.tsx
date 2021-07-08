import React from 'react';
import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack';
import UserNutritionScreen from './UserNutritionScreen';
import AddNutritionInfoScreen from "./AddNutritionInfoScreen";
import UserNutritionCompareScreen from "./UserNutritionCompareScreen";
import {FieldInfo} from "../../../types/nutrition/FieldInfo";

type NutritionStackParamsList = {
    UserNutritionScreen: {};
    AddNutritionInfoScreen: {};
    UserNutritionCompare: { fieldData: FieldInfo };
};
type UserNutritionCompareScreenProp = StackNavigationProp<NutritionStackParamsList>
const NutritionStack = createStackNavigator<NutritionStackParamsList>();
const NutritionStackScreen = () => (
  <NutritionStack.Navigator>
      <NutritionStack.Screen
        name="UserNutritionScreen"
        options={{title: 'User Nutrition'}}
        component={UserNutritionScreen}
      />
      <NutritionStack.Screen
        name="AddNutritionInfoScreen"
        options={{title: 'Add new info'}}
        component={AddNutritionInfoScreen}
      />
      <NutritionStack.Screen
        name="UserNutritionCompare"
        options={{title: 'User Nutrition Compare'}}
        component={UserNutritionCompareScreen}
      />
  </NutritionStack.Navigator>
);
export default NutritionStackScreen;
