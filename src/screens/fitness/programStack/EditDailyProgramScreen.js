import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from "react-native";
import {Button} from "react-native-paper";
import {totalPrograms} from "../../../repository/program/program";
import {updateMoveSetByDay} from "./programStackUtil";
import DailyProgramInputCard from "../../../components/DailyProgramInputCard";

const EditDailyProgramScreen = ({route, navigation}) => {
  const {moveSet, day, totalProgram} = route.params;
  const [currentTotalProgram, setCurrentTotalProgram] = useState();
  const [currentMoveSet, setCurrentMoveSet] = useState([]);

  useEffect(() => {
    console.log("totalprogram editdailyprogram", totalProgram)
    console.log("totalprogram moveSet", moveSet)
    setCurrentTotalProgram(totalProgram);
    if (moveSet !== null) {
      console.log("gelir", currentMoveSet)
      setCurrentMoveSet(moveSet);
    }
  }, [])


  const onPressSaveButton = () => {
    console.log("*****", currentMoveSet)
    let newTotalProgram = updateMoveSetByDay(currentTotalProgram, day, currentMoveSet);
    setCurrentTotalProgram(newTotalProgram);
    totalPrograms.put(currentTotalProgram)
      .then(r => totalPrograms
        .getById(r)
        .then(payload => {
          setCurrentTotalProgram(payload)
        })).then(
      navigation.navigate("OneWeekProgramScreen",
        {newTotalProgram: currentTotalProgram}))

  }


  console.log("currentMoveSet", currentMoveSet)

  return (
    <View>
      <Button onPress={() => onPressSaveButton()} mode="contained"/>
      <DailyProgramInputCard moveSet={moveSet} onMoveSetChanged={(input) => {
        setCurrentMoveSet(input)
      }}/>


    </View>
  )
}
const styles = StyleSheet.create({})
export default EditDailyProgramScreen;