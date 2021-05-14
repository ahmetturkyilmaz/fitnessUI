import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Dialog, Paragraph, Portal, TextInput, Title} from 'react-native-paper';
import {SignupRequest} from '../../types/auth/SignupRequest';
import {postAuth} from '../../repository/auth/user';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading} from '../../redux/core/core';
import {IStore} from '../../redux';
import {Gender} from "../../types/enum/Gender";
import {Unit} from "../../types/enum/Unit";
import DropDownPicker from 'react-native-dropdown-picker';
import {ValidationUtil} from "../../util/ValidationUtil";


const SignUpScreen = ({route, navigation}: { route: any; navigation: any }) => {
    const [email, setEmail] = useState<string>();
    const [name, setName] = useState<string>();
    const [surname, setSurname] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [gender, setGender] = React.useState<Gender>();
    const [unit, setUnit] = React.useState<Unit>()
    const [openGenderDropdown, setOpenGenderDropdown] = useState(false);
    const [openUnitDropdown, setOpenUnitDropdown] = useState(false);
    const [errStr, setErrStr] = useState('Unit');

    const [visible, setVisible] = React.useState(false);

    const dispatch = useDispatch();
    const loading = useSelector<IStore>((state) => state.core.loading);
    const onPressSignUpButton = () => {
        const authContext: SignupRequest = {
            email: email,
            name: name,
            surname: surname,
            password: password,
            gender: gender,
            unit: unit
        };
        console.log(authContext)
        let errStr = ValidationUtil.validateFields(authContext);
        if (errStr) {
            setErrStr(errStr)
            showDialog()
            return;
        }
        dispatch(setLoading(true));
        postAuth(authContext).then((response) => {
            dispatch(setLoading(false));
            navigation.goBack();
        });
    };

    function onOpenGenderDropdown() {
        setOpenUnitDropdown(false);
    }

    function onOpenUnitDropDown() {
        setOpenGenderDropdown(false)
    }

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    return (
      <SafeAreaView style={styles.container}>
          <ScrollView style={styles.content}>
              <Portal>
                  <Dialog visible={visible} onDismiss={hideDialog}>
                      <Dialog.Title>Alert</Dialog.Title>
                      <Dialog.Content>
                          <Paragraph>{errStr}</Paragraph>
                      </Dialog.Content>
                      <Dialog.Actions>
                          <Button onPress={hideDialog}>Done</Button>
                      </Dialog.Actions>
                  </Dialog>
              </Portal>
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
              <View style={styles.childContainer}>
                  <DropDownPicker
                    items={[
                        {label: 'MALE', value: Gender.MALE},
                        {label: 'FEMALE', value: Gender.FEMALE}
                    ]}
                    open={openGenderDropdown}
                    setOpen={setOpenGenderDropdown}
                    mode="SIMPLE"

                    searchable={false}
                    placeholder={"Gender"}
                    placeholderStyle={{
                        color: "grey",
                    }}
                    onOpen={onOpenGenderDropdown}
                    closeAfterSelecting={true}
                    value={gender}
                    setValue={setGender}
                    dropDownDirection={"TOP"}

                    dropDownContainerStyle={{
                        backgroundColor: "#dfdfdf"
                    }}
                    modalProps={{
                        animationType: "fade"
                    }}
                    style={styles.dropDownStyle}
                  />
                  <DropDownPicker
                    items={[
                        {label: 'METRIC (gram,meter)', value: Unit.METRIC},
                        {label: 'IMPERIAL (pound,inch)', value: Unit.IMPERIAL}
                    ]}
                    open={openUnitDropdown}
                    setOpen={setOpenUnitDropdown}
                    closeAfterSelecting={true}
                    searchable={false}
                    placeholder={"Unit"}
                    mode="SIMPLE"
                    dropDownDirection={"AUTO"}

                    placeholderStyle={{
                        color: "grey",
                        fontWeight: "bold"
                    }}
                    value={unit}
                    setValue={setUnit}
                    onOpen={onOpenUnitDropDown}
                    dropDownContainerStyle={{
                        backgroundColor: "#dfdfdf"
                    }}
                    modalProps={{
                        animationType: "fade"
                    }}
                    style={styles.dropDownStyle}
                  />
              </View>

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
    container: {
        flex: 1
    },

    content: {
        marginLeft: 16,
        marginRight: 16,
    },

    textInput: {
        marginTop: 8,
    },

    button: {
        marginTop: 24,
    },
    dropDownStyle: {
        flex: 2,
        marginTop: 8,
        backgroundColor: '#fafafa'
    },
    fieldText: {
        color: '#000',
        fontSize: 12,
        marginTop: 8,
        marginLeft: 8,
        marginRight: 8,
        textAlign: "center"
    },
    childContainer: {
        flex: 1,
        flexDirection: "column"
    }
});
export default SignUpScreen;
