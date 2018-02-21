import { BookItem } from './BookItem';

export interface Book {
  id: string;
  title: string;
  items: BookItem[];
}
