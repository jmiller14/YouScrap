import * as React from 'react';
import { Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import { registerScreens } from './screens';
import { configureStore } from './store/configureStore';
import { icons } from './components/Icons';
import { State, initialState } from './store/state';
import { getPlatformAddButton } from 'src/utils/getPlatformAddButton';

type Props = {};

const store = configureStore(initialState);
registerScreens(store, Provider);

export class App extends React.Component<Props> {
  private isLoggedIn = false;

  constructor(props) {
    super(props);

    // initial startup of app occurs after icons load
    icons.loadIcons.catch(err => console.error(err)).then(() => {
      this.start(true, this.isLoggedIn);

      store.subscribe(() => {
        const state: State = store.getState();

        if (state.account.isLoggedIn !== this.isLoggedIn) {
          this.start(false, state.account.isLoggedIn);
        }

        this.isLoggedIn = state.account.isLoggedIn;
      });
    });
  }

  start = (isInitialStart: boolean, isLoggedIn: boolean) => {
    const INITIAL_ANIMATION_TYPE = Platform.OS === 'ios' ? 'none' : 'fade';

    if (isLoggedIn) {
      Navigation.startSingleScreenApp({
        screen: {
          screen: 'youscrap.MainScreen',
          title: 'Dashboard',
          navigatorStyle: {},
          navigatorButtons: {
            ...getPlatformAddButton(),
            leftButtons: [{ title: 'Log out', id: 'cancel' }],
          },
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
