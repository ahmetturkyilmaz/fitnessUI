import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Button as RNButton} from 'react-native';

import {totalProgramsNetwork} from '../../../repository/program/program';
import {updateMoveSetByDay} from './programStackUtil';
import DailyProgramInputCard from '../../../components/DailyProgramInputCard';

const EditDailyProgramScreen = ({route, navigation}) => {
  const {moveSet, day, totalProgram} = route.params;
  const [currentTotalProgram, setCurrentTotalProgram] = useState();
  const [currentMoveSet, setCurrentMoveSet] = useState([]);

  useEffect(() => {
    setCurrentTotalProgram(totalProgram);
    if (moveSet !== null) {
      setCurrentMoveSet(moveSet);
    }
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onPressSaveButton = () => {
    let newTotalProgram = updateMoveSetByDay(
      currentTotalProgram,
      day,
      currentMoveSet,
    );
    setCurrentTotalProgram(newTotalProgram);
    totalProgramsNetwork
      .put(currentTotalProgram)
      .then((r) => totalProgramsNetwork.getById(r))
      .then((payload) => {
        navigation.navigate('OneWeekProgramScreen', {
          newTotalProgram: payload,
        });
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
