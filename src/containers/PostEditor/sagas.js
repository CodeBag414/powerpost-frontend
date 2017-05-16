import { takeLatest } from 'redux-saga';
import { take, call, put, cancel, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { makeSelectUser } from 'containers/App/selectors';

import {
  getData,
  postData,
} from 'utils/request';

import {
  POST_COMMENT_REQUEST,
  ADD_COMMENT,
  FETCH_COMMENTS_REQUEST,
  SET_COMMENTS,
} from './constants';

export function* getComments(payload) {
  const requestUrl = `/post_api/comments/${payload.postSetId}`;
  const result = yield call(getData, requestUrl);
  if (result.data.result === 'success') {
    const comments = result.data.comments;
    yield put({ type: SET_COMMENTS, comments });
  } else {
    // console.log(result);
  }
}

export function* postCommentRequest(payload) {
  const requestUrl = `/post_api/comment/${payload.postSetId}`;
  const requestData = {
    payload: {
      comment_type: 'general',
      text: payload.text,
    },
  };
  const currentUser = yield select(makeSelectUser());
  try {
    const response = yield call(postData, requestUrl, requestData);
    const { data } = response;
    if (data.result === 'success') {
      yield put({
        type: ADD_COMMENT,
        comment: {
          ...data.payload,
          comment_id: data.comment_id,
          user: {
            properties: currentUser.properties,
            display_name: currentUser.display_name,
          },
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* fetchComments() {
  const watcher = yield takeLatest(FETCH_COMMENTS_REQUEST, getComments);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* postComment() {
  const watcher = yield takeLatest(POST_COMMENT_REQUEST, postCommentRequest);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  fetchComments,
  postComment,
];
