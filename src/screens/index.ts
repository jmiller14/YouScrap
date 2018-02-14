import { Navigation } from 'react-native-navigation';

import { MainScreen } from './MainScreen';
import { LoginScreen } from './LoginScreen';

export function registerScreens(store: {}, Provider: {}) {
  Navigation.registerComponent(
    'youscrap.MainScreen',
    () => MainScreen,
    store,
    Provider,
  );
  Navigation.registerComponent(
    'youscrap.LoginScreen',
    () => LoginScreen,
    store,
    Provider,
  );
}
