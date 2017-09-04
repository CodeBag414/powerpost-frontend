import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { filter } from 'lodash';

import { toastr } from 'lib/react-redux-toastr';
import { getData, postData, putData, patchData, serialize } from 'utils/request';
import { makeSelectCurrentAccount } from 'containers/Main/selectors';

import {
  FETCH_POST_SETS_REQUEST,
  FETCH_POST_SETS_BY_ST_REQUEST,
  FETCH_POST_SET_REQUEST,
  CREATE_POST_SET_REQUEST,
  UPDATE_POST_SET_REQUEST,
  REMOVE_POST_SET_FROM_STREAM_REQUEST,
  DELETE_POST_SET_REQUEST,
  CHANGE_POST_SET_STATUS_REQUEST,
  CHANGE_POST_SET_SORT_ORDER_REQUEST,
  SAVE_POST_SET_SORT_ORDER_REQUEST,
  REPLICATE_POST_SET_REQUEST,
} from '../constants';

import {
  fetchPostSetsSuccess,
  fetchPostSetsFailure,
  fetchPostSetsBySTSuccess,
  fetchPostSetsBySTFailure,
  fetchPostSetSuccess,
  fetchPostSetError,
  createPostSetSuccess,
  createPostSetFailure,
  updatePostSetSuccess,
  updatePostSetFailure,
  removePostSetFromStreamSuccess,
  removePostSetFromStreamFailure,
  deletePostSetSuccess,
  deletePostSetFailure,
  changePostSetStatusSuccess,
  changePostSetSortOrderSuccess,
  savePostSetSortOrderSuccess,
  replicatePostSetSuccess,
  replicatePostSetFailure,
  clearPost,
} from '../actions';

/** Workers **/

/* Post sets */
function* fetchPostSetsWorker({ accountId, filter: filterOptions }) {
  let id;
  if (accountId) {
    id = accountId;
  } else {
    const currentAccount = yield select(makeSelectCurrentAccount());
    id = currentAccount.account_id;
  }
  const data = {
    payload: filterOptions,
  };
  const params = serialize(data);
  const requestUrl = `/post_api/post_sets/${id}?${params}`;
  const response = yield call(getData, requestUrl);
  if (response.data.status === 'success') {
    yield put(fetchPostSetsSuccess(response.data));
  } else {
    yield put(fetchPostSetsFailure(response.data));
  }
}

/* Post sets by ST */
function* fetchPostSetsBySTWorker({ accountId, filter: filterOptions }) {
  let id;
  if (accountId) {
    id = accountId;
  } else {
    const currentAccount = yield select(makeSelectCurrentAccount());
    id = currentAccount.account_id;
  }
  const data = {
    payload: filterOptions,
  };
  const params = serialize(data);
  const requestUrl = `/post_api/post_sets_by_schedule_time/${id}?${params}`;
  const response = yield call(getData, requestUrl);
  if (response.data.status === 'success') {
    yield put(fetchPostSetsBySTSuccess(response.data));
  } else {
    yield put(fetchPostSetsBySTFailure(response.data));
  }
}

/* Post set */
function* fetchPostSetWorker({ payload }) {
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

function* createPostSetWorker({ postSet, editing }) {
  const requestUrl = '/post_api/post_set';
  const requestData = {
    payload: {
      ...postSet,
    },
  };
  const response = yield call(postData, requestUrl, requestData);
  if (response.data.status === 'success') {
    yield put(createPostSetSuccess(response.data.post_set, editing));
    yield put(clearPost());
  } else {
    yield put(createPostSetFailure(response.data));
  }
}

function* updatePostSetWorker(action) {
  const { payload } = action;
  /* Modify post type correctly */
  if (payload.post_type === 'document') payload.post_type = 'file';

  try {
    const response = yield call(putData, `/post_api/post_set/${payload.id}`, { payload });
    const { data } = response;
    if (data.status === 'success') {
      yield put(updatePostSetSuccess(data.post_set));
      return { updatedPostSetId: data.post_set.post_set_id };
    }
    throw data.message;
  } catch (error) {
    yield put(updatePostSetFailure(error));
    return { error };
  }
}

function* removePostSetFromStreamWorker({ postSet, streamId }) {
  const payload = {
    ...postSet,
    id: postSet.post_set_id,
    stream_ids: filter(postSet.stream_ids || [], (id) => id !== streamId),
  };
  const { updatedPostSetId, error } = yield call(updatePostSetWorker, { payload });

  if (updatedPostSetId) {
    yield put(removePostSetFromStreamSuccess(updatedPostSetId));
  } else {
    yield put(removePostSetFromStreamFailure(error));
  }
}

function* deletePostSetWorker({ id }) {
  const requestData = {
    payload: {
      status: '0',
    },
  };
  const requestUrl = `/post_api/post_set/${id}?`;
  try {
    const response = yield call(patchData, requestUrl, requestData);
    const { data } = response;
    if (data.status === 'success') {
      yield put(deletePostSetSuccess(id));
    } else {
      yield put(deletePostSetFailure(data));
    }
  } catch (error) {
    console.log(error);
  }
}

function* changePostSetStatusWorker({ id, status }) {
  const requestData = {
    payload: {
      status,
    },
  };
  const requestUrl = `/post_api/post_set/${id}?`;
  try {
    const response = yield call(patchData, requestUrl, requestData);
    const { data } = response;
    if (data.status === 'success') {
      yield put(changePostSetStatusSuccess(id, status));
    } else {
      console.log('Error while changing post set status', data);
    }
  } catch (error) {
    console.log(error);
  }
}

function* changePostSetSortOrderWorker({ id, afterId }) {
  const requestUrl = `/post_api/sort_order_after/${id}/${afterId}?`;
  const requestData = {
    payload: {
      post_set_id: id,
      sort_order_after_id: afterId,
    },
  };
  try {
    const response = yield call(putData, requestUrl, requestData);
    const { data } = response;
    if (data.status === 'success') {
      yield put(changePostSetSortOrderSuccess(id, data.post_set.sort_order));
    } else {
      console.log('Error while changing post set sort order', data);
    }
  } catch (error) {
    console.log(error);
  }
}

function* savePostSetSortOrderWorker({ id, sortOrder }) {
  const requestUrl = `/post_api/sort_order/${id}/${sortOrder}?`;
  const requestData = {
    payload: {
      post_set_id: id,
      sort_order: sortOrder,
    },
  };
  try {
    const response = yield call(putData, requestUrl, requestData);
    const { data } = response;
    if (data.status === 'success') {
      yield put(savePostSetSortOrderSuccess(id, data.post_set.sort_order));
    } else {
      console.log('Error while saving post set sort order', data);
    }
  } catch (error) {
    console.log(error);
  }
}

function* replicatePostSetWorker({ prevUrl, payload }) {
  let data;

  try {
    const response = yield call(postData, '/post_api/replicate', { payload });
    if (response.data.result !== 'success') {
      throw Error('Status Wrong!');
    }
    data = response.data;
  } catch (error) {
    yield put(replicatePostSetFailure(error));
    toastr.error(error.message || 'Can not copy the postset');
  }

  if (data) {
    toastr.success('Success', 'This post has been added to drafts. You can edit it now or close it and edit later.');
    yield put(replicatePostSetSuccess(data.post_set));
    yield put(push({
      pathname: prevUrl,
      hash: `#postset-${data.post_set.post_set_id}`,
      state: { prevUrl: window.location.href },
    }));
  }
}

/** Sagas **/

/* Post sets */
function* fetchPostSetsSaga() {
  yield takeLatest(FETCH_POST_SETS_REQUEST, fetchPostSetsWorker);
}
/* Post sets by ST */
function* fetchPostSetsBySTSaga() {
  yield takeLatest(FETCH_POST_SETS_BY_ST_REQUEST, fetchPostSetsBySTWorker);
}

/* Post set */
function* fetchPostSetSaga() {
  yield takeLatest(FETCH_POST_SET_REQUEST, fetchPostSetWorker);
}

function* createPostSetSaga() {
  yield takeLatest(CREATE_POST_SET_REQUEST, createPostSetWorker);
}

function* updatePostSetSaga() {
  yield takeLatest(UPDATE_POST_SET_REQUEST, updatePostSetWorker);
}

function* removePostSetFromStreamSaga() {
  yield takeLatest(REMOVE_POST_SET_FROM_STREAM_REQUEST, removePostSetFromStreamWorker);
}

function* deletePostSetSaga() {
  yield takeLatest(DELETE_POST_SET_REQUEST, deletePostSetWorker);
}

function* changePostSetStatusSaga() {
  yield takeLatest(CHANGE_POST_SET_STATUS_REQUEST, changePostSetStatusWorker);
}

function* changePostSetSortOrderSaga() {
  yield takeLatest(CHANGE_POST_SET_SORT_ORDER_REQUEST, changePostSetSortOrderWorker);
}

function* savePostSetSortOrderSaga() {
  yield takeLatest(SAVE_POST_SET_SORT_ORDER_REQUEST, savePostSetSortOrderWorker);
}

function* replicatePostSetSaga() {
  yield takeLatest(REPLICATE_POST_SET_REQUEST, replicatePostSetWorker);
}

export default [
  /* Post sets */
  fetchPostSetsSaga,
  fetchPostSetsBySTSaga,

  /* Post set */
  fetchPostSetSaga,
  createPostSetSaga,
  deletePostSetSaga,
  updatePostSetSaga,
  removePostSetFromStreamSaga,
  changePostSetStatusSaga,
  changePostSetSortOrderSaga,
  savePostSetSortOrderSaga,
  replicatePostSetSaga,
];
