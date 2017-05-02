/* eslint-disable no-console */
import { takeLatest } from 'redux-saga';
import { take, call, put, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { getData } from 'utils/request';

import {
  FETCH_POSTS,
} from './constants';

import {
  setPosts,
} from './actions';

function* getPosts({ accountId }) {
  const requestUrl = `/post_api/posts/${accountId}`;

  const response = yield call(getData, requestUrl);
  if (response.data.status === 'success') {
    const posts = response.data.posts;
    yield put(setPosts(posts));
  } else {
    console.log(response);
  }
}

export function* fetchPosts() {
  const watcher = yield takeLatest(FETCH_POSTS, getPosts);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  fetchPosts,
];
