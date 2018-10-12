/** @flow */
import type { Actions } from './data-collector-actions';

export type State = {
  +teardown: null | (() => any),
  +loadedAt: number,
  +error: Array<Error>,
  +deviceData: {} | null,
};

const initialState: State = {
  teardown: null,
  loadedAt: 0,
  error: [],
  deviceData: null,
};

const dataCollectorReducer = (state: State = initialState, action: Actions) => {
  switch (action.type) {
    case '@DATA_COLLECTOR/SAVE_TEARDOWN':
      return {
        ...state,
        teardown: action.payload,
      };
    case '@DATA_COLLECTOR/SAVE_DATA':
      return {
        ...state,
        loadedAt: action.loadedAt,
        deviceData: action.payload,
      };
    case '@DATA_COLLECTOR/ERROR':
      return {
        ...state,
        error: [...state.error, action.error],
      };
    default:
      return state;
  }
};

export default dataCollectorReducer;
