import { takeLatest, call, put } from 'redux-saga/effects';
import cookie from 'react-cookie';

import { getData, postData } from 'utils/request';

import {
  FETCH_SUBSCRIPTIONS,
} from './constants';

import {
  fetchSubscriptionsSuccess,
  fetchSubscriptionsError,
} from './actions';

export function* fetchSubscriptionsWorker(action) {
  const { payload } = action;

  try {
    const { data } = yield call(getData, `/payment_api/subscriptions/${payload.accountId}`);

    if (data.status !== 'success') {
      console.error(data);
      yield put(fetchSubscriptionsError(data.message));
    } else {
      yield put(fetchSubscriptionsSuccess(data.subscriptions[0]));
    }
  } catch (error) {
    console.error(error);
  }
}

export function* fetchSubscriptionsSaga() {
  yield takeLatest(FETCH_SUBSCRIPTIONS, fetchSubscriptionsWorker);
}

export default [
  fetchSubscriptionsSaga,
];
