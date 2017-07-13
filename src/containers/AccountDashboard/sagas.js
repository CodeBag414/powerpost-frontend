import { takeLatest } from 'redux-saga';
import { take, call, put, select, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { getData, serialize } from 'utils/request';

import { makeSelectCurrentAccount } from 'containers/Main/selectors';

import {
  FETCH_STATUS_COUNT_REQUEST,
  FETCH_POST_SETS_REQUEST,
} from './constants';

import {
  fetchStatusCountSuccess,
  fetchStatusCountFailure,
  fetchPostSetsSuccess,
  fetchPostSetsFailure,
} from './actions';

export function* fetchStatusCount(payload) {
  try {
    const { id } = payload;
    const { data } = yield call(getData, `/post_api/post_set_status_counts/${id}`);
    if (data.status === 'success') {
      yield put(fetchStatusCountSuccess(data.status_counts));
    } else {
      yield put(fetchStatusCountFailure(data.message));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* fetchPostSetsWorker({ accountId, filter, endPoint = 'post_sets' }) {
  const data = {
    payload: filter,
  };
  const params = serialize(data);
  const currentAccount = yield select(makeSelectCurrentAccount());
  let id = currentAccount.account_id;
  if (accountId) {
    id = accountId;
  }
  const requestUrl = `/post_api/${endPoint}/${id}?${params}`;
  const response = yield call(getData, requestUrl);

  if (response.data.status === 'success') {
    yield put(fetchPostSetsSuccess(response.data));
  } else {
    yield put(fetchPostSetsFailure(response.data));
    // console.log(result);
  }
}

export function* fetchStatusCountSaga() {
  const watcher = yield takeLatest(FETCH_STATUS_COUNT_REQUEST, fetchStatusCount);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* fetchPostSetsSaga() {
  const watcher = yield takeLatest(FETCH_POST_SETS_REQUEST, fetchPostSetsWorker);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  fetchStatusCountSaga,
  fetchPostSetsSaga,
];
