import { takeLatest } from 'redux-saga';
import { take, call, put, cancel, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { 
  getData,
  postData,
  putData,
} from 'utils/request';

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
  MEDIA_ERROR,
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

export function* search(action) {
  const data = {
    payload: {
      query: action.query,
    },
  };
  
  const params = serialize(data);
  
  const result = yield call(getData, `/media_api/bing?${params}`);
  if(result.data.result === 'success') {
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
  
  const result = yield call(getData, `/media_api/url_content?${params}`);
  console.log(result);
  if (result.data.result === 'success') {
    const urlData = result.data.url_data[0];
    yield put({ type: FETCH_URL_CONTENT_SUCCESS, urlData });
  } else {
    yield put({ type: MEDIA_ERROR, error: 'Error getting url content' });
  }
}

export function* getRSSFeeds(action) {

  const id = action.accountId;
  const data = {
    payload: {
      account_id: id,
    },
  };
  
  const params = serialize(data);
  console.log('fetch RSS FEEDS');
  const results = yield call(getData, `/feed_api/feeds?${params}`);
  console.log(results);
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
  console.log(results);
  if(results.data.result === 'success') {
    yield put({ type: DELETE_MEDIA_ITEM_SUCCESS, id});
  }
}
export function* getRSSFeedItems(action) {
  const results = yield call(getData, `/feed_api/feed/${action.feedId}`);
  console.log(results);
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
  
  const results = yield call(postData, '/feed_api/feed', data);
  console.log(results);
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
  } else if (mediaItemType === 'file') {
    url = '/media_api/files';
    data = {
      payload: {
        media_items:item,
      }
    };
  }
  
  if (url !== '') {
    console.log('send api');
    console.log(data);
    const res = yield call(postData, url, data);
    if (res.data.result === 'success') {
      const mediaItems = res.data.media_items;
      yield put({ type: CREATE_MEDIA_ITEM_SUCCESS, mediaItems }) 
    }
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

export function* deleteMediaItem() {
  const watcher = yield takeLatest(DELETE_MEDIA_ITEM, deleteItem);
  
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
export default [
  collectionData,
  linkData,
  mediaItem,
  searchBing,
  getFeeds,
  getFeedItems,
  createFeed,
  deleteMediaItem,
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
