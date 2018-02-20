import * as React from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Navigator } from 'react-native-navigation';

import { Book } from 'src/stores/models/Book';
import { getPlatformAddButton } from 'src/utils/getPlatformAddButton';

type Props = {
  book: Book;
  navigator: Navigator;
};

const Touchable =
  Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

export class BookListItem extends React.Component<Props> {
  onPress = () => {
    this.props.navigator.push({
      screen: 'youscrap.BookDetailsScreen',
      title: 'Details',
      passProps: { book: this.props.book },
      navigatorButtons: getPlatformAddButton(),
    });
  };

  render() {
    return (
      <Touchable onPress={this.onPress}>
        <View style={styles.container}>
          <Text style={styles.title}>{this.props.book.title}</Text>

          <Text style={styles.detail}>
            ({this.props.book.items.length} items)
          </Text>
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#eee',
    height: 50,
    marginBottom: 5,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
  },

  title: {
    fontSize: 20,
    textAlign: 'left',
  },

  detail: {
    fontSize: 20,
    textAlign: 'right',
  },
});
