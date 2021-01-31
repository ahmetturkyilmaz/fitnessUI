import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {Button, TextInput, Title} from 'react-native-paper';
import {AuthContext} from '../../components/context';
import {SignupRequest} from '../../types/auth/SignupRequest';

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState<string>();
  const [name, setName] = useState<string>();
  const [surname, setSurname] = useState<string>();
  const [password, setPassword] = useState<string>();
  const {signUp} = React.useContext(AuthContext);

  const onPressSignUpButton = () => {
    const authConcept: SignupRequest = {
      email: email,
      name: name,
      surname: surname,
      password: password,
    };
    signUp(authConcept);
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Title>Sign Up</Title>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Name"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={setName}
        />

        <TextInput
          placeholder="Surname"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={setSurname}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={setPassword}
          style={styles.textInput}
        />

        <Button
          style={styles.button}
          mode="contained"
          onPress={() => onPressSignUpButton()}>
          SIGN UP
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.goBack()}
          style={{...styles.button, marginTop: 16}}>
          GO BACK
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {},

  content: {
    marginLeft: 16,
    marginRight: 16,
  },

  textInput: {
    marginTop: 16,
  },

  button: {
    marginTop: 24,
  },
});
export default SignUpScreen;
