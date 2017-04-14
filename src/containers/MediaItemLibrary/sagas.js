import { takeLatest } from 'redux-saga';
import { take, call, put, cancel, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { 
  getData,
  postData,
} from 'utils/request';

import { makeSelectActiveCollection } from './selectors';
import {
    FETCH_COLLECTIONS,
    FETCH_COLLECTIONS_SUCCESS,
    FETCH_MEDIA_ITEMS_ERROR,
    FETCH_MEDIA_ITEMS_SUCCESS,
    FETCH_URL_CONTENT,
    FETCH_URL_CONTENT_SUCCESS,
    MEDIA_ERROR,
    CREATE_MEDIA_ITEM,
} from './constants';

export function* getCollections(action) {
  const accountId = action.accountId;

  const data = {
    payload: {
      account_id: accountId,
    } };

  const params = serialize(data);
  const collections = yield call(getData, `/media_api/collections?${params}`);

  yield put({ type: FETCH_COLLECTIONS_SUCCESS, collections });

  const activeCollection = yield select(makeSelectActiveCollection());
  console.log(activeCollection.collection_id);

  const mediaItems = yield call(getData, `/media_api/collection/${activeCollection.collection_id}`);
  if (!mediaItems.data.error) {
    yield put({ type: FETCH_MEDIA_ITEMS_SUCCESS, mediaItems });
  } else {
    yield put({ type: FETCH_MEDIA_ITEMS_ERROR, mediaItems });
  }
}

export function* getLinkData(action) {
  console.log(action);
  
  const data = {
    payload: {
      url: action.url,
    },
  };
  
  const params = serialize(data);
  
  const result = yield call(getData, `/media_api/url_content?${params}`);
  console.log(result);
  if (result.data.result === 'success') {
    const urlData = result.data.url_data[0];
    yield put({ type: FETCH_URL_CONTENT_SUCCESS, urlData });
  } else {
    yield put({ type: MEDIA_ERROR, error: 'Error getting url content' });
  }
}

export function* createMediaItem(action) {
  console.log(action);
  const { mediaItemType, ...item } = action.mediaItem;
  
  let url = '';
  let data = {};
  
  if (mediaItemType === 'link') {
    url = '/media_api/link';
    data = {
      payload: item,
    };
  }
  
  if (url !== '') {
    const res = yield call(postData, url, data);
    console.log(res);
  }
}

export function* linkData() {
  const watcher = yield takeLatest(FETCH_URL_CONTENT, getLinkData);
  
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
export function* collectionData() {
  const watcher = yield takeLatest(FETCH_COLLECTIONS, getCollections);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* mediaItem() {
  const watcher = yield takeLatest(CREATE_MEDIA_ITEM, createMediaItem);
  
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  collectionData,
  linkData,
  mediaItem,
];

const serialize = (obj, prefix) => {
  const str = [];
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i += 1) {
    const p = keys[i];
    const k = prefix ? `${prefix}[${p}]` : p;
    const v = obj[p];
    str.push((v !== null && typeof v === 'object') ?
      serialize(v, k) :
      `${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
  }
  return str.join('&');
};
