import * as React from 'react';
import { Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { observe } from 'mobx';

import { registerScreens } from './screens';
import { store, hydrateStore } from './stores';
import { MobxRnnProvider } from './utils/MobxRnnProvider';

registerScreens(store, MobxRnnProvider);

type Props = {};

export class App extends React.Component<Props> {
  constructor(props) {
    super(props);

    // initial startup of app after data hydration
    hydrateStore().then(() => this.start(true));

    // switch screens on login status change
    observe(store.accountStore, 'isLoggedIn', () => this.start(false));
  }

  start = (isInitialStart: boolean) => {
    const INITIAL_ANIMATION_TYPE = Platform.OS === 'ios' ? 'none' : 'fade';

    if (store.accountStore.isLoggedIn) {
      Navigation.startSingleScreenApp({
        screen: {
          screen: 'youscrap.MainScreen',
          title: 'YouScrap',
          navigatorStyle: {},
          navigatorButtons: {},
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
