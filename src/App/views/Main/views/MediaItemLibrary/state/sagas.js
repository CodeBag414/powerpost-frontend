import { takeLatest, takeEvery } from 'redux-saga';
import { take, pull, call, put, fork, cancel, select } from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';
import { makeSelectActiveCollection } from './selectors';

import {
    getData
} from 'utils/request.js';

import {
    FETCH_COLLECTIONS,
    FETCH_COLLECTIONS_SUCCESS,
    FETCH_COLLECTIONS_ERROR,
    FETCH_MEDIA_ITEMS,
    FETCH_MEDIA_ITEMS_ERROR,
    FETCH_MEDIA_ITEMS_SUCCESS
} from './constants';


export function* getCollections(action, dispatch) {
   const accountId = action.accountId;
   
  
       //const collections = yield call(getData, requestUrl);
       //console.log(collections);
       //if(!collections.data.error) {
       //    const collectionId = collections.data.collections.find(x => x.parent_collection_id == null).collection_id;
       //    console.log(collectionId);
       //}
      // yield put({ type: FETCH_COLLECTIONS_SUCCESS, collections});
      const data = {
        payload: {
          account_id: accountId
      }};
      
      const params= serialize(data);
      const collections = yield call(getData, `/media_api/collections?${params}`);
      
      yield put({ type: FETCH_COLLECTIONS_SUCCESS, collections });
      
      const activeCollection =  yield select(makeSelectActiveCollection());
      console.log(activeCollection.collection_id);
      
      const mediaItems = yield call(getData, `/media_api/collection/${activeCollection.collection_id}`);
      if(!mediaItems.data.error) {
        yield put({ type: FETCH_MEDIA_ITEMS_SUCCESS, mediaItems });         
      } else {
        yield put({ type: FETCH_MEDIA_ITEMS_ERROR, mediaItems });
      }

      
}

export function* collectionData() {
    const watcher = yield takeLatest(FETCH_COLLECTIONS, getCollections);
    
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);    
}

export default [
    collectionData
];

const serialize = function(obj, prefix) {
  var str = [], p;
  for(p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
      str.push((v !== null && typeof v === "object") ?
        serialize(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
};