import * as React from 'react';
import { StyleSheet, Text as RNText, TextProperties } from 'react-native';

import { colors } from 'src/vars';
import { font } from 'src/utils/font';

interface Props extends TextProperties {}

export class Text extends React.Component<Props> {
  render() {
    const { style, ...attributes } = this.props;

    return (
      <RNText style={[styles.text, style]} {...attributes}>
        {this.props.children}
      </RNText>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: colors.grayDark,
    ...font(),
  },
});
