import * as React from 'react';
import { inject } from 'mobx-react/native';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Navigator } from 'react-native-navigation';

import { AccountStore } from 'src/stores/AccountStore';
import { BadgeStore } from 'src/stores/BadgeStore';
import { BookStore } from 'src/stores/BookStore';

type Props = {
  accountStore: AccountStore;
  badgeStore: BadgeStore;
  bookStore: BookStore;
  navigator: Navigator;
};

@inject('accountStore', 'badgeStore', 'bookStore')
export class MainScreen extends React.Component<Props> {
  logoutPress = () => {
    this.props.accountStore.logOut();
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Hello</Text>

        <Button title={'Log out'} onPress={this.logoutPress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
