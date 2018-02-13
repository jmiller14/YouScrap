import { Navigation } from 'react-native-navigation';

import { TestScreen } from './TestScreen';

export function registerScreens() {
  Navigation.registerComponent('youscrap.TestScreen', () => TestScreen);
}
