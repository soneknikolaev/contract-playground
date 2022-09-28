import {
    REQUEST_ACCOUNT_START,
    REQUEST_ACCOUNT_SUCCESS,
    REQUEST_ACCOUNT_FAILED
} from './constants';

import { createAction } from '../helpers';

export const requestAccountStart = () => createAction(REQUEST_ACCOUNT_START);
  
export const requestAccountSuccess = (account) => createAction(REQUEST_ACCOUNT_SUCCESS, account);
  
export const requestAccountFailed = (error) => createAction(REQUEST_ACCOUNT_FAILED, error)
  