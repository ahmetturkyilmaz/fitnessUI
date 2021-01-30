import React, {useState, useEffect} from "react";
import {View, Text, TextInput} from "react-native";

const EditMappingScreen = ({route, navigation}) => {
  const {setRepMap} = route.params;
  const [currentMap, setCurrentMap] = useState()
  useEffect(() => {
    if (setRepMap !== 'undefined') {
      setCurrentMap(setRepMap)
    } else {
      setCurrentMap({1: {rep: 0, weight: 0}})
    }
  }, [])
  const renderItem = (key, value) => (
    <View key={key.toString()}>
      <Text>Set {key}</Text>
      <TextInput placeholder={value.rep} onChangeText={(text) => onChangeField(text, key, 'rep')}/>
      <TextInput placeholder={value.weight} onChangeText={(text) => onChangeField(text, key, 'weight')}/>
    </View>
  );
  const onChangeField = (text, key, type) => {
    let newMap = currentMap;
    let val = newMap.get(key);
    if (type === 'rep') {
      console.log('rep')
      val.rep = text;
    } else {
      console.log('weight')
      val.weight = text
    }
    newMap.set(key, val);
    setCurrentMap(newMap);
  }

  return (
    <View>
      {
        currentMap.map((key, value) => {
          return renderItem(key, value)
        })
      }
    </View>
  );
}

export default EditMappingScreen;