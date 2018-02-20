import { Platform } from 'react-native';
import * as Ionicons from 'react-native-vector-icons/Ionicons';

const Icon = Ionicons.default;

class Icons {
  prefix: string;
  loadIcons: Promise<string[]>;

  addIcon: string;

  loadIcon(
    iconName: string,
    property: string,
    fontSize = 30,
    useIOSOutline = false,
  ): Promise<string> {
    return Icon.getImageSource(
      `${this.prefix}-${iconName}${
        useIOSOutline && Platform.OS === 'ios' ? '-outline' : ''
      }`,
      fontSize,
    )
      .then(source => (this[property] = source))
      .catch(() => ''); // TODO use fallback?
  }

  constructor() {
    this.prefix = Platform.OS === 'ios' ? 'ios' : 'md';
    this.loadIcons = Promise.all([this.loadIcon('add', 'addIcon')]);
  }
}

export const icons = new Icons();
