import { combineReducers } from 'redux';

import { contractReducer } from './contract/reducer';
import { ethereumReducer } from './ethereum/reducer';

export const rootReducer = combineReducers({
  contract: contractReducer,
  ethereum: ethereumReducer
});
