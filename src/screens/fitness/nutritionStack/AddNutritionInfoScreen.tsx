import React, {useEffect} from 'react';
import {StyleSheet, View} from "react-native";
import {TouchableOpacity} from 'react-native-gesture-handler'
import {Button, Dialog, Paragraph, Portal, Text, TextInput} from 'react-native-paper';
import {UserNutritionInfo} from "../../../types/nutrition/UserNutritionInfo";
import {calculateFatPercentage, calculateLeanBodyMass} from "./nutritionStackUtil";
import {UserNutritionInfoNetwork} from "../../../repository/nutrition/nutrition";
import {useDispatch, useSelector} from "react-redux";
import {setLatestUserNutritionInfo} from "../../../redux/nutrition/nutrition";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import dateFormat from "dateformat";
import {Unit} from "../../../types/enum/Unit";
import {Gender} from "../../../types/enum/Gender";
import {getUser} from "../../../repository/AuthHelper";
import {JWTResponse} from "../../../types/auth/JWTResponse";
import {IStore} from "../../../redux";


const AddNutritionInfoScreen = ({route, navigation}: { route: any; navigation: any; }) => {
    const dispatch = useDispatch();
    const [dateOfInfo, setDateOfInfo] = React.useState<Date>(new Date());
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
    const [gender, setGender] = React.useState<Gender>(Gender.MALE);
    const [name, setName] = React.useState<string>();
    const latestNutritionInfo = useSelector<IStore, UserNutritionInfo | undefined>((state) => state.nutrition.latestNutritionInfo);

    useEffect(() => {
          let userInfo: JWTResponse;
          getUser().then(info => {
              console.log("userInfo", info);
              setName(info.name + " " + info.surname)
              setGender(info.gender);
              setUnit(info.unit)
          });
          if (nutritionInfo) {
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
        if (gender === 'MALE') {
            if (waist && waist === '0' && neck && neck === '0') {
                setErrInfo('Height,  waist and hip information must be given fore male and cannot be  0')
                showDialog()
                return;
            }
        } else {
            if (waist && waist === '0' && hip && hip === '0' && neck && neck === '0') {
                setErrInfo('Height, waist, hip and neck information must be given for female and cannot be 0')
                showDialog()
                return;
            }
        }
        let userInfoToCalculate = defineNewInfo();

        let bodyFat = calculateFatPercentage(userInfoToCalculate)
        let lbm = calculateLeanBodyMass(parseFloat(weight), bodyFat);
        setFatPercentage((-1 * bodyFat).toFixed(2).toString());
        setMusclePercentage(lbm.toFixed(2).toString());
    }

    const onPressSaveButton = () => {
        let newInfo = defineNewInfo();
        if (nutritionInfo) {
            newInfo.id = nutritionInfo.id;
            newInfo.createdAt = nutritionInfo.createdAt
            newInfo.createdBy = nutritionInfo.createdBy
            UserNutritionInfoNetwork.put(newInfo).then(r => {
                navigation.goBack();
            })
        } else {
            UserNutritionInfoNetwork.post(newInfo).then(r => {
                dispatch(setLatestUserNutritionInfo(r))
                console.log("respond", r)
                navigation.goBack();
                navigation.params.userNutritionInfoRespond();
            });
        }
    }

    const defineNewInfo = () => {
        let newInfo: UserNutritionInfo = {
            dateOfInfo: dateOfInfo,
            fatPercentage: parseFloat(fatPercentage),
            height: parseFloat(height),
            hip: parseFloat(hip),
            musclePercentage: parseFloat(musclePercentage),
            neck: parseFloat(neck),
            gender: gender,
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
        return newInfo;
    }
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    const showDatePicker = () => {
        console.log(dateFormat(dateOfInfo, "dd-mm-yy").toString())
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {setDatePickerVisibility(false);};
    const handleConfirm = (date: Date) => {
        console.warn("A date has been picked: ", date);
        setDateOfInfo(date);
        hideDatePicker();
    };
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
                      <Text style={styles.nameField}>{name}</Text>
                      <Text style={styles.nameField}>{gender}</Text>
                      <Text style={styles.nameField}>{unit}</Text>
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
                      <TouchableOpacity style={styles.dateStyle} onPress={showDatePicker}>
                          <Text style={styles.dateString}>
                              {dateFormat(dateOfInfo, "dd-mm-yy").toString()}
                          </Text>
                      </TouchableOpacity>
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
                        onChangeText={setWeight}
                        right={(
                          <Text>cm</Text>
                        )}
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
                      <Text style={styles.fieldText}>Shoulder</Text>
                      <TextInput
                        keyboardType={'number-pad'}
                        mode={'outlined'}
                        style={styles.textInput}
                        onChangeText={setShoulder}
                        value={shoulder}/>
                  </View>
                  <View style={styles.threeInputContainer}>
                      <Text style={styles.fieldText}>Arm</Text>
                      <TextInput
                        keyboardType={'number-pad'}
                        mode={'outlined'}
                        style={styles.textInput}
                        onChangeText={setArm}
                        value={arm}/>
                  </View>
                  <View style={styles.threeInputContainer}>
                      <Text style={styles.fieldText}>Chest</Text>
                      <TextInput
                        keyboardType={'number-pad'}
                        mode={'outlined'}
                        style={styles.textInput}
                        onChangeText={setChest}
                        value={chest}/>
                  </View>
              </View>
              <View style={styles.childContainer}>

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
                      <Text style={styles.fieldText}>Waist</Text>
                      <TextInput
                        keyboardType={'number-pad'}
                        mode={'outlined'}
                        style={styles.textInput}
                        onChangeText={setWaist}
                        value={waist}/>
                  </View>
                  <View style={styles.threeInputContainer}>
                      <Text style={styles.fieldText}>Thighs</Text>
                      <TextInput
                        keyboardType={'number-pad'}
                        mode={'outlined'}
                        style={styles.textInput}
                        onChangeText={setThigh}
                        value={thigh}/>
                  </View>
              </View>
              <View style={styles.childContainer}>

                  <View style={styles.threeInputContainer}>
                      <Text style={styles.fieldText}>Calf</Text>
                      <TextInput
                        keyboardType={'number-pad'}
                        mode={'outlined'}
                        style={styles.textInput}
                        onChangeText={setCalf}
                        value={calf}/>
                  </View>
                  <View style={styles.threeInputContainer}>
                      <Text style={styles.fieldText}>Neck</Text>
                      <TextInput
                        keyboardType={'number-pad'}
                        mode={'outlined'}
                        style={styles.textInput}
                        onChangeText={setNeck}
                        value={neck}/>
                  </View>
                  <View style={styles.threeInputContainer}>
                      <Text style={styles.fieldText}>Forearm</Text>
                      <TextInput
                        keyboardType={'number-pad'}
                        mode={'outlined'}
                        style={styles.textInput}
                        onChangeText={setForearm}
                        value={forearm}/>
                  </View>
                  <View style={styles.threeInputContainer}>
                      <Text style={styles.fieldText}>Bust</Text>
                      <TextInput
                        keyboardType={'number-pad'}
                        mode={'outlined'}
                        style={styles.textInput}
                        onChangeText={setBust}
                        value={bust}/>
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
        flex: 2,
        borderTopWidth: 0.2,
        borderBottomWidth: 0.2,
        borderLeftWidth: 0.2,
        borderRightWidth: 0.2,
    },
    threeInputContainer: {
        flex: 2,
        borderTopWidth: 0.2,
        borderBottomWidth: 0.2,
        borderLeftWidth: 0.2,
        borderRightWidth: 0.2,
    },
    fourInputContainer: {
        flex: 3,
        borderTopWidth: 0.2,
        borderBottomWidth: 0.2,
        borderLeftWidth: 0.2,
        borderRightWidth: 0.2,
    },
    textInput: {
        marginLeft: 10,
        marginRight: 10,
        height: 30,
        marginBottom: 5,

    },
    dropDownStyle: {
        marginTop: 0.2,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 10,
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
