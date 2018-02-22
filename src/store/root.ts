import { combineReducers, Action as ReduxAction } from 'redux';
import { combineEpics, Epic } from 'redux-observable';

import { accountReducer } from './account/reducer';
import { booksReducer } from './books/reducer';
import { badgesReducer } from './badges/reducer';
import { logInEpic, logOutEpic } from './account/epics';
import { addBookEpic, addItemToBookEpic } from './books/epics';
import { addBadgeEpic } from './badges/epics';
import { State } from './state';

export interface Action extends ReduxAction {
  type: string;
  payload?: any;
}

export const rootReducer = combineReducers<State>({
  account: accountReducer,
  books: booksReducer,
  badges: badgesReducer,
});

export const rootEpic = combineEpics(
  logInEpic as Epic<Action, any>,
  logOutEpic,
  addBookEpic,
  addItemToBookEpic,
  addBadgeEpic,
);
