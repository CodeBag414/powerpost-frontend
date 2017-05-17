import { takeLatest, call, put, take, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { getData, putData } from 'utils/request';

import {
  FETCH_POST_SET_REQUEST,
  UPDATE_POST_SET_REQUEST,
} from './constants';

import {
  fetchPostSetSuccess,
  fetchPostSetError,
  updatePostSetSuccess,
  updatePostSetError,
} from './actions';

export function* fetchPostSetWorker(action) {
  const { payload } = action;

  try {
    const response = yield call(getData, `/post_api/post_set/${payload.id}`);
    const { data } = response;
    if (data.status === 'success') {
      yield put(fetchPostSetSuccess(data.post_set));
    } else {
      throw data.message;
    }
  } catch (error) {
    yield put(fetchPostSetError(error));
  }
}

export function* updatePostSetWorker(action) {
  const { payload } = action;

  try {
    const response = yield call(putData, `/post_api/post_set/${payload.id}`, { payload });
    const { data } = response;
    if (data.status === 'success') {
      console.log(data.post_set);
      yield put(updatePostSetSuccess(data.post_set));
    } else {
      throw data.message;
    }
  } catch (error) {
    yield put(updatePostSetError(error));
  }
}

export function* commonSaga() {
  const watcher1 = yield takeLatest(FETCH_POST_SET_REQUEST, fetchPostSetWorker);
  const watcher2 = yield takeLatest(UPDATE_POST_SET_REQUEST, updatePostSetWorker);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher1);
  yield cancel(watcher2);
  // Not killing saga when LOCATION_CHANGE happens. It just stops when parent-level routing happens
}

export default [
  commonSaga,
];
