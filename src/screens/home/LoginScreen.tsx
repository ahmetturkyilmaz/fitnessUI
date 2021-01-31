import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {AuthContext} from '../../components/context';
import logo from '../../assets/images/logo.png';
import {IAuthContext} from '../../types/auth/IAuthContext';
import {LoginRequest} from '../../types/auth/LoginRequest';

const LoginScreen = ({navigation}: {navigation: any}) => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const {signIn} = React.useContext<IAuthContext>(AuthContext);
  const onPressLoginButton = () => {
    const authConcept: LoginRequest = {email: email, password: password};
    signIn(authConcept);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={logo} resizeMode="cover" />
      </View>
      <View style={styles.content}>
        <TextInput
          label="Email"
          autoCapitalize="none"
          onChangeText={setEmail}
        />

        <TextInput
          label="Password"
          onChangeText={setPassword}
          secureTextEntry
          style={{marginTop: 16}}
        />

        <Button
          mode="contained"
          onPress={() => onPressLoginButton()}
          style={{marginTop: 24}}>
          SIGN IN
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.push('SignupScreen')}
          style={{marginTop: 16}}>
          SIGN UP
        </Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {},
  header: {},
  logo: {
    width: '100%',
    height: 320,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: '#fff',
    height: '100%',
  },

  // logo: {
  //   width: '100%',
  //   height: '100%',
  // },
  // textInput: {
  //   height: 35,
  //   width: '100%',
  //   margin: 15,
  //   borderWidth: 1,
  //   backgroundColor: 'white',
  //   borderColor: 'white',
  // },
  // button: {
  //   width: '100%',
  //   height: 50,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderRadius: 10,
  //   marginTop: 20,
  // },
  // inputContainer: {
  //   height: 40,
  //   borderWidth: 1,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   backgroundColor: 'white',
  //   marginHorizontal: 5,
  //   borderRadius: 5,
  // },
  // prefix: {
  //   paddingHorizontal: 10,
  //   fontWeight: 'bold',
  //   color: 'black',
  // },
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fa9449',
  // },
  // header: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // footer: {
  //   flex: 2,
  //   backgroundColor: '#fff',
  //   borderTopLeftRadius: 12,
  //   borderTopRightRadius: 12,
  //   paddingHorizontal: 24,
  //   paddingTop: 24,
  //   // padding: '24px 12px 0px 12px',
  //   // paddingVertical: 10,
  //   // paddingHorizontal: 30,
  // },
  // text_header: {
  //   color: '#fff',
  //   fontWeight: 'bold',
  //   paddingHorizontal: 10,
  //   marginTop: 20,
  // },
  // text_footer: {
  //   color: '#fff',
  //   fontWeight: 'bold',
  //   fontSize: 30,
  // },
  // signIn: {
  //   width: '50%',
  //   height: 50,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderRadius: 10,
  // },
  // textSign: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   color: '#fff',
  // }
});
export default LoginScreen;
