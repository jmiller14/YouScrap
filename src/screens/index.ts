import { Navigation } from 'react-native-navigation';

import { DashboardScreen } from 'src/dashboard/DashboardScreen';
import { DetailsScreen } from 'src/dashboard/details/DetailsScreen';
import { LoginScreen } from 'src/login/LoginScreen';
import { FontScreen } from 'src/font/FontScreen';

export function registerScreens(store: {}, Provider: {}) {
  Navigation.registerComponent(
    'youscrap.DashboardScreen',
    () => DashboardScreen,
    store,
    Provider,
  );

  Navigation.registerComponent(
    'youscrap.DetailsScreen',
    () => DetailsScreen,
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
