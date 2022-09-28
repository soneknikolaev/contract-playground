import {
  REQUEST_ACCOUNT_START,
  REQUEST_ACCOUNT_SUCCESS,
  REQUEST_ACCOUNT_FAILED
} from './constants';

export const INITIAL_STATE = {
    account: null,
    error: null,
};

export const ethereumReducer = (
  state = INITIAL_STATE, 
  action
) => {
    if (action.type === REQUEST_ACCOUNT_START) {
      return INITIAL_STATE;
    }

    if (action.type === REQUEST_ACCOUNT_SUCCESS) {
      return {
        ...INITIAL_STATE,
        account: action.payload,
      };
    }

    if (action.type === REQUEST_ACCOUNT_FAILED) {
      return {
        ...INITIAL_STATE,
        error: action.payload,
      };
    }
  
    return state;
  };