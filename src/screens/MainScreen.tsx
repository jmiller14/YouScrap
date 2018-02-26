import * as React from 'react';
import { StyleSheet, View, FlatList, Platform } from 'react-native';
import { Navigator } from 'react-native-navigation';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as Ionicons from 'react-native-vector-icons/Ionicons';
import reactNativeModal from 'react-native-modal';

import { Action } from 'src/store/root';
import { State } from 'src/store/state';
import { logOut } from 'src/store/account/actions';
import { addBook } from 'src/store/books/actions';
import { Book } from 'src/store/books/Book';
import { BookListItem } from 'src/components/BookListItem';
import { Text } from 'src/components/Text';
import { InputField } from 'src/components/InputField';
import { Button } from 'src/components/Button';
import { colors, HAIRLINE_WIDTH } from 'src/vars';
import { navigatorStyle } from 'src/styles/navigator';

const Icon = Ionicons.default;
const Modal = reactNativeModal;

type Props = {
  isLoading: boolean;
  books: Book[];
  navigator: Navigator;
  addBook: (title: string) => Action;
  logOut: () => Action;
};

type ComponentState = {
  isCreateBookModalVisible: boolean;
  createBookTitle: string;
};

const ANDROID_NAVBAR_HEIGHT = 56;

class MainScreenComponent extends React.Component<Props, ComponentState> {
  static navigatorStyle = navigatorStyle;

  private listInfo = { shouldAnimate: false };
  private showHeader = false;
  private modalInput: InputField;

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentWillMount() {
    this.showHeader = Platform.OS === 'android';
    this.setState({
      isCreateBookModalVisible: false,
      createBookTitle: '',
    });
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'add') {
        this.listInfo.shouldAnimate = true;
        this.setState({
          isCreateBookModalVisible: true,
          createBookTitle: '',
        });
        this.modalInput.focus();
      }

      if (event.id === 'cancel') {
        this.props.logOut();
      }
    }
  }

  createBookModalCancelPress = () => {
    this.setState({
      isCreateBookModalVisible: false,
      createBookTitle: '',
    });
  };

  createBookModalCreatePress = () => {
    if (this.state.createBookTitle.length) {
      this.props.addBook(this.state.createBookTitle);
      this.setState({
        isCreateBookModalVisible: false,
        createBookTitle: '',
      });
    }
  };

  createBookTitleChanged = createBookTitle =>
    this.setState({ ...this.state, createBookTitle });

  removeBook = () => {
    // this.props.bookStore.removeBook(book.id);
  };

  renderBookListItem = ({ item, index }) => {
    return (
      <BookListItem
        book={item}
        navigator={this.props.navigator}
        onRemove={this.removeBook}
        listInfo={this.listInfo}
        style={{ marginTop: index === 0 ? 10 : 0 }}
      />
    );
  };

  bookListKeyExtractor = item => item.id;

  render() {
    return (
      <View style={styles.container}>
        {this.showHeader && (
          <View style={styles.header}>
            <Icon name="ios-book" style={styles.headerIcon} />
          </View>
        )}

        <FlatList
          style={styles.list}
          data={this.props.books}
          renderItem={this.renderBookListItem}
          keyExtractor={this.bookListKeyExtractor}
        />

        <Modal isVisible={this.state.isCreateBookModalVisible} avoidKeyboard>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Name your new scrapbook.</Text>

            <InputField
              ref={ref => (this.modalInput = ref)}
              style={styles.modalInput}
              placeholder="Title"
              onSubmitEditing={this.createBookModalCreatePress}
              value={this.state.createBookTitle}
              onChangeText={this.createBookTitleChanged}
              returnKeyType="done"
              enablesReturnKeyAutomatically
            />

            <View style={styles.modalButtonContainer}>
              <Button
                style={styles.modalCancelButton}
                title="Cancel"
                onPress={this.createBookModalCancelPress}
              />

              <Button
                style={styles.modalCreateButton}
                title="Create"
                onPress={this.createBookModalCreatePress}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: colors.grayLight,
    ...Platform.select({
      android: {
        paddingTop: ANDROID_NAVBAR_HEIGHT,
      },
    }),
  },

  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: ANDROID_NAVBAR_HEIGHT,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerIcon: {
    color: colors.white,
    fontSize: 30,
  },

  list: {
    flex: 1,
  },

  modalContainer: {
    padding: 10,
    backgroundColor: colors.white,
  },

  modalText: {
    fontSize: 16,
    textAlign: 'center',
  },

  modalInput: {
    borderWidth: HAIRLINE_WIDTH,
    borderColor: colors.gray,
    marginTop: 10,
    marginBottom: 10,
  },

  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  modalCancelButton: {
    backgroundColor: colors.gray,
  },

  modalCreateButton: {
    marginLeft: 5,
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
