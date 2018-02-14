import { observable } from 'mobx';
import { persist } from 'mobx-persist';

export class Badge {
  @persist
  @observable
  title: string = null;
  @persist
  @observable
  description: string = null;
}
