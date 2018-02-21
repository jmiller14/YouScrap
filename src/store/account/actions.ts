import { Action } from 'src/store/root';

export enum ActionTypes {
  LOG_IN = 'LOG_IN',
  LOG_IN_SUCCESS = 'LOG_IN_SUCCESS',
  LOG_IN_FAILURE = 'LOG_IN_FAILURE',
  LOG_OUT = 'LOG_OUT',
  LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS',
  LOG_OUT_FAILURE = 'LOG_OUT_FAILURE',
}

export function logIn(username: string, password: string): Action {
  return {
    type: ActionTypes.LOG_IN,
    payload: { username, password },
  };
}

export function logInSuccess(username: string): Action {
  return {
    type: ActionTypes.LOG_IN_SUCCESS,
    payload: { username },
  };
}

export function logInFailure(error: string): Action {
  return {
    type: ActionTypes.LOG_IN_FAILURE,
    payload: { error },
  };
}

export function logOut(): Action {
  return {
    type: ActionTypes.LOG_OUT,
  };
}

export function logOutSuccess(): Action {
  return {
    type: ActionTypes.LOG_OUT_SUCCESS,
  };
}

export function logOutFailure(error: string): Action {
  return {
    type: ActionTypes.LOG_OUT_FAILURE,
    payload: { error },
  };
}
