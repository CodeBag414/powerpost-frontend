import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { getData, postData, putData, serialize } from 'utils/request';

import {
  createPostSuccess,
  createPostFailure,
  addPostToPostSet,
} from '../actions/postActions';

import {
  FETCH_POSTS_REQUEST,
  CREATE_POST_REQUEST,
  UPDATE_POST_REQUEST,
  CREATE_BUNCH_POSTS_REQUEST,
  UPDATE_BUNCH_POSTS_REQUEST,
} from '../constants';

import {
  fetchPostSetRequest,
  fetchPostsSuccess,
  fetchPostsFailure,
  updatePostSuccess,
  updatePostFailure,
  createBunchPostsSuccess,
  updateBunchPostsSuccess,
} from '../actions';

/** Workers **/

/* Posts */
function* fetchPostsWorker({ accountId }) {
  const data = {
    payload: {
      sort_by: 'creation_time',
      limit: 500,
    },
  };
  const params = serialize(data);
  const requestUrl = `/post_api/posts/${accountId}?${params}`;

  const response = yield call(getData, requestUrl);
  if (response.data.status === 'success') {
    yield put(fetchPostsSuccess(fromJS(response.data.posts)));
  } else {
    yield put(fetchPostsFailure(response.data));
  }
}

/* Post */
function* createPostWorker({ payload, isBunchPosting = false }) {
  try {
    const response = yield call(postData, '/post_api/post', { payload });
    if (response.data.result === 'success') {
      if (!isBunchPosting) {
        yield put(createPostSuccess(response.data.post));
        // yield put(fetchPostSetRequest({ id: response.data.post.post_set_id }));
      } else {
        yield put(addPostToPostSet(response.data.post));
      }
    } else {
      yield put(createPostFailure(response.data));
    }
  } catch (error) {
    yield put(createPostFailure(error));
  }
}

function* updatePostWorker({ post, isBunchPosting = false }) {
  try {
    const requestUrl = `/post_api/post/${post.post_id}`;
    const requestData = {
      payload: {
        ...post,
      },
    };

    const response = yield call(putData, requestUrl, requestData);
    if (response.data.result === 'success') {
      yield put(updatePostSuccess(response.data.post));
      if (!isBunchPosting) {
        yield put(fetchPostSetRequest({ id: response.data.post.post_set_id }));
      }
    } else {
      yield put(updatePostFailure(response.data));
    }
  } catch (error) {
    console.log('Error in updatePostWorker', error);
  }
}

function* createBunchPostsWorker({ posts }) {
  yield call(createBunchPosts, posts);
  yield put(createBunchPostsSuccess());
}
function* createBunchPosts(posts) {
  for (let i = 0; i < posts.length; i += 1) {
    yield fork(createPostWorker, { payload: posts[i], isBunchPosting: true });
  }
}

function* updateBunchPostsWorker({ posts, postSet }) {
  yield call(updateBunchPosts, posts);
  yield put(updateBunchPostsSuccess(posts, postSet));
}
function* updateBunchPosts(posts) {
  for (let i = 0; i < posts.length; i += 1) {
    const post = posts[i];
    yield fork(updatePostWorker, { post, isBunchPosting: true });
  }
}

/** Sagas **/

/* Posts */
function* fetchPostsSaga() {
  yield takeLatest(FETCH_POSTS_REQUEST, fetchPostsWorker);
}

/* Post */
function* createPostSaga() {
  yield takeLatest(CREATE_POST_REQUEST, createPostWorker);
}

function* updatePostSaga() {
  yield takeLatest(UPDATE_POST_REQUEST, updatePostWorker);
}

function* createBunchPostsSaga() {
  yield takeLatest(CREATE_BUNCH_POSTS_REQUEST, createBunchPostsWorker);
}

function* updateBunchPostsSaga() {
  yield takeLatest(UPDATE_BUNCH_POSTS_REQUEST, updateBunchPostsWorker);
}

export default [
  fetchPostsSaga,
  createPostSaga,
  updatePostSaga,
  createBunchPostsSaga,
  updateBunchPostsSaga,
];
