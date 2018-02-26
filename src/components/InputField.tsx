import * as React from 'react';
import { StyleSheet, View, TextInput, TextInputProperties } from 'react-native';

import { colors } from 'src/vars';

interface Props extends TextInputProperties {}

export class InputField extends React.Component<Props> {
  private input: TextInput;

  focus = () => {
    this.input.focus();
  };

  blur = () => {
    this.input.blur();
  };

  render() {
    const { style, ...attributes } = this.props;

    return (
      <View style={[styles.container, style]}>
        <TextInput
          ref={ref => (this.input = ref as any)}
          style={styles.input}
          placeholderTextColor={colors.gray}
          underlineColorAndroid="transparent"
          {...attributes}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 18,
    height: 40,
    margin: 0,
    padding: 0,
    color: colors.grayDark,
    fontFamily: 'OfficinaSanITCBoo',
  },
});
