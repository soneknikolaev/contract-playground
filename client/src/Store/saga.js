import { all, call } from 'typed-redux-saga/macro';

import { contractSaga } from './contract/saga';
import { ethereumSaga } from './ethereum/saga';


export function* rootSaga() {
  yield* all([
    call(contractSaga),
    call(ethereumSaga)
  ]);
}
