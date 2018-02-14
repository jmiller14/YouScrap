import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { inject } from 'mobx-react/native';

import { AccountStore } from 'src/stores/AccountStore';

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
        <Text style={styles.welcome}>Beep boop</Text>

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
});
