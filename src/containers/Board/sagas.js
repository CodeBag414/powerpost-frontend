import { takeLatest } from 'redux-saga';
import { take, call, put, cancel, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { makeSelectCurrentAccount } from 'containers/Main/selectors';

import {
  getData,
  deleteData,
} from 'utils/request';

import {
  boardCallback,
} from './actions';

import {
  SET_POST_SETS,
  FETCH_POST_SETS,
  DELETE_POST_SET_REQUEST,
  DELETE_POST_SET,
} from './constants';

const serialize = function serialize(obj, prefix) {
  const str = [];
  let p;
  for (p in obj) { // eslint-disable-line no-restricted-syntax
    if (Object.prototype.hasOwnProperty.call(obj, p)) {
      const k = prefix ? `${prefix}[${p}]` : p, v = obj[p]; // eslint-disable-line
      str.push((v !== null && typeof v === 'object') ?
        serialize(v, k) :
        `${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
    }
  }
  return str.join('&');
};

export function* getPostSets() {
  const currentAccount = yield select(makeSelectCurrentAccount());
  const requestUrl = `/post_api/post_sets/${currentAccount.account_id}`;
  const result = yield call(getData, requestUrl);

  if (result.data.status === 'success') {
    const postSets = result.data.post_sets;
    yield put({ type: SET_POST_SETS, postSets });
  } else {
    // console.log(result);
  }
}

export function* deletePostSetRequest(payload) {
  yield put({ type: DELETE_POST_SET, id: payload.id });
  /* const requestUrl = `/post_api/post_set/${payload.id}`;
  const result = yield call(deleteData, requestUrl, true);
  if (result.data.status === 'success') {
    yield put({ type: DELETE_POST_SET, id: payload.id });
  } else {
    // console.log(result);
  }*/
}

export function* boardChannel() {
  const watcher = yield takeLatest(FETCH_POST_SETS, getPostSets);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* deletePostSet() {
  const watcher = yield takeLatest(DELETE_POST_SET_REQUEST, deletePostSetRequest);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  boardChannel,
  deletePostSet,
];
