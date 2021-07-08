import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {UserNutritionInfoNetwork} from "../../../repository/nutrition/nutrition";
import {UserNutritionInfo} from "../../../types/nutrition/UserNutritionInfo";
import {useDispatch, useSelector} from "react-redux";
import {IStore} from "../../../redux";
import {setLatestUserNutritionInfo, setUserNutritionInfoList} from "../../../redux/nutrition/nutrition";
import {JWTResponse} from "../../../types/auth/JWTResponse";
import {FAB} from "react-native-paper";
import {calculateFieldData, findUserInfoFromLatestDate} from "./nutritionStackUtil";
import dateFormat from "dateformat";
import {ScrollView} from "react-native-gesture-handler";
import {getUser} from "../../../repository/AuthHelper";
import {Gender} from "../../../types/enum/Gender";
import {Unit} from "../../../types/enum/Unit";
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const UserNutritionScreen = ({navigation}: { navigation: any }) => {
    const [userNutritionInfo, setUserNutritionInfo] = useState<UserNutritionInfo>();
    const dispatch = useDispatch();
    const userInfo = useSelector<IStore, JWTResponse | undefined>(state => state.user.jwtResponse);
    const latestNutritionInfo = useSelector<IStore, UserNutritionInfo | undefined>((state) => state.nutrition.latestNutritionInfo);
    const [gender, setGender] = React.useState<Gender>(Gender.MALE);
    const [name, setName] = React.useState<string>();
    const [unit, setUnit] = React.useState<Unit>(Unit.METRIC)
    const [nutritionInfoList, setNutritionInfoList] = React.useState<UserNutritionInfo[] | undefined>()
    const defineUserInfo = () => {
        getUser().then(info => {
            console.log("userInfo", info);
            setName(info.name + " " + info.surname)
            setGender(info.gender);
            setUnit(info.unit)
        });
    }
    useEffect(() => {
        defineUserInfo();
        UserNutritionInfoNetwork.getAll()
          .then(userInfo => {
              dispatch(setUserNutritionInfoList(userInfo));
              setNutritionInfoList(userInfo);
              let latestInfo = findUserInfoFromLatestDate(userInfo)
              if (latestInfo) {
                  dispatch(setLatestUserNutritionInfo(latestInfo));
              }
              setUserNutritionInfo(latestInfo)
          });
    }, []);

    const onUserNutritionInfo = () => {
        setUserNutritionInfo(latestNutritionInfo);
        defineUserInfo();
    };

    function onPressCompareButton(fieldType: string) {
        let fieldData
        if (nutritionInfoList != undefined) {
            fieldData = calculateFieldData(nutritionInfoList, fieldType)
        }
        console.log("fieldData", fieldData)
        if (fieldData != undefined) {
            navigation.navigate('UserNutritionCompare', {
                fieldData: fieldData,
            });
        }
    }

    return (
      userNutritionInfo ? (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View>
                    <View style={styles.headerContainerFirst}>
                        <Text style={styles.nameText}>
                            {name}
                        </Text>
                        <Text style={styles.dateText}>
                            {dateFormat(latestNutritionInfo?.dateOfInfo, "dd-mm-yy").toString()}
                        </Text>
                    </View>
                    <View style={styles.headerContainerSecond}>
                        <Text style={styles.sexText}>
                            {gender}
                        </Text>
                        <TouchableOpacity style={styles.iconTouchable}>
                            <Icon name="edit" size={30} color="#000" style={styles.editIcon}/>

                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity style={styles.childContainer} onPress={() => onPressCompareButton("weight")}>
                    <Text style={styles.twoInputContainer}>
                        Weight
                    </Text>
                    <Text style={styles.twoInputContainer}>
                        {latestNutritionInfo?.weight}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.childContainer} onPress={() => onPressCompareButton("height")}>
                    <Text style={styles.twoInputContainer}>
                        Height
                    </Text>
                    <Text style={styles.twoInputContainer}>
                        {latestNutritionInfo?.height}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.childContainer} onPress={() => onPressCompareButton("shoulder")}>
                    <Text style={styles.twoInputContainer}>
                        Shoulder
                    </Text>
                    <Text style={styles.twoInputContainer}>
                        {latestNutritionInfo?.shoulder}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.childContainer} onPress={() => onPressCompareButton("arm")}>
                    <Text style={styles.twoInputContainer}>
                        Arm
                    </Text>
                    <Text style={styles.twoInputContainer}>
                        {latestNutritionInfo?.arm}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.childContainer} onPress={() => onPressCompareButton("forearm")}>
                    <Text style={styles.twoInputContainer}>
                        Forearm
                    </Text>
                    <Text style={styles.twoInputContainer}>
                        {latestNutritionInfo?.forearm}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.childContainer} onPress={() => onPressCompareButton("chest")}>
                    <Text style={styles.twoInputContainer}>
                        Chest
                    </Text>
                    <Text style={styles.twoInputContainer}>
                        {latestNutritionInfo?.chest}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.childContainer} onPress={() => onPressCompareButton("bust")}>
                    <Text style={styles.twoInputContainer}>
                        Bust
                    </Text>
                    <Text style={styles.twoInputContainer}>
                        {latestNutritionInfo?.bust}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.childContainer} onPress={() => onPressCompareButton("waist")}>
                    <Text style={styles.twoInputContainer}>
                        Waist
                    </Text>
                    <Text style={styles.twoInputContainer}>
                        {latestNutritionInfo?.waist}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.childContainer} onPress={() => onPressCompareButton("hip")}>
                    <Text style={styles.twoInputContainer}>
                        Hip
                    </Text>
                    <Text style={styles.twoInputContainer}>
                        {latestNutritionInfo?.hip}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.childContainer} onPress={() => onPressCompareButton("thigh")}>
                    <Text style={styles.twoInputContainer}>
                        Thigh
                    </Text>
                    <Text style={styles.twoInputContainer}>
                        {latestNutritionInfo?.thigh}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.childContainer} onPress={() => onPressCompareButton("calf")}>
                    <Text style={styles.twoInputContainer}>
                        Calf
                    </Text>
                    <Text style={styles.twoInputContainer}>
                        {latestNutritionInfo?.calf}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.childContainer} onPress={() => onPressCompareButton("fatPercentage")}>
                    <Text style={styles.twoInputContainer}>
                        Fat Percentage %
                    </Text>
                    <Text style={styles.twoInputContainer}>
                        {latestNutritionInfo?.fatPercentage}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.childContainer}
                                  onPress={() => onPressCompareButton("musclePercentage")}>
                    <Text style={styles.twoInputContainer}>
                        Muscle Percentage %
                    </Text>
                    <Text style={styles.twoInputContainer}>
                        {latestNutritionInfo?.musclePercentage}
                    </Text>
                </TouchableOpacity>
                <FAB
                  style={styles.fab}
                  small={true}
                  icon="plus"
                  onPress={() => {
                      navigation.navigate('AddNutritionInfoScreen', {
                          nutritionInfo: null,
                          userNutritionInfoRespond: onUserNutritionInfo
                      });
                  }}
                />
            </ScrollView>

        </SafeAreaView>
      ) : (
        <View style={styles.containerEmptyView}>
            <View style={styles.infoEmptyView}>
                <Text style={styles.infoEmptyText}>You have not entered your information yet!</Text>
            </View>
            <FAB
              style={styles.fab}
              small={true}
              icon="plus"
              onPress={() => {
                  navigation.navigate('AddNutritionInfoScreen', {
                      nutritionInfo: null,
                      userNutritionInfoRespond: onUserNutritionInfo
                  });
              }}
            />
        </View>
      )

    );
};
const styles = StyleSheet.create({
    containerEmptyView: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center"
    },
    container: {
        flex: 1,
        flexDirection: "column"
    },
    childContainer: {
        flexDirection: "row",
        borderStyle: "solid",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
    },
    infoEmptyView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoEmptyText: {
        color: '#000',
        fontSize: 20,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 50,
        height: 40,
        backgroundColor: 'red',
    },
    twoInputContainer: {
        flex: 2,
        margin: 8,

    },
    nameText: {
        flex: 2,
        margin: 16,
        fontSize: 20
    },
    dateText: {
        flex: 2,

        margin: 16,
        textAlign: 'right',
        fontSize: 20
    },
    sexText: {
        margin: 8,
        flex: 2,
    },
    editIcon: {
    },
    headerContainerSecond: {
        flexDirection: "row",
    },
    headerContainerFirst: {
        flexDirection: "row",
    },
    iconTouchable: {
        flex: 2,
        alignItems: 'flex-end',
        marginRight:16
    }
});
export default UserNutritionScreen;
