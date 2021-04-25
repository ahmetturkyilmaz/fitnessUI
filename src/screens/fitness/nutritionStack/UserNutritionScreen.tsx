import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {UserNutritionInfoNetwork} from "../../../repository/nutrition/nutrition";
import {UserNutritionInfo} from "../../../types/nutrition/UserNutritionInfo";
import {useDispatch, useSelector} from "react-redux";
import {IStore} from "../../../redux";
import {setLatestUserNutritionInfo, setUserNutritionInfoList} from "../../../redux/nutrition/nutrition";
import {JWTResponse} from "../../../types/auth/JWTResponse";
import {FAB} from "react-native-paper";
import {findUserInfoFromLatestDate} from "./nutritionStackUtil";

const UserNutritionScreen = ({navigation}: { navigation: any }) => {
    const [userNutritionInfo, setUserNutritionInfo] = useState<UserNutritionInfo>();
    const dispatch = useDispatch();
    const userNutritionInfoList = useSelector<IStore, UserNutritionInfo[]>(
      (state) => state.nutrition.userNutritionInfoList,
    );
    const userInfo = useSelector<IStore, JWTResponse | undefined>(state => state.user.jwtResponse)
    const latestNutritionInfo = useSelector<IStore, UserNutritionInfo | undefined>(
      (state) => state.nutrition.latestNutritionInfo
    )
    useEffect(() => {
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
        <View>
            <View>
                <View>
                    <Text>{userInfo?.name + " " + userInfo?.surname}</Text>
                </View>
                <View>
                    <Text>{userNutritionInfo?.sex}</Text>
                </View>
                <View>
                    <Text>{userNutritionInfo?.createdAt}</Text>
                </View>
            </View>
            <View>
                <Text>{userNutritionInfo?.weight}</Text>
            </View>
            <View>
                <Text>{userNutritionInfo?.height}</Text>
            </View>
            <View>
                <Text>{userNutritionInfo?.fatPercentage}</Text>
            </View>
            <View>
                <Text>{userNutritionInfo?.musclePercentage}</Text>
            </View>
        </View>
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
        backgroundColor: '#E57D14',
        flexDirection: "column"
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
});
export default UserNutritionScreen;
