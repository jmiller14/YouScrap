import { Epic, ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';

import { Action } from 'src/store/root';
import { ActionTypes, addBookSuccess, addItemToBookSuccess } from './actions';
import { BooksState } from './state';

// TODO use some sort of backend

export const addBookEpic: Epic<Action, BooksState> = (
  actions$: ActionsObservable<Action>,
): Observable<Action> =>
  actions$
    .ofType(ActionTypes.ADD_BOOK)
    .mergeMap(({ payload }) => Observable.of(addBookSuccess(payload.book)));

export const addItemToBookEpic: Epic<Action, BooksState> = (
  actions$: ActionsObservable<Action>,
): Observable<Action> =>
  actions$
    .ofType(ActionTypes.ADD_ITEM_TO_BOOK)
    .mergeMap(({ payload }) =>
      Observable.of(addItemToBookSuccess(payload.bookId, payload.item)),
    );
