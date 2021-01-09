import React, {useState, useEffect} from 'react';
import {FlatList, Text, TouchableOpacity, SafeAreaView, View, StyleSheet, ScrollView} from 'react-native';
import {Card, Title, Button, TextInput} from 'react-native-paper';
import Icon from "react-native-vector-icons/FontAwesome";
import {useRoute} from "@react-navigation/native";


const DailyProgramInputCard = (props) => {
  const [currentMoveSet, setCurrentMoveSet] = useState(props.moveSet)
  const [buttonDisabled, isButtonDisabled] = useState(true);
  const [currentSetRepWeightMap, setCurrentSetRepWeightMap] = useState()
  const route = useRoute();
  useEffect(() => {
    console.log("olması gereken", currentMoveSet)
    setCurrentMoveSet(props.moveSet);

  }, [])
  useEffect(() => {
    console.log("sonraki", currentMoveSet)
  }, [])
  const onChangeText = (text, index, fieldType) => {

    let newCurrentMoveSet = [...currentMoveSet];
    if (fieldType === 'nameField') {
      console.log('nameField');
      newCurrentMoveSet[index].name = text;
    } else {
      console.log('setField');
      newCurrentMoveSet[index].sets = text;
      isButtonDisabled(false);
    }
    setCurrentMoveSet(newCurrentMoveSet);
  }
  const onPressAddNewMoveButton = () => {
    setCurrentMoveSet(state => ([...state, {name: "", sets: "", moveNumber: currentMoveSet.length + 1}]));
  }
  const onPressRemoveButton = (moveNumber) => {
    let newCurrentMoveSet = [...currentMoveSet];
    let i = 1;
    newCurrentMoveSet.splice(moveNumber - 1, 1);
    console.log("splice", newCurrentMoveSet)
    if (newCurrentMoveSet.length > 0) {
      for (let moveSet of newCurrentMoveSet) {
        moveSet.moveNumber = i;
        i++;
      }
    }
    setCurrentMoveSet(newCurrentMoveSet);
  }
  useEffect(() => {
    console.log("after splice", currentMoveSet)
    props.onMoveSetChanged(currentMoveSet);
  }, [currentMoveSet])

  const moveSets = (currentMoveSet ?? []).map((data) => (
    <Card key={data.moveNumber.toString()}>
      <Card.Content>
        <Title>{data.moveNumber + "-"}</Title>
        <TextInput label="name" value={data.name}
                   onChangeText={(text) => onChangeText(text, data.moveNumber - 1, 'nameField')}/>
        <TextInput label="sets" value={data.sets.toString()}
                   onChangeText={(text) => onChangeText(text, data.moveNumber - 1, 'setField')}/>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => onPressRemoveButton()}>Remove</Button>
      </Card.Actions>
    </Card>
  ))

  return (
    <SafeAreaView>
      <ScrollView>
        {moveSets}
        <TouchableOpacity>
          <Icon.Button name="plus-circle" size={30} color="#900"
                       onPress={() => onPressAddNewMoveButton()}/>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>

  );

}
export default DailyProgramInputCard;