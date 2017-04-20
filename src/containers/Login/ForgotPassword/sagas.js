import { takeLatest, call, put, take, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { postData } from 'utils/request';

import {
  FORGOT_PASSWORD,
} from './constants';

import {
  forgotPasswordSuccess,
  forgotPasswordError,
} from './actions';

export function* forgotPasswordWorker(action) {
  const { payload } = action;

  try {
    const response = yield call(postData, '/user_api/password_reset', { payload }, false);
    const { data } = response;
    console.log('*****', data);
    if (data.status === 'success') {
      yield put(forgotPasswordSuccess(data.payload.token));
    }
  } catch (error) {
    console.log('----', error);
    yield put(forgotPasswordError(error));
  }
}

export function* forgotPasswordSaga() {
  const watcherA = yield takeLatest(FORGOT_PASSWORD, forgotPasswordWorker);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
}

export default [
  forgotPasswordSaga,
];
