import * as React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import * as Ionicons from 'react-native-vector-icons/Ionicons';

import { colors } from 'src/colors';

const Icon = Ionicons.default;

type Props = {
  value: string;
  onChangeText: (string) => void;
  placeholder: string;
  iconName: string;
  isPassword?: boolean;
};

export class LoginField extends React.Component<Props> {
  render() {
    const {
      value,
      onChangeText,
      placeholder,
      iconName,
      isPassword,
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Icon name={iconName} style={styles.icon} />
        </View>

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={isPassword}
          style={styles.input}
          placeholderTextColor={colors.gray}
          autoCorrect={false}
          autoCapitalize="none"
          underlineColorAndroid="transparent"
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
    fontFamily: 'OfficinaSanITCBoo',
  },
});
