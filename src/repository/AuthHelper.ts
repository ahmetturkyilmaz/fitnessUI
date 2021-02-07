import AsyncStorage from '@react-native-async-storage/async-storage';

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

export {storeAccessToken, getAccessToken, removeAccessToken};
