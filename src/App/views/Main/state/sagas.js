import { takeLatest, takeEvery } from 'redux-saga';
import { take, call, put, cancel, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { getData } from 'utils/request';

import { makeSelectCurrentAccount } from './selectors';
import {
    FETCH_ACCOUNT,
    FETCH_ACCOUNT_SUCCESS,
    FETCH_ACCOUNT_ERROR,
    IS_LOADING_ACCOUNT,
} from './constants';

export function* getAccount(action) {
  let accountId = action.account_id;
  if (!action.account_id) {
    accountId = 'me';
    console.log('IN select user account!');
  }
  const currentAccount = yield select(makeSelectCurrentAccount());
  if ((accountId === 'me' && currentAccount.account_id) || accountId === currentAccount.account_id) {
    console.log('current account');
  } else {
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
  }
}

export function* getAccountDataWatch() {
  console.log('in getaccountdatawatch');
  yield takeEvery(FETCH_ACCOUNT, getAccount);
}

export function* accountData() {
  const watcher = yield takeLatest(FETCH_ACCOUNT, getAccount);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  accountData,
];
