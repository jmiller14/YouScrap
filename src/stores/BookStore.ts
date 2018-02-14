import { observable } from 'mobx';
import { persist } from 'mobx-persist';
import { Book } from './models/Book';

export class BookStore {
  @persist('list', Book)
  @observable
  books = [];
}

export const bookStore = new BookStore();
