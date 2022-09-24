import { createSelector } from 'reselect';

const selectEthereumReducer = (state) => state.ethereum;

export const selectEthereumAccount = createSelector(
    [selectEthereumReducer],
    (contract) => contract.account
);

export const selectEthereumError = createSelector(
  [selectEthereumReducer],
  (contract) => contract.error
);