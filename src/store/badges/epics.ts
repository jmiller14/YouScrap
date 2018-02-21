import { Epic, ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';

import { Action } from 'src/store/root';
import { ActionTypes, addBadgeSuccess } from './actions';
import { BadgesState } from './state';

// TODO use some sort of backend

export const addBadgeEpic: Epic<Action, BadgesState> = (
  actions$: ActionsObservable<Action>,
): Observable<Action> =>
  actions$
    .ofType(ActionTypes.ADD_BADGE)
    .mergeMap(({ payload }) => Observable.of(addBadgeSuccess(payload.badge)));
