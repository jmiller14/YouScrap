import * as React from 'react';
import { StyleSheet, View, Image, TextInput, Button } from 'react-native';
import * as Ionicons from 'react-native-vector-icons/Ionicons';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { Action } from 'src/store/root';
import { icons } from 'src/components/Icons';
import { logIn } from 'src/store/account/actions';

const Icon = Ionicons.default;

type Props = {
  logIn: (username: string, password: string) => Action;
};

type State = {
  username: string;
  password: string;
};

class LoginScreenComponent extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  loginPress = () => {
    this.props.logIn(this.state.username, this.state.password);
  };

  usernameChanged = username => this.setState({ username });

  passwordChanged = password => this.setState({ password });

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.backgroundContainer}>
          <Image
            source={require('src/assets/images/login-background.jpg')}
            style={styles.background}
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputIconContainer}>
            <Icon name={`${icons.prefix}-person`} style={styles.inputIcon} />
          </View>

          <TextInput
            value={this.state.username}
            onChangeText={this.usernameChanged}
            style={styles.inputField}
            placeholder="Username"
            placeholderTextColor="rgba(255, 255, 255, .6)"
            autoCorrect={false}
            autoCapitalize="none"
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
            placeholderTextColor="rgba(255, 255, 255, .6)"
            secureTextEntry
            autoCorrect={false}
            autoCapitalize="none"
            underlineColorAndroid="transparent"
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Log in" onPress={this.loginPress} color="white" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#333',
  },

  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'stretch',
    justifyContent: 'center',
  },

  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.6,
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
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },

  inputIconContainer: {
    width: 38,
    height: 38,
    marginRight: 10,
    backgroundColor: 'rgba(255, 255, 255, .4)',
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
    color: 'white',
  },

  buttonContainer: {
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export const LoginScreen = connect(
  () => ({}),

  (dispatch: Dispatch<Action>) => ({
    logIn: (username: string, password: string) =>
      dispatch(logIn(username, password)),
  }),
)(LoginScreenComponent);
