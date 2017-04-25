import { takeLatest, call, put } from 'redux-saga/effects';
import cookie from 'react-cookie';

import { postData } from 'utils/request';

import {
  REDEEM_TOKEN,
} from './constants';

import {
  redeemTokenSuccess,
  redeemTokenError,
} from './actions';

export function* redeemTokenWorker(action) {
  const { payload } = action;

  try {
    const response = yield call(postData, `/account_api/redeem_token/${payload.token}`, {}, false);

    if (!response.data.api_key) {
      throw Error('Something is wrong with returned api_key');
    }

    cookie.save('token', response.data.api_key, { path: '/' });
    yield put(redeemTokenSuccess(response.data));
  } catch (error) {
    yield put(redeemTokenError(error.response.data));
  }
}

export function* redeemSaga() {
  yield takeLatest(REDEEM_TOKEN, redeemTokenWorker);
}

export default [
  redeemSaga,
];
