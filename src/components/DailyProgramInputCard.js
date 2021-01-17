import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Card, Title, Button, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useRoute} from '@react-navigation/native';

const DailyProgramInputCard = (props) => {
  const [currentMoveSet, setCurrentMoveSet] = useState(props.moveSet);
  const [buttonDisabled, isButtonDisabled] = useState(true);
  const [currentSetRepWeightMap, setCurrentSetRepWeightMap] = useState();
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    console.log('olması gereken', currentMoveSet);
    setCurrentMoveSet(props.moveSet);
  }, []);
  useEffect(() => {
    console.log('sonraki', currentMoveSet);
  }, []);
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
  };
  const onPressAddNewMoveButton = () => {
    setCurrentMoveSet((state) => [
      ...state,
      {name: '', sets: '', moveNumber: currentMoveSet.length + 1},
    ]);
  };
  const onPressRemoveButton = (moveNumber) => {
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

  const moveSets = (currentMoveSet ?? []).map((data) => (
    <Card
      key={data.moveNumber.toString()}
      style={{borderBottomWidth: 1, borderBottomColor: '#f1f1f1'}}>
      <Card.Content>
        <Title>{`${data.moveNumber}. Move`}</Title>
        <TextInput
          mode="outlined"
          label="name"
          value={data.name}
          onChangeText={(text) =>
            onChangeText(text, data.moveNumber - 1, 'nameField')
          }
        />
        <TextInput
          mode="outlined"
          label="sets"
          value={data.sets.toString()}
          onChangeText={(text) =>
            onChangeText(text, data.moveNumber - 1, 'setField')
          }
        />
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => onPressRemoveButton()}>Remove</Button>
        <Button onPress={() => navigation.navigate("EditMappingScreen", {data: data})}>Edit Reps And Weights</Button>
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
