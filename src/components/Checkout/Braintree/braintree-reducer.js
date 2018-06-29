// @flow
import type { Actions } from './braintree-actions';

export type State = {
  +client: {} | null,
  +loadedAt: number,
  +error: Array<Error>,
  +deviceData: {} | null,
  +dataCollectorInstance: {} | null,
};

const brainTree: State = {
  client: null,
  loadedAt: 0,
  error: [],
  deviceData: null,
  dataCollectorInstance: null,
};

const brainTreeReducer = (state: State = brainTree, action: Actions) => {
  switch (action.type) {
    case '@BRAINTREE/SAVE_CLIENT':
      return {
        ...state,
        client: action.payload,
        loadedAt: Date.now(),
      };
    case '@BRAINTREE/SAVE_DATA_COLLECTOR':
      return {
        ...state,
        dataCollectorInstance: action.payload,
      };
    case '@BRAINTREE/DEVICE_DATA':
      return {
        ...state,
        deviceData: action.payload,
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
