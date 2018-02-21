import { initialState } from 'src/store/state';
import { ActionTypes } from './actions';
import { Book } from './Book';
import { BookItem } from './BookItem';

export const booksReducer = (state = initialState.books, { type, payload }) => {
  switch (type) {
    case ActionTypes.ADD_BOOK:
      return { ...state, isLoading: true };

    case ActionTypes.ADD_BOOK_SUCCESS: {
      const { book }: { book: Book } = payload;

      return {
        collection: [...state.collection, book],
        isLoading: false,
      };
    }

    case ActionTypes.ADD_BOOK_FAILURE:
      return { ...state, isLoading: false };

    case ActionTypes.ADD_ITEM_TO_BOOK:
      return { ...state, isLoading: true };

    case ActionTypes.ADD_ITEM_TO_BOOK_SUCCESS: {
      const { bookId, item }: { bookId: string; item: BookItem } = payload;
      const oldBook = state.collection.find(book => book.id === bookId);
      const newBook = { ...oldBook, items: [...oldBook.items, item] };
      const collection = state.collection.map(
        book => (book === oldBook ? newBook : book),
      );

      return {
        collection,
        isLoading: false,
      };
    }

    case ActionTypes.ADD_ITEM_TO_BOOK_FAILURE:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};
