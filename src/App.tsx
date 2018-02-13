import * as React from 'react';
import { Navigation } from 'react-native-navigation';

import { registerScreens } from './screens';

registerScreens();

type Props = {};
export class App extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.start();
  }

  start = () => {
    Navigation.startSingleScreenApp({
      screen: {
        screen: 'youscrap.TestScreen',
        title: 'Hello, world!',
        navigatorStyle: {},
        navigatorButtons: {},
      },
    });
  };
}
