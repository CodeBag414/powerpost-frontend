/* eslint-disable no-console */
import { takeLatest } from 'redux-saga';
import { take, call, put, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { getData } from 'utils/request';

import {
  FETCH_SOCIAL_FEED,
} from './constants';

import {
  setSocialFeed,
} from './actions';

function* getSocialFeed({ connectionId }) {
  const requestUrl = `/connection_api/social_feed/${connectionId}`;

  const response = yield call(getData, requestUrl);
  if (response.data.result === 'success') {
    const feed = response.data.posts;
    yield put(setSocialFeed(feed));
  } else {
    console.log(response);
  }
}

export function* fetchSocialFeed() {
  const watcher = yield takeLatest(FETCH_SOCIAL_FEED, getSocialFeed);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  fetchSocialFeed,
];
