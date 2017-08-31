import { takeLatest } from 'redux-saga';
import { take, call, put, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { getData } from 'utils/request';

import {
  FETCH_STATUS_COUNT_REQUEST,
} from './constants';

import {
  fetchStatusCountSuccess,
  fetchStatusCountFailure,
} from './actions';

export function* fetchStatusCountWorker(payload) {
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

export function* fetchStatusCountSaga() {
  const watcher = yield takeLatest(FETCH_STATUS_COUNT_REQUEST, fetchStatusCountWorker);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  fetchStatusCountSaga,
];
