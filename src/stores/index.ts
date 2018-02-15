import { create } from 'mobx-persist';
import { AsyncStorage } from 'react-native';
import * as remotedev from 'mobx-remotedev';

import { AccountStore } from './AccountStore';
import { BadgeStore } from './BadgeStore';
import { BookStore } from './BookStore';

const accountStore = remotedev(new AccountStore());
const badgeStore = remotedev(new BadgeStore());
const bookStore = remotedev(new BookStore());

const hydrate = create({ storage: AsyncStorage });

export const hydrateStore = () =>
  Promise.all([
    hydrate('accountStore', accountStore),
    hydrate('badgeStore', badgeStore),
    hydrate('bookStore', bookStore),
  ]);

export const stores = {
  accountStore,
  badgeStore,
  bookStore,
};
