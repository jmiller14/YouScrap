import * as React from 'react';
import { Platform, StyleSheet, View, Animated } from 'react-native';
import { Navigator } from 'react-native-navigation';

import { colors, HAIRLINE_WIDTH } from 'src/vars';
import { Text } from 'src/components/Text';
import { Button } from 'src/components/Button';
import { Book } from 'src/store/books/Book';
import { getPlatformAddButton } from 'src/utils/getPlatformAddButton';

type Props = {
  book: Book;
  navigator: Navigator;
  onRemove: Function;
  listInfo: { shouldAnimate: boolean };
  style: any;
};

const ANIMATION_DURATION = 300;
const ITEM_PADDING = 10;

export class BookListItem extends React.Component<Props> {
  private animated: Animated.Value;
  private wrapperStyles = [];

  constructor(props) {
    super(props);
    this.animated = new Animated.Value(0);
    this.wrapperStyles = [
      styles.wrapper,
      {
        transform: [
          {
            scale: this.animated.interpolate({
              inputRange: [0, 1],
              outputRange: [1.333, 1],
              extrapolate: 'clamp',
            }),
          },
        ],
        opacity: this.animated,
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
      animationType: 'slide-horizontal',
    });
  };

  render() {
    return (
      <Animated.View
        style={[
          this.props.listInfo.shouldAnimate
            ? this.wrapperStyles
            : styles.wrapper,
          this.props.style,
        ]}
      >
        <View style={styles.container}>
          <Text style={styles.title}>{this.props.book.title}</Text>

          <Text style={styles.detail}>
            ({this.props.book.items.length} items)
          </Text>

          <View style={styles.buttonContainer}>
            <Button title="Edit" onPress={this.onPress} />
          </View>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },

  container: {
    alignItems: 'flex-start',
    backgroundColor: colors.white,
    padding: 10,
    ...Platform.select({
      android: {
        elevation: 10,
      },
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        shadowOpacity: 0.2,
      },
    }),
  },

  title: {
    fontSize: 20,
  },

  detail: {
    fontSize: 14,
    marginBottom: 10,
  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});
