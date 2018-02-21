import { observable, ObservableMap, action } from 'mobx';
import { persist } from 'mobx-persist';
import { v4 } from 'uuid';

import { Book } from './models/Book';

export class BookStore {
  @persist('map')
  @observable
  books: ObservableMap<Book> = observable.map({});

  @action
  addBook = title => {
    const book = new Book();
    const id = v4();

    book.id = id;
    book.title = title;
    book.items = observable.map({});

    this.books.set(id, book);
  };

  @action
  removeBook = id => {
    this.books.delete(id);
  };

  @action
  addItemToBook = (book: Book) => {
    const id = v4();
    book.items.set(id, `https://picsum.photos/300/300/?random#${id}`);
  };
}
