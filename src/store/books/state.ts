import { Book } from './Book';

export interface BooksState {
  isLoading: boolean;
  collection: Book[];
}
