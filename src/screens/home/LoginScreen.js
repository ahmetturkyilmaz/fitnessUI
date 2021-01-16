import React from 'react';
import {View, StyleSheet, Text, Image, ScrollView} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TextInput} from 'react-native-paper';
import {AuthContext} from '../../components/context';
import InitializeButton from '../../components/InitializeButton';
import logo from '../../assets/images/logo2.jpeg';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const {signIn} = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={logo} resizeMode="contain" />
      </View>
      <View style={styles.footer}>
        <Text style={styles.text_header}>Email</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.prefix}>
            <FontAwesome name="user-o" color="#000" size={20} />
          </Text>
          <TextInput
            placeholder="Enter your e-mail here.."
            onChangeText={setEmail}
            style={styles.textInput}
            autoCapitalize="none"
          />
        </View>

        <Text style={styles.text_header}>Password</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.prefix}>
            <FontAwesome name="lock" color="#000" size={20} />
          </Text>
          <TextInput
            placeholder="Enter your password here.."
            secureTextEntry={true}
            style={styles.textInput}
            onChangeText={setPassword}
            autoCapitalize="none"
          />
        </View>
        <InitializeButton
          name="Sign In!"
          onPress={() => signIn({email, password})}
          style={styles.button}
        />
        <InitializeButton
          name="Sign Up!"
          style={styles.button}
          onPress={() => navigation.push('SignupScreen')}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  textInput: {
    height: 35,
    width: "100%",
    margin: 15,
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: "white"

  },
  button: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  inputContainer: {
    height: 40,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 5,
    borderRadius: 5,

  },
  prefix: {
    paddingHorizontal: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: '#fa9449',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 2,
    backgroundColor: '#000',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  text_footer: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  signIn: {
    width: '50%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
});
export default LoginScreen;
