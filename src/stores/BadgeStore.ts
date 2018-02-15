import { observable } from 'mobx';
import { persist } from 'mobx-persist';
import { Badge } from './models/Badge';

export class BadgeStore {
  @persist('list', Badge)
  @observable
  badges = [];
}
