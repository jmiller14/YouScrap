import * as React from 'react';
import { inject, observer, Observer } from 'mobx-react/native';
import { StyleSheet, View, FlatList } from 'react-native';
import { Navigator } from 'react-native-navigation';

import { AccountStore } from 'src/stores/AccountStore';
import { BookStore } from 'src/stores/BookStore';
import { BookListItem } from 'src/components/BookListItem';

type Props = {
  accountStore: AccountStore;
  bookStore: BookStore;
  navigator: Navigator;
};

@inject('accountStore', 'bookStore')
@observer
export class MainScreen extends React.Component<Props> {
  static navigatorButtons = {
    leftButtons: [
      {
        title: 'Log out',
        id: 'logout',
      },
    ],

    rightButtons: [
      {
        title: 'Add',
        id: 'add',
      },
    ],
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'add') {
        this.props.bookStore.addBook('New book');
      }

      if (event.id === 'logout') {
        this.props.accountStore.logOut();
      }
    }
  }

  renderBookListItem = ({ item }) => {
    return <Observer>{() => <BookListItem book={item} />}</Observer>;
  };

  bookListKeyExtractor = ({}, index) => String(index);

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.bookStore.books.values().slice()}
          renderItem={this.renderBookListItem}
          keyExtractor={this.bookListKeyExtractor}
        />
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
