import React from 'react';
import Form from '../../forms/Form';
import { View, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import SignUpScreen from './SignupScreen';
import ScreenContainer from '@react-navigation/stack';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ActivityIndicator, TextInput } from "react-native-paper";
import Feather from "react-native-vector-icons/Feather";
import LinearGradient from "react-native-linear-gradient";
import { AuthContext } from "../../components/context";

const LoginScreen = ({ navigation }) => {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const { signIn } = React.useContext(AuthContext);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
            </View>
            <View style={styles.footer}>
                <Text sFtyle={styles.text_header}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color='#fff' size={20} />
                    <TextInput placeholder="Your Email"
                        style={styles.textInput}
                        onChangeText={setUsername}
                        autoCapitalize="none" />

                </View>
                <Text style={[styles.text_footer, { marginTop: 35 }]}>
                    Password
                </Text>
                <View style={styles.action}>
                    <FontAwesome name="lock" color='#fff' size={20} />
                    <TextInput placeholder="Your Password"
                        secureTextEntry={true}
                        style={styles.textInput}
                        onChangeText={setPassword}
                        autoCapitalize="none" />
                    <Feather name="eye-off" color="#E57D14" size={3} />
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => {
                            signIn({ username, password })
                        }}>
                        <LinearGradient
                            colors={['#E57D14', '#cd5900']}
                            style={styles.signIn}>
                            <Text
                                style={styles.textSign}>
                                Sign In
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <Button title="Sign Up!" onPress={() => navigation.push('SignupScreen')} />
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
        // marginTop: Platform.OS === 'ios' ? 0 : -12,
        marginLeft: 5,
        paddingLeft: 10,
        color: '#fff'
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    signIn: {
        width: '50%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    },
    indicatorStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default LoginScreen;
