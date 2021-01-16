import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TextInput} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import InitializeButton from "../../components/InitializeButton";
import {AuthContext} from "../../components/context";

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [password, setPassword] = useState();
  const {signUp} = React.useContext(AuthContext);

  const onPressSignUpButton = () => {
    signUp({email, name, surname, password}).then(response => {
        navigation.goBack();
      }
    )
  }
  return (
    <View style={styles.container}>
      <ScrollView style={styles.footer}>
        <Text style={styles.text_header}>E-Mail</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.prefix}>
            <FontAwesome name="user-o" color="#000" size={20}/>
          </Text>
          <TextInput
            placeholder="Enter your e-mail here.."
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={setEmail}
          />
        </View>
        <Text style={styles.text_header}>Name</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.prefix}>
            <FontAwesome name="user-o" color="#000" size={20}/>
          </Text>
          <TextInput
            placeholder="Enter your Name here.."
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={setName}
          />
        </View>
        <Text style={styles.text_header}>Surname</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.prefix}>
            <FontAwesome name="user-o" color="#000" size={20}/>
          </Text>
          <TextInput
            placeholder="Enter your Surname here.."
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={setSurname}
          />
        </View>
        <Text style={styles.text_header}>Password</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.prefix}>
            <FontAwesome name="lock" color="#000" size={20}/>
          </Text>
          <TextInput
            placeholder="Enter your password here.."
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={setPassword}
            style={styles.textInput}/>
        </View>
        <InitializeButton
          name="Sign Up!"
          style={styles.button}
          onPress={() => onPressSignUpButton()}
        />
      </ScrollView>
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
    width: "13%",
    paddingHorizontal: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: '#E57D14',
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
    paddingVertical: 50,
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
    width: '100%',
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
export default SignUpScreen;
