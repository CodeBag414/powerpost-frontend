import { takeLatest, takeEvery } from 'redux-saga';
import { take, pull, call, put, fork, cancel, select } from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';

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
   const requestUrl = `/media_api/collections/${accountId}`;
   
  
       //const collections = yield call(getData, requestUrl);
       //console.log(collections);
       //if(!collections.data.error) {
       //    const collectionId = collections.data.collections.find(x => x.parent_collection_id == null).collection_id;
       //    console.log(collectionId);
       //}
      // yield put({ type: FETCH_COLLECTIONS_SUCCESS, collections});
      
      const collection = yield call(getData, requestUrl);
      console.log(collection);
}

export function* collectionData() {
    const watcher = yield takeLatest(FETCH_COLLECTIONS, getCollections);
    
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);    
}

export default [
    collectionData
];