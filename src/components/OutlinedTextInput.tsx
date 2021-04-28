import {TextInput} from 'react-native-paper';

export const OutlinedTextInput = ({...props}) => {
    return (
      <TextInput
      mode={'outlined'}
      {...props}>
      </TextInput>
    )
}