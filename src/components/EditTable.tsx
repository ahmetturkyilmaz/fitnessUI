import React from 'react';
import {View, TextInput, Text} from 'react-native';
import {Button} from "react-native-paper";


export default class EditTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {data, navigation} = this.props
    this.state = {
      buttonDisabled: data.sets === 0
    }



    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

      </View>
    );
  }
}