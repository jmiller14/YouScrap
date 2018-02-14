import * as React from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { inject } from 'mobx-react/native';

import { AccountStore } from 'src/stores/AccountStore';

const Icon = SimpleLineIcons;
type Props = {
  accountStore: AccountStore;
};

@inject('accountStore')
export class LoginScreen extends React.Component<Props> {
  loginPress = () => {
    this.props.accountStore.logIn('username', 'password');
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View style={styles.inputIconContainer}>
            <Icon name="user" style={styles.inputIcon} />
          </View>

          <TextInput
            style={styles.inputField}
            placeholder="Username"
            underlineColorAndroid="transparent"
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputIconContainer}>
            <Icon name="lock" style={styles.inputIcon} />
          </View>

          <TextInput
            style={styles.inputField}
            placeholder="Password"
            underlineColorAndroid="transparent"
          />
        </View>

        <Button title={'Log in'} onPress={this.loginPress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },

  inputContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
  },

  inputIconContainer: {
    width: 38,
    height: 38,
    marginRight: 10,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputIcon: {
    color: 'white',
    fontSize: 20,
  },

  inputField: {
    flex: 1,
    fontSize: 18,
    height: 38,
    margin: 0,
    padding: 0,
  },
});
