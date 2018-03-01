import * as React from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { Action } from 'src/store/root';
import { LoginField } from 'src/components/LoginField';
import { Button } from 'src/components/Button';
import { Image } from 'src/components/Image';
import { icons } from 'src/components/Icons';
import { logIn } from 'src/store/account/actions';
import { colors } from 'src/vars';

type Props = {
  logIn: (username: string, password: string) => Action;
};

type State = {
  username: string;
  password: string;
};

class LoginScreenComponent extends React.Component<Props, State> {
  static navigatorStyle = {
    navBarHidden: true,
  };

  private usernameInput: LoginField;
  private passwordInput: LoginField;

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

  usernameReturnPress = () => {
    this.passwordInput.focus();
  };

  passwordChanged = password => this.setState({ password });

  passwordReturnPress = () => {
    this.loginPress();
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.backgroundContainer}>
          <Image
            source={require('src/assets/images/login-background.jpg')}
            style={styles.background}
          />
        </View>

        <LoginField
          ref={ref => (this.usernameInput = ref)}
          onSubmitEditing={this.usernameReturnPress}
          value={this.state.username}
          onChangeText={this.usernameChanged}
          placeholder="Username"
          iconName={`${icons.prefix}-person`}
          returnKeyType="next"
          enablesReturnKeyAutomatically
        />

        <LoginField
          ref={ref => (this.passwordInput = ref)}
          onSubmitEditing={this.passwordReturnPress}
          value={this.state.password}
          onChangeText={this.passwordChanged}
          placeholder="Password"
          iconName={`${icons.prefix}-lock`}
          secureTextEntry
          returnKeyType="go"
          enablesReturnKeyAutomatically
        />

        <View style={styles.buttonContainer}>
          <Button onPress={this.loginPress} title="Log in" />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: colors.grayDarker,
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

  buttonContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'flex-end',
  },
});

export const LoginScreen = connect(
  () => ({}),

  (dispatch: Dispatch<Action>) => ({
    logIn: (username: string, password: string) =>
      dispatch(logIn(username, password)),
  }),
)(LoginScreenComponent);
