import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {UserNutritionInfoNetwork} from "../../../repository/nutrition/nutrition";
import {UserNutritionInfo} from "../../../types/nutrition/UserNutritionInfo";
import {useDispatch, useSelector} from "react-redux";
import {IStore} from "../../../redux";
import {setLatestUserNutritionInfo, setUserNutritionInfoList} from "../../../redux/nutrition/nutrition";
import {JWTResponse} from "../../../types/auth/JWTResponse";

const UserNutritionScreen = () => {
    let userNutritionInfo: UserNutritionInfo[];
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
                dispatch(setLatestUserNutritionInfo(userInfo.slice(-1)[0]));
            });
    }, [])
    return (
        <View style={styles.container}>
            <View>
                <View>
                    <Text>{userInfo?.name + " " + userInfo?.surname}</Text>
                </View>
                <View>
                    <Text>{latestNutritionInfo?.sex}</Text>
                </View>
                <View>
                    <Text>{latestNutritionInfo?.createdAt}</Text>
                </View>
            </View>
            <View>
                <Text>{latestNutritionInfo?.weight}</Text>
            </View>
            <View>
                <Text>{latestNutritionInfo?.height}</Text>
            </View>
            <View>
                <Text>{latestNutritionInfo?.fatPercentage}</Text>
            </View>
            <View>
                <Text>{latestNutritionInfo?.musclePercentage}</Text>
            </View>
            <View style={styles.header}>
                <Text>Header</Text>
            </View>
            <View style={styles.footer}>
                <Text>Footer</Text>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E57D14',
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 2,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30,
    },
});
export default UserNutritionScreen;
