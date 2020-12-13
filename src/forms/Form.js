import React, { useState } from 'react';
import { Text, TextInput, View,Button } from 'react-native';
import { validateContent, validateLength } from './Validation';

const getInitialState = (fieldKeys) => {
    const state = {};
    fieldKeys.forEach((key) => {
        state[key] = '';
    });

    return state;
};

const Form = ({ fields , buttonText, action }) => {
    const fieldKeys = Object.keys(fields);
    const [values, setValues] = useState(getInitialState(fieldKeys));

    const onChangeValue = (key, value) => {
        const newState = { ...values, [key]: value };
        setValues(newState);
    };
    const getValues = () => {
        return fieldKeys.sort().map((key) => values[key]);
    };

    const submit = async () => {
        const values = getValues();
        const result = await action(...values);
        console.log(result);
    };


    return (
        <Form
          //  action={login}
          //  afterSubmit={handleResult}
            buttonText="Submit"
            fields={{
                email: {
                    label: 'Email',
                    validators: [validateContent],
                    inputProps: {
                        keyboardType: 'email-address',
                    },
                },
                password: {
                    label: 'Password',
                    validators: [validateContent, validateLength],
                    inputProps: {
                        secureTextEntry: true,
                    },
                },
            }}
        />
    );
};

export default Form;
