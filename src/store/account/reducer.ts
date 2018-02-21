import { initialState } from 'src/store/state';
import { ActionTypes } from './actions';

export const accountReducer = (
  state = initialState.account,
  { type, payload },
) => {
  switch (type) {
    case ActionTypes.LOG_IN:
      return { ...state, isLoading: true };

    case ActionTypes.LOG_IN_SUCCESS: {
      const { username }: { username: string } = payload;

      return {
        username,
        isLoading: false,
        isLoggedIn: true,
      };
    }

    case ActionTypes.LOG_IN_FAILURE:
      return { ...state, isLoading: false };

    case ActionTypes.LOG_OUT:
      return { ...state, isLoading: true };

    case ActionTypes.LOG_OUT_SUCCESS: {
      return { ...initialState.account };
    }

    case ActionTypes.LOG_OUT_FAILURE:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};
