import React from 'react';
import {View, Button, StyleSheet, Text, TouchableOpacity} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

class InitializeButton extends React.Component {
    render() {
        const {name, onPress, style} = this.props;

        return (
          <View>
              <TouchableOpacity
                style={style || styles.smallButton}
                onPress={() => {
                    onPress();
                }}>
                  <LinearGradient
                    colors={['#E57D14', '#cd5900']}
                    style={style || styles.smallButton}>
                      <Text style={styles.textSign}>{name}</Text>
                  </LinearGradient>
              </TouchableOpacity>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    smallButton: {
        width: '50%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
});

export default InitializeButton;
