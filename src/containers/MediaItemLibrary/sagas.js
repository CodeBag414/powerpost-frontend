import { takeLatest, takeEvery } from 'redux-saga';
import { take, call, put, cancel, select, fork } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { toastr } from 'lib/react-redux-toastr';

import {
  getData,
  postData,
  putData,
  serialize,
} from 'utils/request';

import {
  setProcessing,
} from 'containers/Main/actions';

import {
  createPostSetRequest,
} from 'containers/App/actions';

import {
  makeSelectCurrentAccount,
} from 'containers/Main/selectors';

import { makeSelectActiveCollection } from './selectors';
import {
  FETCH_COLLECTIONS,
  FETCH_COLLECTIONS_SUCCESS,
  FETCH_MEDIA_ITEMS_ERROR,
  FETCH_MEDIA_ITEMS_SUCCESS,
  FETCH_URL_CONTENT,
  FETCH_URL_CONTENT_SUCCESS,
  GET_EMBED_DATA,
  GET_EMBED_DATA_SUCCESS,
  MEDIA_ERROR,
  VIDEO_PROCESSING,
  SET_PROCESSING_ITEM,
  VIDEO_PROCESSING_DONE,
  CREATE_MEDIA_ITEM,
  SEARCH_BING,
  SEARCH_BING_SUCCESS,
  FETCH_RSS_FEEDS,
  FETCH_RSS_ITEMS,
  FETCH_RSS_ITEMS_SUCCESS,
  FETCH_RSS_FEEDS_SUCCESS,
  CREATE_RSS_FEED,
  CREATE_RSS_FEED_SUCCESS,
  CREATE_MEDIA_ITEM_SUCCESS,
  DELETE_MEDIA_ITEM,
  DELETE_MEDIA_ITEM_SUCCESS,
  UPDATE_MEDIA_ITEM,
  UPDATE_MEDIA_ITEM_SUCCESS,
  FETCH_STREAM_POST_SETS_REQUEST,
  INVITE_EMAIL_TO_STREAM_REQUEST,
  REPLICATE_POST_SET_REQUEST,
  CREATE_BLOG_ITEM_REQUEST,
  CLEAR_RSS_ITEMS,
} from './constants';

import {
  fetchStreamPostSetsSuccess,
  fetchStreamPostSetsFailure,
  inviteEmailToStreamSuccess,
  inviteEmailToStreamFailure,
  replicatePostSetSuccess,
  replicatePostSetFailure,
  createBlogItemSuccess,
  createBlogItemFailure,
} from './actions';

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

  const mediaItems = yield call(getData, `/media_api/collection/${activeCollection.collection_id}`);

  if (!mediaItems.data.error) {
    yield put({ type: FETCH_MEDIA_ITEMS_SUCCESS, mediaItems });
  } else {
    yield put({ type: FETCH_MEDIA_ITEMS_ERROR, mediaItems });
  }
}

export function* search(action) {
  const data = {
    payload: {
      query: action.query,
    },
  };

  const params = serialize(data);

  const result = yield call(getData, `/media_api/bing?${params}`);
  if (result.data.result === 'success') {
    const webResults = result.data.search_results;
    yield put({ type: SEARCH_BING_SUCCESS, webResults });
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
    const urlData = result.data.preview;
    yield put({ type: FETCH_URL_CONTENT_SUCCESS, urlData });
  } else {
    yield put({ type: MEDIA_ERROR, error: 'Error getting url content' });
  }
}

export function* getEmbed(action) {
  const data = {
    payload: {
      url: action.url,
    }
  };

  const params = serialize(data);

  const result = yield call(getData, `/media_api/url_content?${params}`);
  if (result.data.result === 'success') {
    const embedData = result.data.url_data[0];
    yield put({ type: GET_EMBED_DATA_SUCCESS, embedData });
  } else {
    yield put({ type: MEDIA_ERROR, error: 'Error getting embed content' });
  }
}

export function* getRSSFeeds(action) {
  const id = action.accountId;
  const data = {
    payload: {
      account_id: id,
    },
  };
  yield put({ type: CLEAR_RSS_ITEMS });
  const params = serialize(data);
  const results = yield call(getData, `/feed_api/feeds?${params}`);
  if (results.data.status === 'success') {
    const feeds = results.data.feeds;
    yield put({ type: FETCH_RSS_FEEDS_SUCCESS, feeds });
  }
}

export function* deleteItem(action) {
  const id = action.id;
  const data = {
    payload: {
      status: 0,
    },
  };
  const results = yield call(putData, `/media_api/media_item/${id}`, data);
  if (results.data.result === 'success') {
    yield put({ type: DELETE_MEDIA_ITEM_SUCCESS, id });
  }
}
export function* getRSSFeedItems(action) {
  const results = yield call(getData, `/feed_api/feed/${action.feedId}`);

  if (results.data.result === 'success') {
    const rssItems = results.data.feed_items;
    yield put({ type: FETCH_RSS_ITEMS_SUCCESS, rssItems });
  }
}

export function* createRSSFeed(action) {
  const currentAccount = yield select(makeSelectCurrentAccount());
  const id = currentAccount.account_id;

  const data = {
    payload: {
      account_id: id,
      name: action.data.name,
      url: action.data.url,
    },
  };

  try {
    const results = yield call(postData, '/feed_api/feed', data);
    if (results.data.status === 'success') {
      const feed = results.data.feed;
      yield put({ type: CREATE_RSS_FEED_SUCCESS, feed });
      toastr.success('Success!', 'The RSS feed has been added');
    }
  } catch (error) {
    toastr.error('Error!', error.error);
  }
}

export function* updateMediaItem(action) {
  const { create, ...item } = action.mediaItem;
  const data = {
    payload: item,
  };
  yield put(setProcessing(true));

  const results = yield call(putData, `/media_api/media_item/${item.media_item_id}`, data);

  if (results.data.result === 'success') {
    const mediaItems = results.data.media_items;
    yield put(setProcessing(false));
    yield put({ type: UPDATE_MEDIA_ITEM_SUCCESS, mediaItems });

    if (create) {
      const postSet = {
        account_id: mediaItems[0].account_id,
        message: '',
        type: 'text',
        status: '6',
        title: '',
        media_item_ids: [mediaItems[0].media_item_id],
      };
      yield put(createPostSetRequest(postSet));
    }
  }
}

export function* createMediaItem(action) {
  const { mediaItemType, create, ...item } = action.mediaItem;
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
      if (res.data.media_items[0].status === '3') {
        yield put(setProcessing(true));
        const mediaItems = res.data.media_items;
        const id = res.data.media_items[0].media_item_id;
        yield put({ type: CREATE_MEDIA_ITEM_SUCCESS, mediaItems });
        yield put({ type: VIDEO_PROCESSING, id });
      } else {
        const mediaItems = res.data.media_items;
        yield put({ type: CREATE_MEDIA_ITEM_SUCCESS, mediaItems });
        yield put(setProcessing(false));
        if (create) {
          const postSet = {
            account_id: mediaItems[0].account_id,
            message: '',
            type: 'text',
            status: '6',
            title: '',
            media_item_ids: [mediaItems[0].media_item_id],
          };
          yield put(createPostSetRequest(postSet));
        }
      }
    }
  }
}

export function* pollData(action) {
  let processingItem = true;
  yield put({ type: SET_PROCESSING_ITEM, processingItem });
  try {
    yield call(delay, 5000);
    const id = action.id;
    const res = yield call(getData, `/media_api/media_item/${id}`);
    if (res.data.result === 'success') {
      if (res.data.media_item.status === '1') {
        processingItem = false;
        yield put(setProcessing(false));
        yield put({ type: VIDEO_PROCESSING_DONE, mediaItem: res.data.media_item });
       // yield put({ type: SET_PROCESSING_ITEM, processingItem });
      } else if (res.data.media_item.status === '3') {
        yield put({ type: VIDEO_PROCESSING, id });
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export function* showError(action) {
  toastr.error('Error!', action.error);
}

export function* getEmbedData() {
  const watcher = yield takeLatest(GET_EMBED_DATA, getEmbed);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
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

export function* searchBing() {
  const watcher = yield takeLatest(SEARCH_BING, search);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* getFeeds() {
  const watcher = yield takeLatest(FETCH_RSS_FEEDS, getRSSFeeds);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* getFeedItems() {
  const watcher = yield takeLatest(FETCH_RSS_ITEMS, getRSSFeedItems);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* createFeed() {
  const watcher = yield takeLatest(CREATE_RSS_FEED, createRSSFeed);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* watchPollData() {
  const watcher = yield takeEvery(VIDEO_PROCESSING, pollData);
  yield take(VIDEO_PROCESSING_DONE);
  yield cancel(watcher);
}

export function* deleteMediaItem() {
  const watcher = yield takeLatest(DELETE_MEDIA_ITEM, deleteItem);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* updateMedia() {
  const watcher = yield takeLatest(UPDATE_MEDIA_ITEM, updateMediaItem);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* errorWatcher() {
  yield takeLatest(MEDIA_ERROR, showError);
}

export function* fetchStreamPostSetsWorker({ id, payload }) {
  try {
    const params = serialize({ payload });
    const requestUrl = `/post_api/post_sets/${id}?${params}`;
    const { data } = yield call(getData, requestUrl);

    if (data.status === 'success') {
      const postSets = data.post_sets;
      yield put(fetchStreamPostSetsSuccess(postSets));
    } else {
      throw data.message;
    }
  } catch (error) {
    yield put(fetchStreamPostSetsFailure(error));
  }
}

export function* fetchStreamPostSetsWatcher() {
  yield takeLatest(FETCH_STREAM_POST_SETS_REQUEST, fetchStreamPostSetsWorker);
}

export function* inviteEmailToStreamSaga() {
  for (;;) {
    const { payload } = yield take(INVITE_EMAIL_TO_STREAM_REQUEST);

    let data;

    try {
      const response = yield call(postData, '/account_api/invite_email_to_stream', { payload });
      if (response.data.status !== 'success') {
        throw Error('Status Wrong!');
      }
      data = response.data;
    } catch (error) {
      yield put(inviteEmailToStreamFailure(error));
      toastr.error(error.message || 'The email does not match a premium account owner');
    }

    if (data) {
      toastr.success('Success', 'An email invitation to subscribe to this shared stream has been sent.');
      yield put(inviteEmailToStreamSuccess(data.payload));
    }
  }
}

export function* replicatePostSetSaga() {
  for (;;) {
    const { prevUrl, payload } = yield take(REPLICATE_POST_SET_REQUEST);

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
      toastr.success('Success', 'Postset has been added to the stream.');
      yield put(replicatePostSetSuccess(data.post_set));
      yield put(push({
        pathname: prevUrl,
        hash: `#postset-${data.post_set.post_set_id}`,
        state: { prevUrl: window.location.href },
      }));
    }
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
    yield put(createBlogItemSuccess(results.data));
  } else {
    yield put(createBlogItemFailure(results.data.message));
  }
}

export function* createBlogItemWatcher() {
  yield takeLatest(CREATE_BLOG_ITEM_REQUEST, createBlogItemSaga);
}

export function* mediaItemSaga() {
  const watcherB = yield fork(linkData);
  const watcherC = yield fork(mediaItem);
  const watcherD = yield fork(searchBing);
  const watcherE = yield fork(getFeeds);
  const watcherF = yield fork(getFeedItems);
  const watcherG = yield fork(createFeed);
  const watcherH = yield fork(deleteMediaItem);
  const watcherI = yield fork(watchPollData);
  const watcherJ = yield fork(updateMedia);
  const watcherK = yield fork(errorWatcher);
  const watcherL = yield fork(fetchStreamPostSetsWatcher);
  const watcherM = yield fork(inviteEmailToStreamSaga);
  const watcherN = yield fork(replicatePostSetSaga);
  const watcherO = yield fork(createBlogItemWatcher);
  const watcherP = yield fork(getEmbedData);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherB);
  yield cancel(watcherC);
  yield cancel(watcherD);
  yield cancel(watcherE);
  yield cancel(watcherF);
  yield cancel(watcherG);
  yield cancel(watcherH);
  yield cancel(watcherI);
  yield cancel(watcherJ);
  yield cancel(watcherK);
  yield cancel(watcherL);
  yield cancel(watcherM);
  yield cancel(watcherN);
  yield cancel(watcherO);
  yield cancel(watcherP);
}

export default [
  mediaItemSaga,
  collectionData,
];

const delay = (millis) => {
  const promise = new Promise((resolve) => {
    setTimeout(() => resolve(true), millis);
  });
  return promise;
};
