import { Platform, TextStyle } from 'react-native';

export enum Weights {
  Thin = '100',
  ExtraLight = '200',
  Light = '300',
  Regular = '400',
  Medium = '500',
  SemiBold = '600',
  Bold = '700',
  ExtraBold = '800',
  Black = '900',
}

export enum Styles {
  Regular = 'Regular',
  Italic = 'Italic',
}

// reverse map of `Weights` used for Android
const weightNames = Object.keys(Weights).reduce((map, key) => {
  map[Weights[key]] = key;

  return map;
}, {});

export const font = (
  weight: Weights = Weights.Regular,
  style: Styles = Styles.Regular,
): TextStyle => {
  if (Platform.OS === 'android') {
    const variant = `${weightNames[weight]}${
      style === Styles.Italic ? 'Italic' : ''
    }`;

    return { fontFamily: `FiraSans-${variant}` };
  } else {
    return {
      fontFamily: 'Fira Sans',
      fontWeight: weight,
      fontStyle: style === Styles.Regular ? 'normal' : 'italic',
    };
  }
};
