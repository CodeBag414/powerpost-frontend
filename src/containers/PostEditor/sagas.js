import { takeLatest } from 'redux-saga';
import { take, call, put, cancel, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import moment from 'moment';
import { makeSelectUser } from 'containers/App/selectors';

import {
  getData,
  postData,
  deleteData,
} from 'utils/request';

import {
  POST_COMMENT_REQUEST,
  ADD_COMMENT,
  FETCH_COMMENTS_REQUEST,
  SET_COMMENTS,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT,
  FETCH_ACCOUNT_TAGS_REQUEST,
  SET_ACCOUNT_TAGS,
} from './constants';

export function* getComments(payload) {
  const requestUrl = `/post_api/comments/${payload.postSetId}`;
  const result = yield call(getData, requestUrl);
  if (result.data.result === 'success') {
    const comments = result.data.comments.sort((a, b) => a.creation_time - b.creation_time);
    yield put({ type: SET_COMMENTS, comments });
  } else {
    // console.log(result);
  }
}

export function* getAccountTags(payload) {
  const requestUrl = `/post_api/tags/${payload.accountId}`;
  const result = yield call(getData, requestUrl);
  if (result.data.result === 'success') {
    yield put({ type: SET_ACCOUNT_TAGS, accountTags: result.data.tags });
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
          creation_time: moment().unix(),
          user: {
            user_id: currentUser.user_id,
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

export function* deleteCommentRequest(payload) {
  const requestUrl = `/post_api/comment/${payload.commentId}`;
  try {
    const response = yield call(deleteData, requestUrl);
    const { data } = response;
    if (data.result === 'success') {
      yield put({ type: DELETE_COMMENT, commentId: payload.commentId });
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

export function* deleteComment() {
  const watcher = yield takeLatest(DELETE_COMMENT_REQUEST, deleteCommentRequest);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* fetchAccountTags() {
  const watcher = yield takeLatest(FETCH_ACCOUNT_TAGS_REQUEST, getAccountTags);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  fetchComments,
  postComment,
  deleteComment,
  fetchAccountTags,
];
