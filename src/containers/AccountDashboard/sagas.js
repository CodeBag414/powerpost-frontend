import { takeLatest, delay } from 'redux-saga';
import { take, call, put, race, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { toastr } from 'lib/react-redux-toastr';
import { getData, postData, putData, serialize } from 'utils/request';

import {
  FETCH_STATUS_COUNT_REQUEST,
} from './constants';

import {
  fetchStatusCountSuccess,
  fetchStatusCountFailure,
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

export function* fetchStatusCountSaga() {
  const watcher = yield takeLatest(FETCH_STATUS_COUNT_REQUEST, fetchStatusCount);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  fetchStatusCountSaga,
];
