import React, {useState} from 'react';

import {View, FlatList, TextInput} from "react-native";

const EditDailyProgramScreen = () => {
  const [title, setTitle] = useState("");
  const [programList, setProgramList] = useState([]);
  const [field, setField] = useState();
  return (
    <View>
      <TextInput
        placeholder="Add "
        value={title}
        onChangeText={value => setTitle(value)}/>
      <FlatList>

      </FlatList>
    </View>
  )
}

export default EditDailyProgramScreen;