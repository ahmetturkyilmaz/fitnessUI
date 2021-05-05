import AsyncStorage from '@react-native-async-storage/async-storage';
import {JWTResponse} from "../types/auth/JWTResponse";

const storeAccessToken = async (value: string) => {
    return AsyncStorage.setItem('@accessToken', value);
};
const getAccessToken = async () => {
    return AsyncStorage.getItem('@accessToken');
};
const removeAccessToken = async () => {
    try {
        await AsyncStorage.removeItem('@accessToken');
    } catch (e) {
        // remove error
    }
    console.log('Done.');
};
const storeUser = async (value: JWTResponse) => {
    return AsyncStorage.setItem('@userInfo', JSON.stringify(value));
}
const getUser = async (): Promise<JWTResponse> => {
    const value = await AsyncStorage.getItem('@userInfo')
    if (value !== null) {
        return JSON.parse(value) as JWTResponse;
    } else {
        throw new Error("Could not found user")
    }
}
const removeUser = async () => {
    try {
        await AsyncStorage.removeItem('@userInfo');
    } catch (e) {
        // remove error
    }
    console.log('Done.');
}
export {storeAccessToken, getAccessToken, removeAccessToken, storeUser, getUser, removeUser};
