import pick from 'lodash/pick';

import { NETWORKS } from 'Constants';

import {
  FETCH_ABI_START,
  FETCH_ABI_SUCCESS,
  FETCH_ABI_FAILED,
} from './constants';

export const INITIAL_STATE = {
    abi: [],
    network: NETWORKS.MAINNET,
    address: '',
    isLoading: false,
    error: null,
};

export const contractReducer = (
  state = INITIAL_STATE, 
  action
) => {
    if (action.type === FETCH_ABI_START) {
      return {
        ...INITIAL_STATE,
        ...pick(action.payload, ['address', 'network']),
        isLoading: true,
      };
    }

    if (action.type === FETCH_ABI_SUCCESS) {
      return {
        ...state,
        abi: action.payload,
        isLoading: false,
        error: null,
      };
    }

    if (action.type === FETCH_ABI_FAILED) {
      return {
        ...INITIAL_STATE,
        error: action.payload,
      };
    }
  
    return state;
  };