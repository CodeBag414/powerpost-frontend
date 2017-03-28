import { takeLatest, takeEvery } from 'redux-saga';
import { take, pull, call, put, fork, cancel, select } from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';
import { makeSelectCurrentAccount } from 'containers/App/selectors';

import { SET_CONNECTIONS_LIST } from '../../../../../state/constants';

import {
    FETCH_SOCIAL_URL,
    SET_SOCIAL_URLS,
    REMOVE_CONNECTION,
    CONNECTION_CALLBACK,
    TOGGLE_ADD_CONNECTION_DIALOG,
} from './constants';

import {
    getData,
    putData,
} from 'utils/request.js';

export function* getSocialUrls(action, dispatch) {
    const currentAccount = yield select(makeSelectCurrentAccount());
    console.log(currentAccount);
    const data = {
        payload: {
          account_id: currentAccount.account_id,
          callback_function: 'postMessage',
    }};
    const params = serialize(data);
    
    const requestUrl = `/connection_api/social_urls?${params}`;
    
    const result = yield call(getData, requestUrl);
    console.log(result);
    if(result.data.status == 'success') {
        const urls = result.data.urls;
        yield put({type: SET_SOCIAL_URLS, urls});
    } else {
        console.log(result);
    }
}

export function* connectChannel() {
    const watcher = yield takeLatest(FETCH_SOCIAL_URL, getSocialUrls);
    
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}

export function* setRemoveChannel(action, dispatch) {
    const connectionId = action.connectionId;
    
    const data = {
        payload: {
            status: "4"
        }
    };
    
    const requestUrl = `/connection_api/connection/${connectionId}`;
    yield call(putData, requestUrl, data);
}

export function* setConnectionCallback(action, dispatch) {
    const currentAccount = yield select(makeSelectCurrentAccount());
    const connectionData = {
        payload: {
            status: null,
            postable: false,
            account_id: currentAccount.account_id,
        }
    };
    
    const params = serialize(connectionData);
    const connectionsUrl = `/connection_api/connections?${params}`;
    const connectionsCall = yield call(getData, connectionsUrl);    
    const connections = connectionsCall.data.connections;
    const shown = false;
    
    yield put({ type: SET_CONNECTIONS_LIST, connections });
    yield put({ type: TOGGLE_ADD_CONNECTION_DIALOG, shown});
}

export function* connectChannelCallback() {
    const watcher = yield takeLatest(CONNECTION_CALLBACK, setConnectionCallback);
    
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}

export function* removeChannel() {
    const watcher = yield takeLatest(REMOVE_CONNECTION, setRemoveChannel);
    
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}

export default [
    connectChannel,
    removeChannel,
    connectChannelCallback,
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