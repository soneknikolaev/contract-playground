import { utils } from 'ethers';
import { takeLatest, all, call, put, select } from 'typed-redux-saga/macro';

import { getEthereum, geChainId} from 'Helpers';
import { selectContractNetwork } from 'Store/contract/selector';

import { requestAccountFailed, requestAccountSuccess } from './action';
import { REQUEST_ACCOUNT_START } from './constants';

export function* requestAccountAsync() {
  try {
      const ethereum = getEthereum();
      const network = yield* select(selectContractNetwork);
      const chainId = geChainId(network);

      if (chainId !== ethereum.networkVersion) {
        yield* call(ethereum.request, {
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: utils.hexValue(+chainId) }]
        });
      }
      
      const accounts = yield* call(ethereum.request, { method: 'eth_requestAccounts' });
      const walletAddress = accounts[0];

      yield* put(requestAccountSuccess(walletAddress));
  } catch ({ message }) {
      yield* put(requestAccountFailed(message));
  }
}

export function* onRequestAccount() {
  yield* takeLatest(
      REQUEST_ACCOUNT_START,
      requestAccountAsync
  );
}

export function* ethereumSaga() {
  yield* all([call(onRequestAccount)]);
}
