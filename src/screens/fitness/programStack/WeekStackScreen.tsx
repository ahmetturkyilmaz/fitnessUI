import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useDispatch, useSelector} from 'react-redux';
import {IStore} from '../../../redux';
import {totalProgramsNetwork} from '../../../repository/program/program';
import {initializingTotalProgramData} from '../../../types/program/DefaultProgram';
import {
  setTotalProgram,
  setWeeklyProgramList,
} from '../../../redux/program/program';
import {TotalProgram} from '../../../types/program/TotalProgram';
import WeeklyProgramsScreen from './WeeklyProgramsScreen';
import {WeeklyProgram} from '../../../types/program/WeeklyProgram';

const Tab = createMaterialTopTabNavigator();

const WeekStackScreen = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const [allWeeklyPrograms, setAllWeeklyProgram] = useState<WeeklyProgram[]>();
  const dispatch = useDispatch();
  const currentTotalProgram = useSelector<IStore, TotalProgram | undefined>(
    (state) => state.program.totalProgram,
  );
  useEffect(() => {
    if (!currentTotalProgram) {
      console.log('totalProgram null');
      totalProgramsNetwork.post(initializingTotalProgramData).then((data) => {
        console.log(data);
        dispatch(setTotalProgram(data));
        setAllWeeklyProgram(data.weeklyPrograms);
      });
    } else {
      console.log('totalProgram not null', currentTotalProgram);
      setAllWeeklyProgram(currentTotalProgram.weeklyPrograms);
    }
    dispatch(setWeeklyProgramList(allWeeklyPrograms));
  }, []);

  return (
    <Tab.Navigator>
      {allWeeklyPrograms?.map((value) => {
        <Tab.Screen
          name="WeeklyProgramsScreen"
          component={WeeklyProgramsScreen}
        />;
      })}
    </Tab.Navigator>
  );
};
