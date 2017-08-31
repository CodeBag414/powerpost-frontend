import { takeLatest, call, put } from 'redux-saga/effects';

import { getData } from 'utils/request';

import {
  FETCH_PUBLIC_POST_SET_REQUEST,
} from './constants';

import {
  fetchPublicPostSetSuccess,
  fetchPublicPostSetError,
} from './actions';

export function* fetchPublicPostSetWorker(action) {
  const { payload } = action;

  try {
    const response = yield call(getData, `/post_api/public_post_set/${payload.id}`, false);
    const { data } = response;
    if (data.status === 'success') {
      yield put(fetchPublicPostSetSuccess(data.post_set));
    } else {
      throw data.message;
    }
  } catch (error) {
    yield put(fetchPublicPostSetError(error));
  }
}

export function* fetchPublicPostSetSaga() {
  yield takeLatest(FETCH_PUBLIC_POST_SET_REQUEST, fetchPublicPostSetWorker);
}

export default [
  fetchPublicPostSetSaga,
];
