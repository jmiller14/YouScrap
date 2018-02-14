import { observable } from 'mobx';
import { persist } from 'mobx-persist';

export class Book {
  @persist
  @observable
  public title: string = null;
  @persist
  @observable
  public items: string[] = [];
}
