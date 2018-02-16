import * as React from 'react';
import { Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { observe } from 'mobx';

import { registerScreens } from './screens';
import { stores, hydrateStore } from './stores';
import { MobxRnnProvider } from './utils/MobxRnnProvider';

registerScreens(stores, MobxRnnProvider);

type Props = {};

export class App extends React.Component<Props> {
  constructor(props) {
    super(props);

    // initial startup of app occurs after data hydration
    hydrateStore()
      .then(() => this.start(true))
      .catch(err => console.error(err));
  }

  start = (isInitialStart: boolean) => {
    const INITIAL_ANIMATION_TYPE = Platform.OS === 'ios' ? 'none' : 'fade';

    if (isInitialStart) {
      // switch screens on login status change
      observe(stores.accountStore, 'isLoggedIn', change => {
        if (change.newValue !== change.oldValue) {
          this.start(false);
        }
      });
    }

    if (stores.accountStore.isLoggedIn) {
      Navigation.startSingleScreenApp({
        screen: {
          screen: 'youscrap.MainScreen',
          title: 'Dashboard',
          navigatorStyle: {},
        },
        animationType: isInitialStart ? INITIAL_ANIMATION_TYPE : 'slide-down',
      });
    } else {
      Navigation.startSingleScreenApp({
        screen: {
          screen: 'youscrap.LoginScreen',
          title: 'Log in to YouScrap',
          navigatorStyle: loginNavigatorStyle,
          navigatorButtons: {},
        },
        animationType: isInitialStart ? INITIAL_ANIMATION_TYPE : 'slide-down',
      });
    }
  };
}

const loginNavigatorStyle = {
  navBarHidden: true,
};
