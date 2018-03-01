import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Navigator } from 'react-native-navigation';

import { Text } from 'src/components/Text';
import { colors } from 'src/vars';
import { Weights, Styles, font } from 'src/utils/font';

type Props = {
  navigator: Navigator;
};

const displayWeights = [
  'Thin',
  'ExtraLight',
  'Light',
  'Regular',
  'Medium',
  'SemiBold',
  'Bold',
  'ExtraBold',
  'Black',
];
const displayStyles = ['Regular', 'Italic'];

export class FontScreen extends React.Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        {displayWeights.map(weight =>
          displayStyles.map(style => (
            <View style={styles.fontContainer} key={weight + style}>
              <Text
                style={[
                  styles.fontText,
                  { ...font(Weights[weight], Styles[style]) },
                ]}
              >
                Lorem ipsum dolor sit amet
              </Text>
            </View>
          )),
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: colors.white,
  },

  fontContainer: {},

  fontText: {},
});
