import React from 'react';
import Form from '../../forms/Form';
import {View, Button, StyleSheet} from 'react-native';
import SignUpScreen from './SignupScreen';
import ScreenContainer from '@react-navigation/stack';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {TextInput} from "react-native-paper";
import Feather from "react-native-vector-icons/Feather";

const LoginScreen = ({navigation}) => {
    /*
    const handleResult = async (result) => {
        if (result.ok && result.data) {
            //await setToken(result.data.auth_token);
            await navigation.navigate('Home');
        } else if (result.status === 401) {
            throw new Error('Invalid login.');
        } else {
            throw new Error('Something went wrong.');
        }
    };*/
    return (
        <View style={styles.container}>
            <View style={styles.header}>

            </View>
            <View style={styles.footer}>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color='#fff' size={20}/>
                    <TextInput placeholder="Your Email" style={styles.textInput} autoCapitalize="none"/>
                    <Feather name="check-circle" color="#E57D14" size={3}/>
                </View>
                <Button title="Sign Up!" onPress={() => navigation.push('SignupScreen')}/>

            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E57D14'
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 2,
        backgroundColor: '#000',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        marginLeft: 5,
        paddingLeft: 10,
        color: '#fff'
    }
})
export default LoginScreen;
