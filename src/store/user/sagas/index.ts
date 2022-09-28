import { fork } from 'redux-saga/effects';

import approve from './approve';
import getTokenBalance from './getTokenBalance';

export default function* userSagas(): Generator {
  yield fork(approve);
  yield fork(getTokenBalance);
}
