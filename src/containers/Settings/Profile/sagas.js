import { takeLatest } from 'redux-saga';
import { take, call, put, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { toastr } from 'lib/react-redux-toastr';

import {
  getData,
  putData,
} from 'utils/request';

import {
  FETCH_ACCOUNT,
  UPDATE_ACCOUNT,
} from './constants';

export function* getAccount(ID) { // eslint-disable-line no-unused-vars
  const { accountID } = ID;
  const requestUrl = `/account_api/account/${accountID}`;
  const result = yield call(getData, requestUrl);

  if (result.data.status === 'success') {
    const account = result.data.account;
    yield put({ type: FETCH_ACCOUNT, account });
  }
}

export function* setAccount(updateData) { // eslint-disable-line no-unused-vars
  const { accountID, update } = updateData.data;
  const requestUrl = `/account_api/account/${accountID}`;
  const result = yield call(putData, requestUrl, update);
  if (result.data.status === 'success') {
    const account = result.data.account;
    yield put({ type: FETCH_ACCOUNT, account });
    toastr.success('Success!', 'Settings have been updated.');
  } else {
    console.log(result.data);
  }
}

export function* accountProfile() {
  const watcher = yield takeLatest(FETCH_ACCOUNT, getAccount);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* updateProfile() {
  yield takeLatest(UPDATE_ACCOUNT, setAccount);
}

export default [
  accountProfile,
  updateProfile,
];
