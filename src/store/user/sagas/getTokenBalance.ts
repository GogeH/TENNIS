import { contractsConfig, ContractsNames } from 'config';
import { select } from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';
import userSelector from 'store/user/selectors';
import { call, put, takeLatest } from 'typed-redux-saga';
import { Erc20Abi } from 'types/contracts';
import { fromDecimals } from 'utils';

import { getTokenBalance } from '../actions';
import actionTypes from '../actionTypes';
import { updateUserState } from '../reducer';

export function* getTokenBalanceSaga({
  type,
  payload: { web3Provider },
}: ReturnType<typeof getTokenBalance>): Generator | unknown {
  yield put(request(type));
  const { address, network, chainType } = yield select(userSelector.getUser);

  const { abi: tokenAbi, address: tokenAddress } = contractsConfig.contracts[ContractsNames.staking][chainType];

  try {
    const tokenContract: Erc20Abi = yield new web3Provider.eth.Contract(tokenAbi, tokenAddress[network]);

    if (address) {
      const balance = yield* call(tokenContract.methods.balanceOf(address).call);
      const decimals = yield* call(tokenContract.methods.decimals().call);

      yield put(updateUserState({ tokenBalance: fromDecimals(balance, +decimals) }));
    }

    yield put(success(type));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    yield put(error(type));
  }
}

export default function* listener(): Generator {
  yield takeLatest(actionTypes.GET_TOKEN_BALANCE, getTokenBalanceSaga);
}
