import React, {useState, useEffect} from 'react';
import {View, Text, TextInput} from 'react-native';
import {RepWeight} from '../../../types/RepWeight';

const EditMappingScreen = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const {setRepMap} = route.params;
  const [currentMap, setCurrentMap] = useState<Record<number, RepWeight>>();
  useEffect(() => {
    if (setRepMap !== 'undefined') {
      setCurrentMap(setRepMap);
    } else {
      setCurrentMap({1: {rep: 0, weight: 0}});
    }
  }, []);
  const renderItem = (key: number, value: RepWeight) => (
    <View key={key.toString()}>
      <Text>Set {key}</Text>
      <TextInput
        placeholder={value.rep.toString()}
        onChangeText={(text) => onChangeField(text, key, 'rep')}
      />
      <TextInput
        placeholder={value.weight.toString()}
        onChangeText={(text) => onChangeField(text, key, 'weight')}
      />
    </View>
  );
  const onChangeField = (text: string, key: number, type: string) => {
    let newMap = currentMap;
    let val;
    if (newMap) {
      val = newMap.key;
    }
    if (type === 'rep') {
      console.log('rep');
      val.rep = text;
    } else {
      console.log('weight');
      val.weight = text;
    }
    newMap.set(key, val);
    setCurrentMap(newMap);
  };

  return (
    <View>
      {currentMap.map((key, value) => {
        return renderItem(key, value);
      })}
    </View>
  );
};

export default EditMappingScreen;
