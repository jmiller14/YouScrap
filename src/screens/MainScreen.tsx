import * as React from 'react';
import { inject, observer, Observer } from 'mobx-react/native';
import { StyleSheet, View, FlatList, Button } from 'react-native';

import { AccountStore } from 'src/stores/AccountStore';
import { BookStore } from 'src/stores/BookStore';
import { BookListItem } from 'src/components/BookListItem';

type Props = {
  accountStore: AccountStore;
  bookStore: BookStore;
};

@inject('accountStore', 'bookStore')
@observer
export class MainScreen extends React.Component<Props> {
  logoutPress = () => {
    this.props.accountStore.logOut();
  };

  renderBookListItem = book => <BookListItem book={book} />;

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.bookStore.books}
          renderItem={this.renderBookListItem}
        />

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
