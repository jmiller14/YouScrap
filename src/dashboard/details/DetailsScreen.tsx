import * as React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Navigator } from 'react-native-navigation';
import * as Ionicons from 'react-native-vector-icons/Ionicons';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { Action } from 'src/store/root';
import { State } from 'src/store/state';
import { Book } from 'src/store/books/Book';
import { addItemToBook } from 'src/store/books/actions';
import { icons } from 'src/components/Icons';
import { navigatorStyle } from 'src/styles/navigator';
import { Image } from 'src/components/Image';
import { Text } from 'src/components/Text';
import { colors } from 'src/vars';

const Icon = Ionicons.default;

type Props = {
  book: Book;
  navigator: Navigator;
  addItemToBook: (imageUri: string) => Action;
};

type ComponentState = {
  width: number;
  height: number;
};

class DetailsScreenComponent extends React.Component<
  Props,
  ComponentState
> {
  static navigatorButtons = { rightButtons: [] };
  static navigatorStyle = navigatorStyle;

  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress' && event.id === 'add') {
      this.props.addItemToBook(
        `https://picsum.photos/300/300/?random#${Math.random()}`,
      );
    }
  }

  orientationChangeHandler = dimensions => {
    const { width, height } = dimensions.window;
    this.setState({ width, height });
  };

  componentWillMount() {
    this.setState(Dimensions.get('window'));
    Dimensions.addEventListener('change', this.orientationChangeHandler);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.orientationChangeHandler);
  }

  renderZeroLayout = () => (
    <View style={styles.zeroContainer}>
      <Text style={styles.zeroText}>This book has no content yet!</Text>
    </View>
  );

  renderNormalLayout = () => {
    const { width, height } = this.state;
    const itemsPerRow = width >= height ? 4 : 2;

    return (
      <View style={styles.container}>
        {this.props.book.items.map((item, index) => (
          <View
            key={index}
            style={[
              styles.itemContainer,
              { width: width / itemsPerRow, height: width / itemsPerRow },
            ]}
          >
            <Image
              source={{ uri: item.imageUri }}
              blurRadius={10}
              style={{
                resizeMode: 'cover',
                width: width / itemsPerRow,
                height: width / itemsPerRow,
              }}
            />
          </View>
        ))}
      </View>
    );
  };

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
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.white,
  },

  zeroText: {},

  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: colors.white,
  },

  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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

export const DetailsScreen = connect(
  (state: State, ownProps: Props) => ({
    book: state.books.collection.find(book => book.id === ownProps.book.id),
  }),

  (dispatch: Dispatch<Action>, ownProps: Props) => ({
    addItemToBook: (imageUri: string) =>
      dispatch(addItemToBook(ownProps.book.id, imageUri)),
  }),
)(DetailsScreenComponent);
