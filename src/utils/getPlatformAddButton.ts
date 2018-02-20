import { Platform } from 'react-native';

import { icons } from 'src/components/Icons';

export const getPlatformAddButton = () => {
  if (Platform.OS === 'ios') {
    return { rightButtons: [{ id: 'add', icon: icons.addIcon }] };
  }

  return {
    fab: {
      collapsedId: 'add',
      collapsedIcon: icons.addIcon,
      collapsedIconColor: 'white',
      backgroundColor: 'red',
    },
  };
};
