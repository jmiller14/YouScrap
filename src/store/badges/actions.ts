import { Action } from 'src/store/root';
import { Badge } from './Badge';

export enum ActionTypes {
  ADD_BADGE = 'ADD_BADGE',
  ADD_BADGE_SUCCESS = 'ADD_BADGE_SUCCESS',
  ADD_BADGE_FAILURE = 'ADD_BADGE_FAILURE',
}

export function addBadge(badge: Badge): Action {
  return {
    type: ActionTypes.ADD_BADGE,
    payload: { badge },
  };
}

export function addBadgeSuccess(badge: Badge): Action {
  return {
    type: ActionTypes.ADD_BADGE_SUCCESS,
    payload: { badge },
  };
}

export function addBadgeFailure(error: string): Action {
  return {
    type: ActionTypes.ADD_BADGE_FAILURE,
    payload: { error },
  };
}
