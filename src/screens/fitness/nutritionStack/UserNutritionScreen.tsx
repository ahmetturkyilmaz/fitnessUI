import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {UserNutritionInfoNetwork} from "../../../repository/nutrition/nutrition";
import {UserNutritionInfo} from "../../../types/nutrition/UserNutritionInfo";

const UserNutritionScreen = () => {
    let userNutritionInfo: UserNutritionInfo[]
    useEffect(() => {
        UserNutritionInfoNetwork.getAll()
          .then(userInfo => userNutritionInfo = userInfo)
    }, [])
    return (
      <View style={styles.container}>
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
