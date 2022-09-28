import { takeLatest, all, call, put } from 'typed-redux-saga/macro';

import { getAbi } from 'Api';
import { sortAbiByType, getNotVirtualAbi } from 'Helpers';

import { fetchAbiSuccess, fetchAbiFailed } from './action';
import { FETCH_ABI_START } from './constants';

export function* fetchAbiAsync({
    payload: { address, network },
  }) {
    try {
        const { data } = yield* call(getAbi, network, address);
        
        if (data.message !== 'OK') {
            throw new Error(data.result || 'Cannot load abi.');
        }
        
        const abi = getNotVirtualAbi(
          sortAbiByType(
            JSON.parse(data.result)
          )
        );
        
        yield* put(fetchAbiSuccess(abi));
    } catch ({ message }) {
        yield* put(fetchAbiFailed(message));
    }
  }

export function* onFetchAbi() {
    yield* takeLatest(
        FETCH_ABI_START,
        fetchAbiAsync
    );
  }

export function* contractSaga() {
    yield* all([call(onFetchAbi)]);
  }
  