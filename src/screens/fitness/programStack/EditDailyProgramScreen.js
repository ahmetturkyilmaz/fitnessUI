import React, {useState, useEffect} from 'react';
import {View, TextInput, Text} from "react-native";
import {Button} from "react-native-paper";
import {totalPrograms} from "../../../repository/program/program";

const EditDailyProgramScreen = ({route, navigation}) => {
  const {moveSet, day, totalProgram} = route.params;
  const {currentTotalProgram, setCurrentTotalProgram} = useState();
  const [title, setTitle] = useState("");
  const [currentMoveSet, setCurrentMoveSet] = useState([]);
  const [field, setField] = useState();
  const [buttonDisabled, isButtonDisabled] = useState()

  useEffect(() => {
    setCurrentTotalProgram(totalProgram)
    if (moveSet !== 'undefined') {
      setCurrentMoveSet(moveSet)
    }
  }, [])


  const renderRow = (index, name, setNumber) => {
    return (
      <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row'}}>
        <Text style={{flex: 1, alignSelf: 'stretch'}}>{index}</Text>
        <TextInput placeholder={name ? name : "name"}
                   style={{flex: 1, alignSelf: 'stretch'}}
                   onChangeText={(text) => onChangeTextNameField(text, index)}/>
        <TextInput placeholder={setNumber ? setNumber : 0}
                   style={{flex: 1, alignSelf: 'stretch'}}
                   onChangeText={(text) => onChangeTextSetField(text, index)}/>
        <Button disabled={state.buttonDisabled}
                onClick={navigation.navigate("EditMappingScreen", {
                  setNumber: setNumber
                })}/>
        <Button color='red'
                onClick={() => {
                  onPressDeleteRowButton()
                }}/>
      </View>
    );
  }
  const onChangeTextNameField = (text, index) => {
    if (text > 0) {
      let newCurrentMoveSet = currentMoveSet;
      newCurrentMoveSet[index].name = text;
      setCurrentMoveSet(newCurrentMoveSet);
    }
  }
  const onChangeTextSetField = (text, index) => {
    if (text > 0) {
      let newCurrentMoveSet = currentMoveSet;
      this.setState({buttonDisabled: false});
      newCurrentMoveSet[index].sets = text;
      setCurrentMoveSet(newCurrentMoveSet);
    }
  }
  const onPressDeleteRowButton = (index) => {
    let newCurrentMoveSet = currentMoveSet;
    newCurrentMoveSet.splice(index, 1);
    setCurrentMoveSet(newCurrentMoveSet);
  }
  const onPressSaveButton = () => {
    totalPrograms.put(currentTotalProgram)
      .then(r => setCurrentTotalProgram(r))
  }
  return (
    <View>
      {
        currentMoveSet.map((data, index) => {
          return renderRow(index, data.name, data.sets);
        })
      }
      <Button onPress={() => onPressSaveButton()}/>
    </View>
  )
}

export default EditDailyProgramScreen;