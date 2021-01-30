import AsyncStorage from '@react-native-async-storage/async-storage';


const storeAccessToken = async (value) => {
  try {
    await AsyncStorage.setItem('@accessToken', value)
  } catch (e) {
    // saving error
  }
}
const getAccessToken = async () => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    console.log(token)
    if (token !== null) {
      return token;
    }

  } catch (e) {
    // error reading value
  }

}
const removeAccessToken = async () => {
  try {
    await AsyncStorage.removeItem('@accessToken')
  } catch (e) {
    // remove error
  }

  console.log('Done.')
}


export {storeAccessToken, getAccessToken, removeAccessToken};