import React from 'react';
import Form from '../forms/Form';
import {View, Button} from 'react-native';
import SignUpScreen from './SignupScreen';
import ScreenContainer from '@react-navigation/stack';

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
        <View>
            <Form
                fields={{
                    email: {
                        label: 'Email',
                        inputProps: {
                            keyboardType: 'email-address',
                        },
                    },
                    password: {
                        label: 'Password',
                        inputProps: {
                            secureTextEntry: true,
                        },
                    },
                }}
            />
            <Button onPress={() => navigation.push('SignupScreen')}>
            </Button>
        </View>
    );
};

export default LoginScreen;
