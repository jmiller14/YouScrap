import * as React from 'react';
import {
  Animated,
  Image as RNImage,
  ImageProperties,
  ImageURISource,
} from 'react-native';

interface Props extends ImageProperties {
  duration?: number;
}

const DEFAULT_DURATION = 300;

export class Image extends React.Component<Props> {
  private opacity = new Animated.Value(0);

  constructor(props) {
    super(props);

    if (this.props.source && (this.props.source as ImageURISource).uri) {
      RNImage.prefetch((this.props.source as ImageURISource).uri);
    }
  }

  onLoad = () => {
    if (typeof this.props.onLoad === 'function') {
      this.props.onLoad();
    }

    Animated.timing(this.opacity, {
      toValue: 1,
      duration: this.props.duration || DEFAULT_DURATION,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const { style, duration, ...attributes } = this.props;

    return (
      <Animated.Image
        style={[style, { opacity: this.opacity }]}
        onLoad={this.onLoad}
        {...attributes}
      >
        {this.props.children}
      </Animated.Image>
    );
  }
}
