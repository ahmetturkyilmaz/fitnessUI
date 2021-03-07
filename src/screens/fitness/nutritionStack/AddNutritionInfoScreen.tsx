import React from 'react';
import {View} from "react-native";
import {Checkbox} from 'react-native-paper';
import DatePicker from 'antd-mobile/lib/date-picker';
import 'antd-mobile/lib/date-picker/style/css';
const AddNutritionInfoScreen = () => {
    const [checked, setChecked] = React.useState(false);

    return (
        <View>
            <Checkbox status={checked ? 'checked' : 'unchecked'}
                      onPress={() => {
                          setChecked(!checked);
                      }}
            />

        </View>
    )
}

export default AddNutritionInfoScreen;
