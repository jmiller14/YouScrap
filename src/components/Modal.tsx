import * as React from 'react';
import {
  Platform,
  Dimensions,
  Animated,
  Easing,
  Modal as RNModal,
  ViewStyle,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import { BlurView } from 'react-native-blur';
import { captureScreen, releaseCapture } from 'react-native-view-shot';

import { colors } from 'src/vars';

export interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onBackPress?: () => void;
  duration?: number;
  style?: ViewStyle;
}

interface ModalState {
  isVisible: boolean;
  viewRef: number;
  screenshotUri: string;
}

const DEFAULT_DURATION = 600;
const { height } = Dimensions.get('screen');

export class Modal extends React.Component<ModalProps, ModalState> {
  private backdropOpacity = new Animated.Value(0);
  private imageOpacity = new Animated.Value(0);
  private containerPosition = new Animated.Value(0);

  state = {
    isVisible: false,
    viewRef: null,
    screenshotUri: null,
  };

  private getAnimationConfig = (toValue, useNativeDriver = true) => ({
    toValue,
    useNativeDriver,
    duration: this.props.duration || DEFAULT_DURATION,
  });

  componentWillReceiveProps(nextProps: ModalProps) {
    if (!this.state.isVisible && nextProps.isOpen) {
      this.setState({ isVisible: true });
      this.show();
    }

    if (this.state.isVisible && !nextProps.isOpen) {
      this.hide();
    }
  }

  componentWillMount() {
    if (this.props.isOpen && !this.state.isVisible) {
      this.setState({ isVisible: true });
    }
  }

  componentDidMount() {
    if (this.state.isVisible) {
      this.show();
    }
  }

  private show = () => {
    if (Platform.OS === 'android') {
      captureScreen({
        format: 'png',
        quality: 1,
      }).then(screenshotUri => {
        this.setState({ screenshotUri });
      });
    }

    Animated.parallel([
      Animated.timing(this.backdropOpacity, this.getAnimationConfig(1)),
      Animated.timing(
        this.containerPosition,
        this.getAnimationConfig(1, false),
      ),
    ]).start();
  };

  private onImageLoad = () => {
    Animated.timing(this.imageOpacity, this.getAnimationConfig(1)).start();
  };

  private hide = () => {
    Animated.parallel([
      Animated.timing(this.backdropOpacity, this.getAnimationConfig(0)),
      Animated.timing(this.imageOpacity, this.getAnimationConfig(0)),
      Animated.timing(
        this.containerPosition,
        this.getAnimationConfig(0, false),
      ),
    ]).start(() => {
      if (Platform.OS === 'android') {
        const uri = this.state.screenshotUri;

        this.setState({ screenshotUri: null });
        uri && releaseCapture(uri);
      }

      if (this.props.onClose) {
        this.props.onClose();
      }

      this.setState({ isVisible: false });
    });
  };

  render() {
    const {
      isOpen,
      onClose,
      onBackPress,
      duration,
      style,
      ...attributes,
    } = this.props;

    const containerAnimationStyle = {
      transform: [
        {
          translateY: this.containerPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [height, 0],
            extrapolate: 'clamp',
            easing: Easing.elastic(0.667),
          }),
        },
      ],
    };

    return (
      <RNModal
        transparent
        animationType="none"
        visible={this.state.isVisible}
        onRequestClose={onBackPress || (() => {})}
        {...attributes}
      >
        <KeyboardAvoidingView
          style={styles.backdropWrapper}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
        >
          {Platform.OS === 'ios' && (
            <Animated.View
              style={[{ opacity: this.backdropOpacity }, styles.blurWrapper]}
            >
              <BlurView blurType="dark" blurAmount={10} style={styles.blur} />
            </Animated.View>
          )}

          {Platform.OS === 'android' &&
            this.state.screenshotUri && (
              <Animated.Image
                source={{ uri: this.state.screenshotUri }}
                onLoad={this.onImageLoad}
                style={[{ opacity: this.imageOpacity }, styles.blurWrapper]}
                fadeDuration={this.props.duration || DEFAULT_DURATION}
                blurRadius={10}
              />
            )}

          {Platform.OS === 'android' && (
            <Animated.View
              style={[{ opacity: this.backdropOpacity }, styles.backdrop]}
            />
          )}

          <Animated.View
            style={[styles.container, style, containerAnimationStyle]}
          >
            {this.props.children}
          </Animated.View>
        </KeyboardAvoidingView>
      </RNModal>
    );
  }
}

const styles = StyleSheet.create({
  backdropWrapper: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'stretch',
  },

  blurWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  blur: {
    flex: 1,
  },

  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .6)',
  },

  container: {
    padding: 10,
    backgroundColor: colors.white,
  },
});
