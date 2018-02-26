import { Navigation } from 'react-native-navigation';

import { MainScreen } from './MainScreen';
import { BookDetailsScreen } from './BookDetailsScreen';
import { LoginScreen } from './LoginScreen';
import { FontScreen } from './FontScreen';

export function registerScreens(store: {}, Provider: {}) {
  Navigation.registerComponent(
    'youscrap.MainScreen',
    () => MainScreen,
    store,
    Provider,
  );

  Navigation.registerComponent(
    'youscrap.BookDetailsScreen',
    () => BookDetailsScreen,
    store,
    Provider,
  );

  Navigation.registerComponent(
    'youscrap.LoginScreen',
    () => LoginScreen,
    store,
    Provider,
  );

  Navigation.registerComponent(
    'youscrap.FontScreen',
    () => FontScreen,
    store,
    Provider,
  );
}
