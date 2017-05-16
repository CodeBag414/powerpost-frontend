import { takeLatest, call, put } from 'redux-saga/effects';

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
      yield put(updatePostSetSuccess(data.post_set));
    } else {
      throw data.message;
    }
  } catch (error) {
    yield put(updatePostSetError(error));
  }
}

export function* commonSaga() {
  yield takeLatest(FETCH_POST_SET_REQUEST, fetchPostSetWorker);
  yield takeLatest(UPDATE_POST_SET_REQUEST, updatePostSetWorker);
  // Not killing saga when LOCATION_CHANGE happens. It just stops when parent-level routing happens
}

export default [
  commonSaga,
];
