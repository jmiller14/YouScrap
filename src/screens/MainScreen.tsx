import * as React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Navigator } from 'react-native-navigation';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { Action } from 'src/store/root';
import { State } from 'src/store/state';
import { logOut } from 'src/store/account/actions';
import { addBook } from 'src/store/books/actions';
import { Book } from 'src/store/books/Book';
import { BookListItem } from 'src/components/BookListItem';

type Props = {
  isLoading: boolean;
  books: Book[];
  navigator: Navigator;
  addBook: (title: string) => Action;
  logOut: () => Action;
};

class MainScreenComponent extends React.Component<Props> {
  private listInfo = { shouldAnimate: false };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'add') {
        this.listInfo.shouldAnimate = true;
        this.props.addBook('New book');
      }

      if (event.id === 'cancel') {
        this.props.logOut();
      }
    }
  }

  removeBook = () => {
    // this.props.bookStore.removeBook(book.id);
  };

  renderBookListItem = ({ item }) => {
    return (
      <BookListItem
        book={item}
        navigator={this.props.navigator}
        onRemove={this.removeBook}
        listInfo={this.listInfo}
      />
    );
  };

  bookListKeyExtractor = item => item.id;

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.books}
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
    alignItems: 'stretch',
    paddingBottom: 5,
  },
});

export const MainScreen = connect(
  (state: State) => ({
    isLoading: state.books.isLoading,
    books: state.books.collection,
  }),

  (dispatch: Dispatch<Action>) => ({
    addBook: (title: string) => dispatch(addBook(title)),
    logOut: () => dispatch(logOut()),
  }),
)(MainScreenComponent);
