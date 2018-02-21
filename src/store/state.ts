import { AccountState } from './account/state';
import { Book } from './books/Book';
import { BooksState } from './books/state';
import { Badge } from './badges/Badge';
import { BadgesState } from './badges/state';

export interface State {
  account: AccountState;
  books: BooksState;
  badges: BadgesState;
}

export const initialState: State = {
  account: {
    isLoading: false,
    isLoggedIn: false,
    username: null,
  },

  books: {
    isLoading: false,
    collection: [] as Book[],
  },

  badges: {
    isLoading: false,
    collection: [] as Badge[],
  },
};
