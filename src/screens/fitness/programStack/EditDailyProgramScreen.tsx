import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Button as RNButton} from 'react-native';

import {totalProgramsNetwork} from '../../../repository/program/program';
import {updateMoveSetByDay} from './programStackUtil';
import DailyProgramInputCard from '../../../components/DailyProgramInputCard';
import {useDispatch, useSelector} from 'react-redux';
import {IStore} from '../../../redux';
import {TotalProgram} from '../../../types/program/TotalProgram';
import {setTotalProgram} from '../../../redux/program';

const EditDailyProgramScreen = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const {moveSet, day} = route.params;
  const [currentMoveSet, setCurrentMoveSet] = useState([]);
  const dispatch = useDispatch();
  const currentTotalProgram = useSelector<IStore, TotalProgram | undefined>(
    (state) => state.program.totalProgram,
  );
  useEffect(() => {
    if (moveSet !== null) {
      setCurrentMoveSet(moveSet);
    }
  }, []);

  const onPressSaveButton = () => {
    let newTotalProgram = updateMoveSetByDay(
      currentTotalProgram,
      day,
      currentMoveSet,
    );
    dispatch(setTotalProgram(newTotalProgram));
    totalProgramsNetwork
      .put(currentTotalProgram)
      .then((r) => totalProgramsNetwork.getById(r))
      .then((payload) => {
        navigation.navigate('OneWeekProgramScreen');
      });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <RNButton
          onPress={() => {
            onPressSaveButton();
          }}
          title="Save"
        />
      ),
    });
  }, [navigation, onPressSaveButton]);

  return (
    <View>
      <DailyProgramInputCard
        moveSet={moveSet}
        onMoveSetChanged={(input) => {
          setCurrentMoveSet(input);
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({});
export default EditDailyProgramScreen;
