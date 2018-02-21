import * as React from 'react';
import { inject, observer } from 'mobx-react/native';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import { Navigator } from 'react-native-navigation';
import * as Ionicons from 'react-native-vector-icons/Ionicons';

import { Book } from 'src/stores/models/Book';
import { BookStore } from 'src/stores/BookStore';
import { icons } from 'src/components/Icons';

const Icon = Ionicons.default;

type Props = {
  book: Book;
  navigator: Navigator;
  bookStore: BookStore;
};

type State = {
  width: number;
  height: number;
};

@inject('bookStore')
@observer
export class BookDetailsScreen extends React.Component<Props, State> {
  static navigatorButtons = { rightButtons: [] };

  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress' && event.id === 'add') {
      this.props.bookStore.addItemToBook(this.props.book);
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
        {this.props.book.items
          .values()
          .slice()
          .map((item, index) => (
            <View
              key={index}
              style={[
                styles.itemContainer,
                { width: width / itemsPerRow, height: width / itemsPerRow },
              ]}
            >
              <Image
                source={{ uri: item }}
                style={{
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
    return this.props.book.items.size === 0
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  itemContainer: {
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
