import {
    FETCH_ABI_START,
    FETCH_ABI_SUCCESS,
    FETCH_ABI_FAILED,
} from './constants';

import { createAction } from '../helpers';

export const fetchAbiStart = (address, network) => createAction(FETCH_ABI_START, { address, network });
  
export const fetchAbiSuccess = (abi) => createAction(FETCH_ABI_SUCCESS, abi);
  
export const fetchAbiFailed = (error) => createAction(FETCH_ABI_FAILED, error)
  