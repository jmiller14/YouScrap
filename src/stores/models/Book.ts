import { observable } from 'mobx';
import { persist } from 'mobx-persist';

export class Book {
  @persist
  @observable
  id: string = null;

  @persist
  @observable
  title: string = null;

  @persist
  @observable
  items: string[] = [];
}
