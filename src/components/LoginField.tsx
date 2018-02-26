import * as React from 'react';
import { StyleSheet, View, TextInput, TextInputProperties } from 'react-native';
import * as Ionicons from 'react-native-vector-icons/Ionicons';

import { colors } from 'src/vars';
import { font } from 'src/utils/font';

const Icon = Ionicons.default;

interface Props extends TextInputProperties {
  iconName: string;
}

export class LoginField extends React.Component<Props> {
  private input: TextInput;

  focus = () => {
    this.input.focus();
  };

  blur = () => {
    this.input.blur();
  };

  render() {
    const { iconName, ...attributes } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Icon name={iconName} style={styles.icon} />
        </View>

        <TextInput
          ref={ref => (this.input = ref as any)}
          style={styles.input}
          placeholderTextColor={colors.gray}
          autoCorrect={false}
          autoCapitalize="none"
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: colors.white,
  },

  iconContainer: {
    width: 40,
    height: 40,
    marginRight: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    color: colors.white,
    fontSize: 30,
  },

  input: {
    flex: 1,
    fontSize: 18,
    height: 38,
    margin: 0,
    padding: 0,
    color: colors.grayDark,
    ...font(),
  },
});
