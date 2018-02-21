import * as React from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';
import { Navigator } from 'react-native-navigation';

import { Book } from 'src/store/books/Book';
import { getPlatformAddButton } from 'src/utils/getPlatformAddButton';

type Props = {
  book: Book;
  navigator: Navigator;
  onRemove: Function;
  listInfo: { shouldAnimate: boolean };
};

const Touchable =
  Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

const ANIMATION_DURATION = 300;
const ROW_HEIGHT = 48;
const ROW_MARGIN = 2;

export class BookListItem extends React.Component<Props> {
  private animated: Animated.Value;
  private wrapperStyles = [];

  constructor(props) {
    super(props);
    this.animated = new Animated.Value(0);
    this.wrapperStyles = [
      styles.wrapper,
      {
        height: this.animated.interpolate({
          inputRange: [0, 1],
          outputRange: [0, ROW_HEIGHT + ROW_MARGIN],
          extrapolate: 'clamp',
        }),
      },
    ];
  }

  componentDidMount() {
    Animated.timing(this.animated, {
      toValue: 1,
      duration: ANIMATION_DURATION,
    }).start();
  }

  onPress = () => {
    /* this.props.listInfo.shouldAnimate = true;
    this.forceUpdate(); // force re-render so that initial remove animation occurs

    Animated.timing(this.animated, {
      toValue: 0,
      duration: ANIMATION_DURATION,
    }).start(() => {
      this.props.onRemove(this.props.book);
    }); */

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
        <Animated.View
          style={
            this.props.listInfo.shouldAnimate
              ? this.wrapperStyles
              : styles.wrapper
          }
        >
          <View style={styles.container}>
            <Text style={styles.title}>{this.props.book.title}</Text>

            <Text style={styles.detail}>
              ({this.props.book.items.length} items)
            </Text>
          </View>
        </Animated.View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    overflow: 'hidden',
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#eee',
    height: ROW_HEIGHT,
    marginBottom: ROW_MARGIN,
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
