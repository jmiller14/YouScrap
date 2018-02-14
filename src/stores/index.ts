import { create } from 'mobx-persist';
import { AsyncStorage } from 'react-native';

import { AccountStore } from './AccountStore';
import { BadgeStore } from './BadgeStore';
import { BookStore } from './BookStore';

const accountStore = new AccountStore();
const badgeStore = new BadgeStore();
const bookStore = new BookStore();

const hydrate = create({ storage: AsyncStorage });

export const hydrateStore = () =>
  Promise.all([
    hydrate('accountStore', accountStore),
    hydrate('badgeStore', badgeStore),
    hydrate('bookStore', bookStore),
  ]);

export const store = {
  accountStore,
  badgeStore,
  bookStore,
};
