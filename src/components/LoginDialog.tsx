import React from 'react';
import {Button, View} from 'react-native';
import {TextInput, Portal, Dialog, Paragraph, Title} from 'react-native-paper';

export const LoginDialog = (props) => {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  return (
    <View>
      {showDialog()}
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{props.errorMessageFirst}</Paragraph>
            <Paragraph>{props.errorMessageSecond}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog} title={'done'}>
              Done
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};
