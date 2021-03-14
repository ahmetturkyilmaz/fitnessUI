import React, {useEffect} from 'react';
import {View} from "react-native";
import {Button, Checkbox, Text, TextInput} from 'react-native-paper';
import 'antd-mobile/lib/date-picker/style/css';
import DropDownPicker from 'react-native-dropdown-picker';

const AddNutritionInfoScreen = ({route, navigation,}: { route: any; navigation: any; }) => {
    const [checked, setChecked] = React.useState(false);
    const [sex, setSex] = React.useState();
    const [weight, setWeight] = React.useState<string>();
    const [height, setHeight] = React.useState<string>();
    const [fatPercentage, setFatPercentage] = React.useState<string>();
    const [musclePercentage, setMusclePercentage] = React.useState<string>();

    const {nutritionInfo} = route.params
    useEffect(() => {

    }, [])

    const calculateButtonPressed = () => {

    }
    return (
      <View>
          <Checkbox status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setChecked(!checked);
                    }}
          />
          <View>
              <View>
                  <Text>Sex</Text>
                  <DropDownPicker
                    items={[
                        {label: 'MALE', value: 'MALE', hidden: true}, {label: 'FEMALE', value: 'FEMALE'}
                    ]}
                    defaultValue={sex}
                    containerStyle={{height: 40}}
                    style={{backgroundColor: '#fafafa'}}
                    itemStyle={{justifyContent: 'flex-start'}}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => setSex(item)}/>
              </View>
              <View>
                  <Text>Weight</Text>
                  <TextInput onChangeText={(text) => setWeight(text)}>{weight}</TextInput>
              </View>
              <View>
                  <Text>Height</Text>
                  <TextInput onChangeText={(text) => setHeight(text)}>{height}</TextInput>
              </View>
              <View>
                  <Text>Fat Percentage</Text>
                  <TextInput onChangeText={(text) => setFatPercentage(text)}>{fatPercentage}</TextInput>
              </View>
              <View>
                  <Button onPress={() =>}>Calculate Yourself</Button>
              </View>
              <View>
                  <Text>Muscle Percentage</Text>
                  <TextInput onChangeText={(text) => setMusclePercentage(text)}>{musclePercentage}</TextInput>
              </View>
          </View>
      </View>
    )
}

export default AddNutritionInfoScreen;
