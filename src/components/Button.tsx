import * as React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  Text,
} from 'react-native';

import { colors } from 'src/colors';

const Touchable =
  Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

type Props = {
  onPress: () => void;
  title: string;
  style?: any;
};

export class Button extends React.Component<Props> {
  render() {
    return (
      <Touchable onPress={this.props.onPress}>
        <View style={[styles.button, this.props.style]}>
          <Text style={styles.buttonText}>{this.props.title}</Text>
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },

  buttonText: {
    color: colors.white,
    fontFamily: 'OfficinaSanITCBoo',
    fontSize: 18,
  },
});
