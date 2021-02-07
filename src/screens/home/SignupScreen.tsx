import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {Button, TextInput, Title} from 'react-native-paper';
import {SignupRequest} from '../../types/auth/SignupRequest';
import {postAuth} from '../../repository/auth/user';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading} from '../../redux/core';
import {IStore} from '../../redux';

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState<string>();
  const [name, setName] = useState<string>();
  const [surname, setSurname] = useState<string>();
  const [password, setPassword] = useState<string>();
  const dispatch = useDispatch();
  const loading = useSelector<IStore>((state) => state.core.loading);
  const onPressSignUpButton = () => {
    const authContext: SignupRequest = {
      email: email,
      name: name,
      surname: surname,
      password: password,
    };
    dispatch(setLoading(true));
    postAuth(authContext).then((response) => {
      dispatch(setLoading(false));
      navigation.goBack();
    });
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
