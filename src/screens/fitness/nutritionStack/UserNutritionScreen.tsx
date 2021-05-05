import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {UserNutritionInfoNetwork} from "../../../repository/nutrition/nutrition";
import {UserNutritionInfo} from "../../../types/nutrition/UserNutritionInfo";
import {useDispatch, useSelector} from "react-redux";
import {IStore} from "../../../redux";
import {setLatestUserNutritionInfo, setUserNutritionInfoList} from "../../../redux/nutrition/nutrition";
import {JWTResponse} from "../../../types/auth/JWTResponse";
import {FAB} from "react-native-paper";
import {findUserInfoFromLatestDate} from "./nutritionStackUtil";
import dateFormat from "dateformat";
import {ScrollView} from "react-native-gesture-handler";

const UserNutritionScreen = ({navigation}: { navigation: any }) => {
    const [userNutritionInfo, setUserNutritionInfo] = useState<UserNutritionInfo>();
    const dispatch = useDispatch();
    const userNutritionInfoList = useSelector<IStore, UserNutritionInfo[]>((state) => state.nutrition.userNutritionInfoList);
    const userInfo = useSelector<IStore, JWTResponse | undefined>(state => state.user.jwtResponse);
    const latestNutritionInfo = useSelector<IStore, UserNutritionInfo | undefined>((state) => state.nutrition.latestNutritionInfo)

    useEffect(() => {
        console.log("userInfo : ", userInfo);
        UserNutritionInfoNetwork.getAll()
          .then(userInfo => {
              dispatch(setUserNutritionInfoList(userInfo));
              let latestInfo = findUserInfoFromLatestDate(userInfo)
              if (latestInfo) {
                  dispatch(setLatestUserNutritionInfo(latestInfo));
              }
              setUserNutritionInfo(latestInfo)
          });
    }, [])
    return (

      userNutritionInfo ? (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.childContainer}>
                    <View style={styles.twoInputContainer}>

                        <Text style={styles.nameText}>
                            {userInfo?.name + " " + userInfo?.surname}
                        </Text>
                        <Text style={styles.sexText}>
                            {userNutritionInfo?.gender}
                        </Text>

                    </View>
                    <View style={styles.twoInputContainer}>
                        <Text style={styles.dateText}>
                            {dateFormat(userNutritionInfo?.createdAt, "dd-mm-yy").toString()}
                        </Text>
                    </View>
                </View>
                <View style={styles.childContainer}>
                    <Text style={styles.twoInputContainer}>
                        Weight
                    </Text>
                    <Text style={styles.twoInputContainer}>
                        {userNutritionInfo?.weight}
                    </Text>
                </View>
                <View style={styles.childContainer}>
                    <Text style={styles.twoInputContainer}>
                        Height
                    </Text>
                    <Text style={styles.twoInputContainer}>
                        {userNutritionInfo?.height}
                    </Text>
                </View>
                <View style={styles.childContainer}>
                    <Text style={styles.twoInputContainer}>
                        Shoulder
                    </Text>
                    <Text style={styles.twoInputContainer}>
                        {userNutritionInfo?.shoulder}
                    </Text>
                </View>
                <View style={styles.childContainer}>
                    <Text style={styles.twoInputContainer}>
                        Arm
                    </Text>
                    <Text style={styles.twoInputContainer}>
                        {userNutritionInfo?.arm}
                    </Text>
                </View>
                <View style={styles.childContainer}>
                    <Text style={styles.twoInputContainer}>
                        Forearm
                    </Text>
                    <Text style={styles.twoInputContainer}>
                        {userNutritionInfo?.forearm}
                    </Text>
                </View>
                <View style={styles.childContainer}>
                    <Text style={styles.twoInputContainer}>
                        Chest
                    </Text>
                    <Text style={styles.twoInputContainer}>
                        {userNutritionInfo?.chest}
                    </Text>
                </View>
                <View style={styles.childContainer}>
                    <Text style={styles.twoInputContainer}>
                        Bust
                    </Text>
                    <Text style={styles.twoInputContainer}>
                        {userNutritionInfo?.bust}
                    </Text>
                </View>
                <View style={styles.childContainer}>
                    <Text style={styles.twoInputContainer}>
                        Waist
                    </Text>
                    <Text style={styles.twoInputContainer}>
                        {userNutritionInfo?.waist}
                    </Text>
                </View>
                <View style={styles.childContainer}>
                    <Text style={styles.twoInputContainer}>
                        Hip
                    </Text>
                    <Text style={styles.twoInputContainer}>
                        {userNutritionInfo?.hip}
                    </Text>
                </View>
                <View style={styles.childContainer}>
                    <Text style={styles.twoInputContainer}>
                        Thigh
                    </Text>
                    <Text style={styles.twoInputContainer}>
                        {userNutritionInfo?.thigh}
                    </Text>
                </View>
                <View style={styles.childContainer}>
                    <Text style={styles.twoInputContainer}>
                        Calf
                    </Text>
                    <Text style={styles.twoInputContainer}>
                        {userNutritionInfo?.calf}
                    </Text>
                </View>
                <View style={styles.childContainer}>
                    <Text style={styles.twoInputContainer}>
                        Fat Percentage %
                    </Text>
                    <Text style={styles.twoInputContainer}>
                        {userNutritionInfo?.fatPercentage}
                    </Text>
                </View>
                <View style={styles.childContainer}>
                    <Text style={styles.twoInputContainer}>
                        Muscle Percentage %
                    </Text>
                    <Text style={styles.twoInputContainer}>
                        {userNutritionInfo?.musclePercentage}
                    </Text>
                </View>
                <FAB
                  style={styles.fab}
                  small={true}
                  icon="plus"
                  onPress={() => {
                      navigation.navigate('AddNutritionInfoScreen', {nutritionInfo: null});
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
                  navigation.navigate('AddNutritionInfoScreen', {nutritionInfo: null});
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
        margin: 16,
        fontSize: 20
    },
    dateText: {
        margin: 16,
        textAlign: 'right',
        fontSize: 20
    },
    sexText: {
        margin: 8,
    }
});
export default UserNutritionScreen;
