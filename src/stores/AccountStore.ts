import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';

export class AccountStore {
  @persist
  @observable
  isLoggedIn = false;
  @persist
  @observable
  username: string = null;

  @action
  logIn = (username: string, password: string) =>
    new Promise((resolve, reject) => {
      // TODO actual login
      if (username && password) {
        this.isLoggedIn = true;
        this.username = username;
        resolve();
      } else {
        reject();
      }
    });

  @action
  logOut = () =>
    new Promise(resolve => {
      // TODO actual logout
      this.isLoggedIn = false;
      this.username = null;
      resolve();
    });
}
