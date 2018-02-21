import { v4 } from 'uuid';

import { Action } from 'src/store/root';
import { Book } from './Book';
import { BookItem } from './BookItem';

export enum ActionTypes {
  ADD_BOOK = 'ADD_BOOK',
  ADD_BOOK_SUCCESS = 'ADD_BOOK_SUCCESS',
  ADD_BOOK_FAILURE = 'ADD_BOOK_FAILURE',
  ADD_ITEM_TO_BOOK = 'ADD_ITEM_TO_BOOK',
  ADD_ITEM_TO_BOOK_SUCCESS = 'ADD_ITEM_TO_BOOK_SUCCESS',
  ADD_ITEM_TO_BOOK_FAILURE = 'ADD_ITEM_TO_BOOK_FAILURE',
}

export function addBook(title: string): Action {
  return {
    type: ActionTypes.ADD_BOOK,
    payload: {
      book: {
        title,
        id: v4(),
        items: [],
      },
    },
  };
}

export function addBookSuccess(book: Book): Action {
  return {
    type: ActionTypes.ADD_BOOK_SUCCESS,
    payload: { book },
  };
}

export function addBookFailure(error: string): Action {
  return {
    type: ActionTypes.ADD_BOOK_FAILURE,
    payload: { error },
  };
}

export function addItemToBook(bookId: string, imageUri: string): Action {
  return {
    type: ActionTypes.ADD_ITEM_TO_BOOK,
    payload: { bookId, item: { imageUri, id: v4() } },
  };
}

export function addItemToBookSuccess(bookId: string, item: BookItem): Action {
  return {
    type: ActionTypes.ADD_ITEM_TO_BOOK_SUCCESS,
    payload: { bookId, item },
  };
}

export function addItemToBookFailure(error: string): Action {
  return {
    type: ActionTypes.ADD_ITEM_TO_BOOK_FAILURE,
    payload: { error },
  };
}
