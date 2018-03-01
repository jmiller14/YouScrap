import { Action } from 'redux';

import { initialState } from 'src/store/state';
import { ActionTypes, OpenModalAction } from './actions';

export const modalReducer = (state = initialState.modal, action: Action) => {
  switch (action.type) {
    case ActionTypes.OPEN_MODAL: {
      const { modalType, modalProps } = action as OpenModalAction;

      return {
        type: modalType,
        props: modalProps,
        isOpen: true,
        wasDismissed: false,
        wasClosed: false,
      };
    }

    case ActionTypes.DISMISS_MODAL: {
      return {
        ...state,
        isOpen: false,
        wasDismissed: true,
        wasClosed: false,
      };
    }

    case ActionTypes.CLOSE_MODAL: {
      return {
        ...state,
        isOpen: false,
        wasDismissed: false,
        wasClosed: true,
      };
    }

    case ActionTypes.UNLOAD_MODAL:
      return { ...initialState.modal };

    default:
      return state;
  }
};
