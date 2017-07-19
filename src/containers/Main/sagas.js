import { takeLatest, takeEvery } from 'redux-saga';
import { take, call, put, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { getData, serialize } from 'utils/request';

import {
  setConnections,
} from './actions';

import {
    FETCH_ACCOUNT,
    FETCH_ACCOUNT_SUCCESS,
    FETCH_ACCOUNT_ERROR,
    IS_LOADING_ACCOUNT,
    FETCH_CONNECTIONS,
    FETCH_CONNECTIONS_SUCCESS,
    FETCH_CONNECTIONS_FAILURE,
} from './constants';

export function* getAccount(action) {
  const accountId = action.accountId;

  // if (!action.accountId) {
  //   accountId = 'me';
  // }
  // const currentAccount = yield select(makeSelectCurrentAccount());
  // if ((accountId === 'me' && currentAccount.account_id) || accountId === currentAccount.account_id) {
  //   console.log('current account');
  // } else {
  const requestURL = `/account_api/account/${accountId}`;
  yield put({ type: IS_LOADING_ACCOUNT });
  try {
    const account = yield call(getData, requestURL);
    if (account.data.error) {
      yield put({ type: FETCH_ACCOUNT_ERROR, account });
    } else {
      yield put({ type: FETCH_ACCOUNT_SUCCESS, account });
    }
  } catch (error) {
    yield put({ type: FETCH_ACCOUNT_ERROR, error });
  }
  // }
}

export function* getAccountDataWatch() {
  yield takeEvery(FETCH_ACCOUNT, getAccount);
}

export function* accountData() {
  const watcher = yield takeLatest(FETCH_ACCOUNT, getAccount);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

function* fetchConnectionsWorker({ accountId }) {
  const data = {
    payload: {
      account_id: accountId,
      status: [1, 3, 5],
    },
  };
  const params = serialize(data);

  const response = yield call(getData, `/connection_api/connections?${params}`);
  if (response.data.status === 'success') {
    yield put(setConnections(response.data.connections));
    yield put({ type: FETCH_CONNECTIONS_SUCCESS });
  } else {
    console.log('Fetch connection failure', response.data);
    yield put({ type: FETCH_CONNECTIONS_FAILURE });
  }
}

export function* fetchConnectionsSaga() {
  yield takeLatest(FETCH_CONNECTIONS, fetchConnectionsWorker);
}

export default [
  accountData,
  fetchConnectionsSaga,
];
