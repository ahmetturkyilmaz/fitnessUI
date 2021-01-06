import React, {useState, useEffect} from 'react';

import {View, FlatList, TextInput, Text} from "react-native";
import DataTable from "../../../components/DataTable";
import {Button} from "react-native-paper";
import EditTable from "../../../components/EditTable";
import * as dailyPrograms from "../../../repository/network";

const EditDailyProgramScreen = ({route, navigation}) => {
  const {dailyProgram} = route.params;
  const [title, setTitle] = useState("");
  const [currentProgram, setCurrentProgram] = useState([]);
  const [field, setField] = useState();
  const [buttonDisabled, isButtonDisabled] = useState()

  useEffect(() => {
    if (dailyProgram !== 'undefined') {
      setCurrentProgram(dailyProgram)
    }
  }, [setCurrentProgram])

  const onChangeText = (text) => {
    if (text > 0) {
      this.setState({buttonDisabled: false})
    }
  }

  const renderRow = (number, name, setNumber) => {
    return (
      <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row'}}>
        <Text style={{flex: 1, alignSelf: 'stretch'}}>{number}</Text>
        <TextInput placeholder={name ? name : "name"} style={{flex: 1, alignSelf: 'stretch'}}/>
        <TextInput placeholder={setNumber ? setNumber : 0}
                   style={{flex: 1, alignSelf: 'stretch'}}
                   onChangeText={(text) => onChangeText(text)}/>
        <Button disabled={state.buttonDisabled} onClick={navigation.navigate("EditMappingScreen")}/>
        <Button color='red'/>
      </View>
    );
  }
  const onPress = () => {
  dailyPrograms.post()
  }

  return (
    <View>
      {
        data.map((data, index) => {
          return renderRow(index, data.name, data.sets);
        })
      }

      <Button onPress={() => onPress()}/>

    </View>
  )
}

export default EditDailyProgramScreen;