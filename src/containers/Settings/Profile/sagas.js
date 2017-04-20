import { takeLatest } from 'redux-saga';
import { take, call, put, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { toastr } from 'lib/react-redux-toastr';

import { putData } from 'utils/request';

import { fetchCurrentAccount } from 'containers/Main/actions';

import { UPDATE_ACCOUNT_PROFILE } from './constants';

export function* setAccount(updateData) { // eslint-disable-line no-unused-vars
  const { accountID, update } = updateData.data;
  const requestUrl = `/account_api/account/${accountID}`;
  const result = yield call(putData, requestUrl, update);
  if (result.data.status === 'success') {
    yield put(fetchCurrentAccount(accountID));
    toastr.success('Success!', 'Settings have been updated.');
  } else {
    console.log(result.data);
  }
}

export function* updateProfile() {
  const watcher = yield takeLatest(UPDATE_ACCOUNT_PROFILE, setAccount);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  updateProfile,
];
