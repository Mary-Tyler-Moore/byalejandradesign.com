/** @flow */
import type { Actions } from './braintree-actions';

export type State = {
  +client: {} | null,
  +loadedAt: number,
  +error: Array<Error>,
};

const brainTree: State = {
  client: null,
  loadedAt: 0,
  error: [],
};

const brainTreeReducer = (state: State = brainTree, action: Actions) => {
  switch (action.type) {
    case '@BRAINTREE/SAVE_CLIENT':
      return {
        ...state,
        client: action.payload,
        loadedAt: action.loadedAt,
      };

    case '@BRAINTREE/ERROR':
      return {
        ...state,
        error: [...state.error, action.error],
      };
    default:
      return state;
  }
};

export default brainTreeReducer;
