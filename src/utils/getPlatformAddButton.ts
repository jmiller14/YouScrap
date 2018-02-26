import { Platform } from 'react-native';

import { icons } from 'src/components/Icons';
import { colors } from 'src/vars';

export const getPlatformAddButton = () => {
  if (Platform.OS === 'ios') {
    return { rightButtons: [{ id: 'add', icon: icons.addIcon }] };
  }

  return {
    fab: {
      collapsedId: 'add',
      collapsedIcon: icons.addIcon,
      collapsedIconColor: colors.white,
      backgroundColor: colors.primary,
    },
  };
};
