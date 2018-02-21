import { initialState } from 'src/store/state';
import { ActionTypes } from './actions';
import { Badge } from './Badge';

export const badgesReducer = (
  state = initialState.badges,
  { type, payload },
) => {
  switch (type) {
    case ActionTypes.ADD_BADGE:
      return { ...state, isLoading: true };

    case ActionTypes.ADD_BADGE_SUCCESS: {
      const { badge }: { badge: Badge } = payload;

      return {
        collection: [...state.collection, badge],
        isLoading: false,
      };
    }

    case ActionTypes.ADD_BADGE_FAILURE:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};
