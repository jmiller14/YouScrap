import * as React from 'react';
import { inject, observer, Observer } from 'mobx-react/native';
import {
  StyleSheet,
  Platform,
  View,
  Text,
  Button,
  FlatList,
} from 'react-native';
import { Navigator } from 'react-native-navigation';
import * as Ionicons from 'react-native-vector-icons/Ionicons';

import { Book } from 'src/stores/models/Book';
import { icons } from 'src/components/Icons';

const Icon = Ionicons.default;

type Props = {
  book: Book;
  navigator: Navigator;
};

@inject('accountStore', 'bookStore')
@observer
export class BookDetailsScreen extends React.Component<Props> {
  static navigatorButtons = { rightButtons: [] };

  renderBookListItem = ({ item }) => {
    // return <Observer>{() => <BookListItem book={item} />}</Observer>;
  };

  bookListKeyExtractor = ({}, index) => String(index);

  renderZeroLayout = () => (
    <View style={styles.zeroContainer}>
      <Text style={styles.zeroText}>This book has no content yet!</Text>
    </View>
  );

  renderNormalLayout = () => (
    /*
        <FlatList
          data={this.props.bookStore.books.values().slice()}
          renderItem={this.renderBookListItem}
          keyExtractor={this.bookListKeyExtractor}
        />
*/

    <View style={styles.container}>
      <Text>Hello, world!</Text>
    </View>
  );

  renderAddButton = () => (
    <View style={styles.addButtonContainer}>
      <Icon.Button
        name={`${icons.prefix}-image`}
        style={styles.addButton}
        iconStyle={styles.addButtonIcon}
      />
    </View>
  );

  render() {
    return this.props.book.items.length === 0
      ? this.renderZeroLayout()
      : this.renderNormalLayout();
  }
}

const styles = StyleSheet.create({
  zeroContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
  },

  zeroText: {},

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

  addButtonContainer: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },

  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },

  addButtonIcon: {
    color: 'white',
    margin: 0,
    padding: 0,
  },
});
