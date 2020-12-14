import React from 'react';
import {View, Text, Button} from 'react-native';

const HomeScreen = ({navigation}) => {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>HomeScreen</Text>
            <Button title="Log in" onPress={() => navigation.navigate('LoginScreen')}/>
            <Button title="Sign up" onPress ={() => navigation.navigate('SignupScreen')}/>
        </View>
    );
};

export default HomeScreen;
