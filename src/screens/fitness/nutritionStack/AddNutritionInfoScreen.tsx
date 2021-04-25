import React, {useEffect} from 'react';
import {StyleSheet, View} from "react-native";
import {Button, Checkbox, Dialog, Paragraph, Portal, Text, TextInput} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import {UserNutritionInfo} from "../../../types/nutrition/UserNutritionInfo";
import {Sex} from "../../../types/enum/Sex";
import {calculateFatPercentage} from "./nutritionStackUtil";
import {UserNutritionInfoNetwork} from "../../../repository/nutrition/nutrition";
import {useDispatch} from "react-redux";
import {setLatestUserNutritionInfo, setUserNutritionInfoList} from "../../../redux/nutrition/nutrition";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const AddNutritionInfoScreen = ({route, navigation}: { route: any; navigation: any; }) => {
    const dispatch = useDispatch();
    const [dateOfInfo, setDateOfInfo] = React.useState<Date>(new Date());
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
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
        console.warn("A date has been picked: ", date);
        hideDatePicker();
    };

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
            dateOfInfo: dateOfInfo,
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
            dateOfInfo: dateOfInfo,
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
      <View style={styles.container}>
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
              <Button title="Show Date Picker" onPress={showDatePicker}/>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
          </View>
          <View>
              <View>
                  <Text style={styles.fieldText}>Sex</Text>
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
              <View style={styles.childContainer}>
                  <View style={styles.twoInputContainer}>
                      <Text style={styles.fieldText}>Weight</Text>
                      <TextInput style={styles.textInput} onChangeText={(text) => setWeight(text)}>{weight}</TextInput>
                  </View>
                  <View style={styles.twoInputContainer}>
                      <Text style={styles.fieldText}>Height</Text>
                      <TextInput style={styles.textInput} onChangeText={(text) => setHeight(text)}>{height}</TextInput>
                  </View>
              </View>
              <View style={styles.childContainer}>
                  <View style={styles.threeInputContainer}>
                      <Text style={styles.fieldText}>Waist</Text>
                      <TextInput style={styles.textInput} onChangeText={(text) => setWaist(text)}>{waist}</TextInput>
                  </View>
                  <View style={styles.threeInputContainer}>
                      <Text style={styles.fieldText}>Hip</Text>
                      <TextInput style={styles.textInput} onChangeText={(text) => setHip(text)}>{hip}</TextInput>
                  </View>
                  <View style={styles.threeInputContainer}>
                      <Text style={styles.fieldText}>neck</Text>
                      <TextInput style={styles.textInput} onChangeText={(text) => setNeck(text)}>{neck}</TextInput>
                  </View>
              </View>
              <View style={styles.childContainer}>
                  <View style={styles.twoInputContainer}>
                      <Text style={styles.fieldText}>Fat Percentage</Text>
                      <TextInput style={styles.textInput}
                                 onChangeText={(text) => setFatPercentage(text)}>{fatPercentage}</TextInput>
                  </View>
                  <View style={styles.twoInputContainer}>
                      <Text style={styles.fieldText}>Muscle Percentage</Text>
                      <TextInput style={styles.textInput}
                                 onChangeText={(text) => setMusclePercentage(text)}>{musclePercentage}</TextInput>
                  </View>
              </View>
              <View>
                  <Button onPress={() => onCalculateButtonPressed()}>Calculate Yourself</Button>
              </View>

              <Button onPress={() => onPressSaveButton()}/>

          </View>
      </View>
    )
}
const styles = StyleSheet.create({


    container: {
        flex: 1,
        backgroundColor: '#E57D14',
        flexDirection: "column"
    },
    childContainer: {
        flexDirection: "row",
    },
    twoInputContainer: {
        flex: 2
    },
    threeInputContainer: {
        flex: 2
    },
    textInput: {
        marginLeft: 10,
        marginRight: 10
    },
    fieldText: {

        color: '#000',
        fontSize: 12,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 8,
        marginRight: 8,
        textAlign: "center"
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 50,
        height: 40,
        backgroundColor: 'red',
    },
});
export default AddNutritionInfoScreen;
