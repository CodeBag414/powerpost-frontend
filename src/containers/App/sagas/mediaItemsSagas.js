import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { getData, serialize } from 'utils/request';

import {
  FETCH_MEDIA_ITEMS_REQUEST,
} from '../constants';

import {
  fetchMediaItemsSuccess,
  fetchMediaItemsFailure,
} from '../actions';

/* Workers */

export function* fetchMediaItemsWorker(action) {
  const accountId = action.accountId;
  const data = {
    payload: {
      account_id: accountId,
    },
  };

  const params = serialize(data);
  const collections = yield call(getData, `/media_api/collections?${params}`);
  const activeCollection = collections.data.collections[0];

  const mediaItems = yield call(getData, `/media_api/collection/${activeCollection.collection_id}`);
  if (!mediaItems.data.error) {
    yield put(fetchMediaItemsSuccess(mediaItems));
  } else {
    yield put(fetchMediaItemsFailure(mediaItems.data.error));
  }
}

/* Sagas */

export function* fetchMediaItemsSaga() {
  yield takeLatest(FETCH_MEDIA_ITEMS_REQUEST, fetchMediaItemsWorker);
}

export default [
  fetchMediaItemsSaga,
];
