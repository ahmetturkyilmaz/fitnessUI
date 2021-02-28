import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {Button, Card, TextInput, Title} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import {MoveSet} from '../types/program/MoveSet';

const DailyProgramInputCard = (props: {
  moveSet: MoveSet[];
  onMoveSetChanged: (arg0: any) => void;
}) => {
  const [currentMoveSet, setCurrentMoveSet] = useState(props.moveSet);
  const [buttonDisabled, isButtonDisabled] = useState(true);
  const [currentSetRepWeightMap, setCurrentSetRepWeightMap] = useState();
  const route = useRoute();

  useEffect(() => {
    console.log('olması gereken', currentMoveSet);
    setCurrentMoveSet(props.moveSet);
  }, []);

  const onChangeText = (text: string, index: number, fieldType: string) => {
    let newCurrentMoveSet = [...currentMoveSet];
    if (fieldType === 'nameField') {
      console.log('nameField');
      newCurrentMoveSet[index].name = text;
    } else {
      console.log('setField');
      newCurrentMoveSet[index].sets = Number.parseInt(text);
      isButtonDisabled(false);
    }
    setCurrentMoveSet(newCurrentMoveSet);
  };
  const onPressAddNewMoveButton = () => {
    setCurrentMoveSet((state: any) => [
      ...state,
      {name: '', sets: '', moveNumber: currentMoveSet.length + 1},
    ]);
  };
  const onPressRemoveButton = (moveNumber: number) => {
    let newCurrentMoveSet = [...currentMoveSet];
    let i = 1;
    newCurrentMoveSet.splice(moveNumber - 1, 1);
    console.log('splice', newCurrentMoveSet);
    if (newCurrentMoveSet.length > 0) {
      for (let moveSet of newCurrentMoveSet) {
        moveSet.moveNumber = i;
        i++;
      }
    }
    setCurrentMoveSet(newCurrentMoveSet);
  };
  useEffect(() => {
    props.onMoveSetChanged(currentMoveSet);
  }, [currentMoveSet]);

  const moveSets = currentMoveSet.map((data) => (
    <Card
      key={data.moveNumber?.toString()}
      style={{borderBottomWidth: 1, borderBottomColor: '#f1f1f1'}}>
      <Card.Content>
        <Title>{`${data.moveNumber}. Move`}</Title>
        <TextInput
          mode="outlined"
          label="name"
          value={data.name}
          onChangeText={(text) =>
            onChangeText(text, data.moveNumber, 'nameField')
          }
        />
        <TextInput
          mode="outlined"
          label="sets"
          value={data.sets?.toString()}
          onChangeText={(text) =>
            onChangeText(text, data.moveNumber - 1, 'setField')
          }
        />
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => onPressRemoveButton(data.moveNumber)}>
          Remove
        </Button>
      </Card.Actions>
    </Card>
  ));

  return (
    <SafeAreaView>
      <ScrollView>
        {moveSets}
        <View style={{margin: 16}}>
          <Button mode="contained" onPress={() => onPressAddNewMoveButton()}>
            Add New Move
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default DailyProgramInputCard;
