import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Book } from 'src/stores/models/Book';

type Props = {
  book: Book;
};

export class BookListItem extends React.Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.book.title}</Text>
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

  title: {
    fontSize: 20,
    textAlign: 'center',
  },
});
