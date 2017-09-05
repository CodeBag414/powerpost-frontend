import { takeLatest, takeEvery } from 'redux-saga';
import { take, call, put, cancel, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import moment from 'moment';
import _ from 'lodash';
import { makeSelectUser } from 'containers/App/selectors';

import {
  FETCH_MEDIA_ITEMS_SUCCESS,
  FETCH_MEDIA_ITEMS_FAILURE,
  CREATE_MEDIA_ITEM,
  CREATE_MEDIA_ITEM_SUCCESS,
  CREATE_MEDIA_ITEM_ERROR,
  UPDATE_MEDIA_ITEM,
  UPDATE_MEDIA_ITEM_SUCCESS,
  VIDEO_PROCESSING,
  VIDEO_PROCESSING_DONE,
} from 'containers/App/constants';

import {
  updatePostSetRequest,
} from 'containers/App/actions';

import {
  getData,
  postData,
  deleteData,
  putData,
  serialize,
} from 'utils/request';

import {
  setProcessing,
} from 'containers/Main/actions';

import {
  makeSelectActiveCollection,
  selectPostSet,
} from './selectors';

import {
  makeSelectPostSet,
} from 'containers/App/selectors';

import {
  CREATE_BLOG_ITEM_REQUEST,
  POST_COMMENT_REQUEST,
  ADD_COMMENT,
  FETCH_COMMENTS_REQUEST,
  SET_COMMENTS,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT,
  FETCH_ACCOUNT_TAGS_REQUEST,
  SET_ACCOUNT_TAGS,
  FETCH_URL_CONTENT,
  FETCH_URL_CONTENT_SUCCESS,
  POST_EDITOR_ERROR,
  GET_MEDIA_ITEM,
  GET_MEDIA_ITEM_SUCCESS,
  FETCH_COLLECTIONS,
  FETCH_COLLECTIONS_SUCCESS,
  PROCESS_ITEM,
  PROCESS_ITEM_SUCCESS,
  FETCH_WORDPRESS_GUI_REQUEST,
  FETCH_FACEBOOK_ENTITIES,
  GET_EMBED_DATA,
  GET_EMBED_DATA_SUCCESS,
} from './constants';

import {
  fetchWordpressGUISuccess,
  fetchWordpressGUIFailure,
  fetchFacebookEntitiesSuccess,
  createBlogItemFailure,
} from './actions';

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

export function* getEmbed(action) {
  const data = {
    payload: {
      url: action.url,
    },
  };

  const params = serialize(data);

  const result = yield call(getData, `/media_api/url_content?${params}`);

  if (result.data.result === 'success') {
    const embedData = result.data.url_data[0];
    yield put({ type: GET_EMBED_DATA_SUCCESS, embedData });
  } else {
    console.log('Error getting embed content');
    // yield put({ type: MEDIA_ERROR, error: 'Error getting embed content' }); // FIXME: <-- ???
  }
}

export function* getLinkData(action) {
  const data = {
    payload: {
      url: action.url,
    },
  };

  const params = serialize(data);

  const result = yield call(getData, `/media_api/url_preview?${params}`);
  if (result.data.result === 'success') {
    const urlData = {
      ...result.data.preview,
      short_url: result.data.short_url,
      original_url: result.data.payload.url,
    };

    yield put({ type: FETCH_URL_CONTENT_SUCCESS, urlData });
  } else {
    yield put({ type: POST_EDITOR_ERROR, error: 'Error getting url content' });
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

export function* getMediaItem(action) {
  try {
    const response = yield call(getData, `/media_api/media_item/${action.mediaItemId}`);
    const { data } = response;

    if (data.result === 'success') {
      yield put({ type: GET_MEDIA_ITEM_SUCCESS, mediaItem: [data.media_item] });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* createMediaItem(action) {
  const { mediaItemType, ...item } = action.mediaItem;
  yield put({ type: PROCESS_ITEM });
  let url = '';
  let data = {};

  if (mediaItemType === 'link') {
    url = '/media_api/link';
    data = {
      payload: item,
    };
  } else if (mediaItemType === 'file') {
    url = '/media_api/files';
    data = {
      payload: {
        media_items: [{ ...item.properties }],
      },
    };
  }

  if (url !== '') {
    const res = yield call(postData, url, data);
    if (res.data.result === 'success') {
      const id = res.data.media_items[0].media_item_id;
      const mediaItems = res.data.media_items;

      if (res.data.media_items[0].status === '3') {
        yield put({ type: VIDEO_PROCESSING, id });
      } else {
        yield put(setProcessing(false));
      }

      yield put({ type: CREATE_MEDIA_ITEM_SUCCESS, mediaItems });
      yield put({ type: PROCESS_ITEM_SUCCESS });

      /* Update post set in the backend */
      const postSet = yield select(makeSelectPostSet());
      const payload = {
        ...postSet.get('data').toJS(),
        id: postSet.getIn(['data', 'post_set_id']),
      };
      yield put(updatePostSetRequest(payload));
    } else {
      yield put({ type: CREATE_MEDIA_ITEM_ERROR });
    }
  }
}

export function* pollData(action) {
  try {
    yield call(delay, 5000);
    const id = action.id;
    const res = yield call(getData, `/media_api/media_item/${id}`);
    if (res.data.result === 'success') {
      if (res.data.media_item.status === '1') {
        // processingItem = false;
        yield put(setProcessing(false));
        yield put({ type: VIDEO_PROCESSING_DONE, mediaItem: res.data.media_item });
      } else if (res.data.media_item.status === '3') {
        yield put({ type: VIDEO_PROCESSING, id });
      }
    }
  } catch (error) {
    console.log('Error in pollData', error);
  }
}

export function* updateMediaItem(action) {
  const { ...item } = action.mediaItem;
  // const inBlog = action.inBlog;
  const data = {
    payload: item,
  };

  const results = yield call(putData, `/media_api/media_item/${item.media_item_id}`, data);
  if (results.data.result === 'success') {
    const mediaItems = results.data.media_items;
    yield put(setProcessing(false));
    yield put({ type: UPDATE_MEDIA_ITEM_SUCCESS, mediaItems });

    /* Update post set in the backend */
    const postSet = yield select(makeSelectPostSet());
    const payload = {
      ...postSet.get('details').toJS(),
      id: postSet.getIn(['details', 'post_set_id']),
    };
    yield put(updatePostSetRequest(payload));
  }
}

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

  const mediaItems = yield call(getData, `/media_api/collection/${_.get(activeCollection, 'collection_id', -1)}`);
  if (!mediaItems.data.error) {
    yield put({ type: FETCH_MEDIA_ITEMS_SUCCESS, mediaItems });
  } else {
    yield put({ type: FETCH_MEDIA_ITEMS_FAILURE, mediaItems });
  }
}

export function* createBlogItemSaga(action) {
  const activeCollection = yield select(makeSelectActiveCollection());
  const data = {
    payload: {
      ...action.payload,
      collection_id: activeCollection.collection_id,
    },
  };
  const results = yield call(postData, '/media_api/blog', data);

  yield put(setProcessing(false));
  if (results.data.result === 'success') {
    const mediaItems = results.data.media_items;
    yield put({ type: CREATE_MEDIA_ITEM_SUCCESS, mediaItems });

    const postSet = yield select(makeSelectPostSet());
    const payload = {
      ...postSet.get('details').toJS(),
      id: postSet.getIn(['details', 'post_set_id']),
    };

    yield put(updatePostSetRequest(payload));
  } else {
    yield put(createBlogItemFailure(results.data.message));
  }
}


export function* fetchWordpressGUIWorker({ payload }) {
  let data;

  try {
    const response = yield call(getData, `/connection_api/wordpress_gui/${payload.connectionId}`);
    if (response.data.status !== 'success') {
      throw Error('Status Wrong!');
    }
    data = response.data;
  } catch (error) {
    yield put(fetchWordpressGUIFailure(error));
  }

  if (data) {
    yield put(fetchWordpressGUISuccess(data));
  }
}

export function* fetchComments() {
  const watcher = yield takeLatest(FETCH_COMMENTS_REQUEST, getComments);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* watchPollData() {
  const watcher = yield takeEvery(VIDEO_PROCESSING, pollData);
  yield take(VIDEO_PROCESSING_DONE);
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

export function* mediaItem() {
  const watcher = yield takeLatest(CREATE_MEDIA_ITEM, createMediaItem);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* updateMedia() {
  const watcher = yield takeLatest(UPDATE_MEDIA_ITEM, updateMediaItem);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* linkData() {
  const watcher = yield takeEvery(FETCH_URL_CONTENT, getLinkData);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* getItem() {
  const watcher = yield takeLatest(GET_MEDIA_ITEM, getMediaItem);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* collectionData() {
  const watcher = yield takeLatest(FETCH_COLLECTIONS, getCollections);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* getEmbedData() {
  const watcher = yield takeLatest(GET_EMBED_DATA, getEmbed);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* fetchWordpressGUISaga() {
  const watcher = yield takeLatest(FETCH_WORDPRESS_GUI_REQUEST, fetchWordpressGUIWorker);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* fetchFacebookEntitiesWorker({ payload }) {
  const data = { payload };
  const params = serialize(data);

  const response = yield call(getData, `/connection_api/search_facebook?${params}`);
  if (response.data.result === 'success') {
    yield put(fetchFacebookEntitiesSuccess(response.data.results));
  } else {
    console.log('Error in search_facebook. response: ', response);
  }
}

export function* createBlogItemWatcher() {
  const watcher = yield takeLatest(CREATE_BLOG_ITEM_REQUEST, createBlogItemSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* fetchFacebookEntitiesSaga() {
  const watcher = yield takeLatest(FETCH_FACEBOOK_ENTITIES, fetchFacebookEntitiesWorker);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  fetchComments,
  postComment,
  deleteComment,
  fetchAccountTags,
  collectionData,
  mediaItem,
  updateMedia,
  linkData,
  getItem,
  fetchWordpressGUISaga,
  watchPollData,
  fetchFacebookEntitiesSaga,
  getEmbedData,
  createBlogItemWatcher,
];

const delay = (millis) => {
  const promise = new Promise((resolve) => {
    setTimeout(() => resolve(true), millis);
  });
  return promise;
};
