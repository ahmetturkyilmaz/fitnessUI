import React, {useEffect} from 'react';
import {View} from "react-native";
import {Button, Checkbox, Dialog, Paragraph, Portal, Text, TextInput} from 'react-native-paper';
import 'antd-mobile/lib/date-picker/style/css';
import DropDownPicker from 'react-native-dropdown-picker';
import {UserNutritionInfo} from "../../../types/nutrition/UserNutritionInfo";
import {Sex} from "../../../types/enum/Sex";
import calculateFatPercentage from "./nutritionStackUtil";
import {UserNutritionInfoNetwork} from "../../../repository/nutrition/nutrition";
import {useDispatch} from "react-redux";
import {setLatestUserNutritionInfo, setUserNutritionInfoList} from "../../../redux/nutrition/nutrition";

const AddNutritionInfoScreen = ({route, navigation,}: { route: any; navigation: any; }) => {
    const dispatch = useDispatch();

    const [checked, setChecked] = React.useState(false);
    const [sex, setSex] = React.useState<Sex>(Sex.MALE);
    const [weight, setWeight] = React.useState<string>("");
    const [height, setHeight] = React.useState<string>("");
    const [fatPercentage, setFatPercentage] = React.useState<string>("");
    const [musclePercentage, setMusclePercentage] = React.useState<string>("");
    const [waist, setWaist] = React.useState<string>("");
    const [neck, setNeck] = React.useState<string>("");
    const [hip, setHip] = React.useState<string>("");
    const [visible, setVisible] = React.useState(false);
    const [errInfo, setErrInfo] = React.useState<string>();
    const {nutritionInfo} = route.params

    useEffect(() => {
          if (nutritionInfo) {
              setSex(nutritionInfo.sex);
              setWeight(nutritionInfo.weight);
              setHeight(nutritionInfo.height);
              musclePercentage(nutritionInfo.musclePercentage);
              setFatPercentage(nutritionInfo.fatPercentage);
              setWaist(nutritionInfo.waist);
              setHip(nutritionInfo.hip);
              setNeck(nutritionInfo.neck);
          }
      },
      []);

    function onCalculateButtonPressed() {
        if (sex && sex === 'MALE') {
            if (waist && waist === '0' && hip && hip === '0') {
                setErrInfo('Waist and hip information must be given fore male and cannot be  0')
                showDialog()
                return;
            }
        } else {
            if (waist && waist === '0' && hip && hip === '0' && neck && neck === '0') {
                setErrInfo('Waist, hip and neck information must be given for female and cannot be 0')
                showDialog()
                return;
            }
        }
        let userInfo: UserNutritionInfo = {
            fatPercentage: parseFloat(fatPercentage),
            height: parseFloat(height),
            hip: parseFloat(hip),
            musclePercentage: parseFloat(musclePercentage),
            neck: parseFloat(neck),
            sex: sex,
            unit: "",
            waist: parseFloat(waist),
            weight: 0
        }
        let bodyFat = calculateFatPercentage(userInfo)
        setFatPercentage(bodyFat.toString);
    }

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const onPressSaveButton = () => {
        let newInfo: UserNutritionInfo = {
            fatPercentage: parseFloat(fatPercentage),
            height: parseFloat(height),
            hip: parseFloat(hip),
            musclePercentage: parseFloat(musclePercentage),
            neck: parseFloat(neck),
            sex: sex,
            unit: "",
            waist: parseFloat(waist),
            weight: 0
        }
        if (nutritionInfo) {
            newInfo.id = nutritionInfo.id;
            newInfo.createdAt = nutritionInfo.createdAt
            newInfo.createdBy = nutritionInfo.createdBy
            UserNutritionInfoNetwork.put(newInfo).then(r => {
                UserNutritionInfoNetwork.getAll().then(newInfos => dispatch(setUserNutritionInfoList(newInfos)));
            })
        } else {
            UserNutritionInfoNetwork.post(newInfo).then(r => dispatch(setLatestUserNutritionInfo(r)));
        }
        navigation.goBack();
    }

    return (
      <View>
          <Portal>
              <Dialog visible={visible} onDismiss={hideDialog}>
                  <Dialog.Title>Alert</Dialog.Title>
                  <Dialog.Content>
                      <Paragraph>{errInfo}</Paragraph>
                  </Dialog.Content>
                  <Dialog.Actions>
                      <Button onPress={hideDialog}>Done</Button>
                  </Dialog.Actions>
              </Dialog>
          </Portal>
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
                  <View>
                      <Text>Waist</Text>
                      <TextInput onChangeText={(text) => setWaist(text)}>{waist}</TextInput>
                  </View>
                  <View>
                      <Text>Hip</Text>
                      <TextInput onChangeText={(text) => setHip(text)}>{hip}</TextInput>
                  </View>
                  <View>
                      <Text>neck</Text>
                      <TextInput onChangeText={(text) => setNeck(text)}>{neck}</TextInput>
                  </View>
              </View>
              <View>
                  <Button onPress={() => onCalculateButtonPressed()}>Calculate Yourself</Button>
              </View>
              <View>
                  <Text>Muscle Percentage</Text>
                  <TextInput onChangeText={(text) => setMusclePercentage(text)}>{musclePercentage}</TextInput>
              </View>
              <Button onPress={() => onPressSaveButton()}/>

          </View>
      </View>
    )
}

export default AddNutritionInfoScreen;
