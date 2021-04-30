import React, {useEffect} from 'react';
import {StyleSheet, View} from "react-native";
import {TouchableOpacity} from 'react-native-gesture-handler'
import {Button, Dialog, Paragraph, Portal, Text, TextInput} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import {UserNutritionInfo} from "../../../types/nutrition/UserNutritionInfo";
import {Sex} from "../../../types/enum/Sex";
import {calculateFatPercentage} from "./nutritionStackUtil";
import {UserNutritionInfoNetwork} from "../../../repository/nutrition/nutrition";
import {useDispatch, useSelector} from "react-redux";
import {setLatestUserNutritionInfo, setUserNutritionInfoList} from "../../../redux/nutrition/nutrition";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import dateFormat from "dateformat";
import {Unit} from "../../../types/enum/Unit";
import {IStore} from "../../../redux";
import {JWTResponse} from "../../../types/auth/JWTResponse";


const AddNutritionInfoScreen = ({route, navigation}: { route: any; navigation: any; }) => {
    const dispatch = useDispatch();
    const [dateOfInfo, setDateOfInfo] = React.useState<Date>(new Date());
    const [sex, setSex] = React.useState<Sex>(Sex.MALE);
    const [unit, setUnit] = React.useState<Unit>(Unit.METRIC)
    const [weight, setWeight] = React.useState<string>("");
    const [height, setHeight] = React.useState<string>("");
    const [fatPercentage, setFatPercentage] = React.useState<string>("");
    const [musclePercentage, setMusclePercentage] = React.useState<string>("");
    const [waist, setWaist] = React.useState<string>("");
    const [neck, setNeck] = React.useState<string>("");
    const [hip, setHip] = React.useState<string>("");
    const [arm, setArm] = React.useState<string>("");
    const [shoulder, setShoulder] = React.useState<string>("");
    const [chest, setChest] = React.useState<string>("");
    const [thigh, setThigh] = React.useState<string>("");
    const [calf, setCalf] = React.useState<string>("");
    const [forearm, setForearm] = React.useState<string>("");
    const [bust, setBust] = React.useState<string>("");
    const [visible, setVisible] = React.useState(false);
    const [errInfo, setErrInfo] = React.useState<string>();
    const {nutritionInfo} = route.params
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
    const userInfo = useSelector<IStore, JWTResponse | undefined>(state => state.user.jwtResponse)

    const showDatePicker = () => {
        console.log(dateFormat(dateOfInfo, "dd-mm-yy").toString())
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
        console.warn("A date has been picked: ", date);
        setDateOfInfo(date);
        hideDatePicker();
    };

    useEffect(() => {
          if (nutritionInfo) {
              setSex(nutritionInfo.sex);
              setWeight(nutritionInfo.weight);
              setHeight(nutritionInfo.height);
              setMusclePercentage(nutritionInfo.musclePercentage);
              setFatPercentage(nutritionInfo.fatPercentage);
              setWaist(nutritionInfo.waist);
              setHip(nutritionInfo.hip);
              setNeck(nutritionInfo.neck);
              setArm(nutritionInfo.arm);
              setThigh(nutritionInfo.thigh);
              setChest(nutritionInfo.chest);
              setShoulder(nutritionInfo.shoulder);
              setThigh(nutritionInfo.thigh);
              setForearm(nutritionInfo.forearm);
              setBust(nutritionInfo.bust);
              setCalf(nutritionInfo.calf);
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
            bust: 0, calf: 0, forearm: 0,
            dateOfInfo: dateOfInfo,
            fatPercentage: parseFloat(fatPercentage),
            height: parseFloat(height),
            hip: parseFloat(hip),
            musclePercentage: parseFloat(musclePercentage),
            neck: parseFloat(neck),
            sex: sex,
            unit: unit,
            weight: parseFloat(weight),
            waist: parseFloat(waist),
            arm: 0,
            chest: 0,
            thigh: 0,
            shoulder: 0
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
            unit: unit,
            waist: parseFloat(waist),
            weight: parseFloat(weight),
            arm: parseFloat(arm),
            chest: parseFloat(chest),
            thigh: parseFloat(thigh),
            shoulder: parseFloat(shoulder),
            bust: parseFloat(bust),
            calf: parseFloat(calf),
            forearm: parseFloat(forearm),
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

          <View>
              <View style={styles.childContainer}>
                  <View style={styles.twoInputContainer}>
                      <Text style={styles.nameField}>{userInfo?.name}</Text>
                  </View>
                  <View style={styles.twoInputContainer}>
                      <Text style={styles.fieldText}>Date</Text>
                      <TouchableOpacity style={styles.dateStyle} onPress={showDatePicker}>
                          <Text style={styles.dateString}>
                              {dateFormat(dateOfInfo, "dd-mm-yy").toString()}
                          </Text>
                          <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                          />
                      </TouchableOpacity>
                  </View>
              </View>
              <View style={styles.childContainer}>
                  <View style={styles.twoInputContainer}>
                      <Text style={styles.fieldText}>Sex</Text>
                      <DropDownPicker
                        items={[
                            {label: 'MALE', value: Sex.MALE, hidden: true},
                            {label: 'FEMALE', value: Sex.FEMALE}
                        ]}
                        defaultValue={sex}
                        containerStyle={{height: 40}}
                        style={styles.textInput}
                        itemStyle={{justifyContent: 'flex-start'}}
                        dropDownStyle={styles.dropDownStyle}
                        onChangeItem={setSex}/>
                  </View>
                  <View style={styles.twoInputContainer}>
                      <Text style={styles.fieldText}>Unit</Text>
                      <DropDownPicker
                        items={[
                            {label: 'METRIC (gram,meter)', value: Unit.METRIC, hidden: true},
                            {label: 'IMPERIAL (pound,inch)', value: Unit.IMPERIAL}
                        ]}
                        defaultValue={unit}
                        containerStyle={{height: 40}}
                        style={styles.textInput}
                        itemStyle={{justifyContent: 'flex-start'}}
                        dropDownStyle={{backgroundColor: '#fafafa'}}
                        onChangeItem={setUnit}/>
                  </View>
              </View>
              <View style={styles.childContainer}>
                  <View style={styles.twoInputContainer}>
                      <Text style={styles.fieldText}>Weight</Text>
                      <TextInput
                        keyboardType={'number-pad'}
                        mode={'outlined'}
                        selectionColor={'#578'}
                        underlineColor={'#861'}
                        style={styles.textInput}
                        onChangeText={(text) => setWeight(text)}
                        value={weight}/>
                  </View>
                  <View style={styles.twoInputContainer}>
                      <Text style={styles.fieldText}>Height</Text>
                      <TextInput
                        keyboardType={'number-pad'}
                        mode={'outlined'}
                        style={styles.textInput}
                        onChangeText={setHeight}
                        value={height}/>
                  </View>
              </View>
              <View style={styles.childContainer}>
                  <View style={styles.threeInputContainer}>
                      <Text style={styles.fieldText}>Waist</Text>
                      <TextInput
                        keyboardType={'number-pad'}
                        mode={'outlined'}
                        style={styles.textInput}
                        onChangeText={setWaist}
                        value={waist}/>
                  </View>
                  <View style={styles.threeInputContainer}>
                      <Text style={styles.fieldText}>Hip</Text>
                      <TextInput
                        keyboardType={'number-pad'}
                        mode={'outlined'}
                        style={styles.textInput}
                        onChangeText={setHip}
                        value={hip}/>
                  </View>
                  <View style={styles.threeInputContainer}>
                      <Text style={styles.fieldText}>neck</Text>
                      <TextInput
                        keyboardType={'number-pad'}
                        mode={'outlined'}
                        style={styles.textInput}
                        onChangeText={setNeck}
                        value={neck}/>
                  </View>
              </View>
              <View style={styles.childContainer}>
                  <View style={styles.twoInputContainer}>
                      <Text style={styles.fieldText}>Fat Percentage</Text>
                      <TextInput
                        keyboardType={'number-pad'}
                        mode={'outlined'}
                        style={styles.textInput}
                        onChangeText={setFatPercentage}
                        value={fatPercentage}/>
                  </View>
                  <View style={styles.twoInputContainer}>
                      <Text style={styles.fieldText}>Muscle Percentage</Text>
                      <TextInput
                        keyboardType={'number-pad'}
                        mode={'outlined'}
                        style={styles.textInput}
                        onChangeText={setMusclePercentage}
                        value={musclePercentage}/>
                  </View>
              </View>
              <View>
                  <Button onPress={() => onCalculateButtonPressed()}>Calculate Yourself</Button>
              </View>
              <Button onPress={() => onPressSaveButton()}>Save</Button>
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
    dropDownStyle: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 20,
        backgroundColor: '#fafafa'
    },
    dateStyle: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#fff',
        justifyContent: "center",
    },
    dateString: {
        backgroundColor: '#fff',
        marginBottom: 5,
        marginLeft: 8,
        marginRight: 8,
        textAlign: "center",
    },
    nameField: {
        textAlign: "center"
    },
    fieldText: {
        color: '#000',
        fontSize: 12,
        marginTop: 8,
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
    saveButton: {
        backgroundColor: '#000'
    },
});
export default AddNutritionInfoScreen;
