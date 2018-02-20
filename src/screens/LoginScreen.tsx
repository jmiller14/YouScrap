import * as React from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import * as Ionicons from 'react-native-vector-icons/Ionicons';
import { inject } from 'mobx-react/native';

import { AccountStore } from 'src/stores/AccountStore';
import { icons } from 'src/components/Icons';

const Icon = Ionicons.default;

type Props = {
  accountStore: AccountStore;
};

type State = {
  username: string;
  password: string;
};

@inject('accountStore')
export class LoginScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  loginPress = () => {
    this.props.accountStore.logIn(this.state.username, this.state.password);
  };

  usernameChanged = username => this.setState({ username });

  passwordChanged = password => this.setState({ password });

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View style={styles.inputIconContainer}>
            <Icon name={`${icons.prefix}-person`} style={styles.inputIcon} />
          </View>

          <TextInput
            value={this.state.username}
            onChangeText={this.usernameChanged}
            style={styles.inputField}
            placeholder="Username"
            underlineColorAndroid="transparent"
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputIconContainer}>
            <Icon name={`${icons.prefix}-lock`} style={styles.inputIcon} />
          </View>

          <TextInput
            value={this.state.password}
            onChangeText={this.passwordChanged}
            style={styles.inputField}
            placeholder="Password"
            underlineColorAndroid="transparent"
          />
        </View>

        <Button title="Log in" onPress={this.loginPress} />
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
