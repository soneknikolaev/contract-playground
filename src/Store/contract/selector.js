import { createSelector } from 'reselect';

const selectContractReducer = (state) => state.contract;

export const selectAbi = createSelector(
    [selectContractReducer],
    (contract) => contract.abi
);

export const selectContractIsLoading = createSelector(
  [selectContractReducer],
  (contract) => contract.isLoading
);

export const selectContractError = createSelector(
  [selectContractReducer],
  (contract) => contract.error
);

export const selectContractIsLoaded = createSelector(
  [selectContractReducer],
  (contract) => Boolean(contract.address && !contract.isLoading)
);

export const selectContractNetwork = createSelector(
  [selectContractReducer],
  (contract) => contract.network,
);

export const selectContractAddress = createSelector(
  [selectContractReducer],
  (contract) => contract.address,
)