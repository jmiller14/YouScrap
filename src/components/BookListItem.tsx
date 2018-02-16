import * as React from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Book } from 'src/stores/models/Book';

type Props = {
  book: Book;
};

const Touchable =
  Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

export class BookListItem extends React.Component<Props> {
  onPress = () => {};

  render() {
    return (
      <Touchable onPress={this.onPress}>
        <View style={styles.container}>
          <Text style={styles.title}>{this.props.book.title}</Text>

          <Text style={styles.title}>
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
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 20,
    textAlign: 'center',
  },
});
