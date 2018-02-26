import { colors } from 'src/vars';
import { font } from 'src/utils/font';

const navigatorFont = font();

export const navigatorStyle = {
  navBarBackgroundColor: colors.primary,
  navBarTextFontSize: 18,
  navBarTextColor: colors.white,
  navBarButtonColor: colors.white,
  navBarTextFontFamily: navigatorFont.fontFamily,
  navBarButtonFontFamily: navigatorFont.fontFamily,

  // Android-specific
  navBarTitleTextCentered: true,
  topBarElevationShadowEnabled: false,
};
