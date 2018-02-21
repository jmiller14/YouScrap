import { Epic, ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';

import { Action } from 'src/store/root';
import {
  ActionTypes,
  logInSuccess,
  logOutSuccess,
  logInFailure,
} from './actions';
import { AccountState } from './state';

// TODO use some sort of backend

export const logInEpic: Epic<Action, AccountState> = (
  actions$: ActionsObservable<Action>,
): Observable<Action> =>
  actions$
    .ofType(ActionTypes.LOG_IN)
    .mergeMap(
      ({ payload }) =>
        payload.username && payload.password
          ? Observable.of(logInSuccess(payload.username))
          : Observable.of(
              logInFailure('Please enter both a username and a password.'),
            ),
    );

export const logOutEpic: Epic<Action, AccountState> = (
  actions$: ActionsObservable<Action>,
): Observable<Action> =>
  actions$
    .ofType(ActionTypes.LOG_OUT)
    .mergeMap(() => Observable.of(logOutSuccess()));
