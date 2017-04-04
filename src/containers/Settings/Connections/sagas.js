import { takeLatest, takeEvery } from 'redux-saga';
import { take, pull, call, put, fork, cancel, select } from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';
import { makeSelectCurrentAccount } from 'containers/App/selectors';
import { toastr } from 'lib/react-redux-toastr';

import { SET_CONNECTIONS_LIST } from '../../../../../state/constants';
import { makeSelectSubCallback } from './selectors';

import {
    FETCH_SOCIAL_URL,
    SET_SOCIAL_URLS,
    REMOVE_CONNECTION,
    CONNECTION_CALLBACK,
    TOGGLE_ADD_CONNECTION_DIALOG,
    SET_SUB_CHANNEL,
    SET_SUB_CHANNELS,
    CREATE_SUB_CHANNELS,
    CLEAR_SUB_DATA,
    GET_WORDPRESS_BLOGS,
} from './constants';

import {
    getData,
    putData,
    postData,
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
    const response = yield call(putData, requestUrl, data);
    if (response.data.status === 'success') {
        toastr.success('Success!', 'Connection removed');
    } else {
        toastr.fail('Error!', 'Something went wrong, please try again.');
    }
}
export function* createSubChannels(action, dispatch) {
    const currentAccount = yield select(makeSelectCurrentAccount());
    const data = action.data;
    let apiUrl = '';
    let channelId = '';
    if (data.channel === 'facebook') {
        apiUrl = 'create_facebook_page';
        channelId = 'facebook_page_id';
    } else if (data.channel === 'pinterest') {
        apiUrl = 'create_pinterest_board';
        channelId = 'pinterest_board_id';
    } else if (data.channel === 'linkedin') {
        apiUrl = 'create_linkedin_company';
        channelId = 'linkedin_company_id';
    } else {
        apiUrl = 'create_wordpress_blog';
        channelId = 'wordpress';
    }
    const requestUrl = `/connection_api/${apiUrl}`;
    console.log(data.subChannels);
    for(let i = 0; i < data.subChannels.length; i++) {
        if (data.subChannels[i].status) {
            const apiData = {
                payload: {
                    status: 1
                }
            };
            const connectionId= data.subChannels[i].connection_id;
            const requestUrl = `/connection_api/connection/${connectionId}`;
            
            const result = yield call(putData, requestUrl, apiData);
            console.log(result);
        } else if (channelId === 'wordpress') {
            const apiData = {
                payload: {
                    account_id: currentAccount.account_id,
                    ...data.subChannels[i]
                }
            };
            
            console.log(apiData);
            const result = yield call(postData, requestUrl, apiData);
            console.log(result);
        } else {
            const apiData = {
                payload: {
                    parent_connection_id: data.subChannels[i].parent_connection_id,
                    [channelId]: data.subChannels[i].connection_uid,
                    account_id: currentAccount.account_id,
                }
            };
            
            const result = yield call(postData, requestUrl, apiData);
            console.log(result);
        }
    }
    
    const connectionData = {
        payload: {
            status: [1,3,5],
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
    yield put({ type: CLEAR_SUB_DATA });
    
    toastr.success('Success!', 'Connections added');
}
export function* getSubConnections(connection) {
    const currentAccount = yield select(makeSelectCurrentAccount());
    const data = {
        payload: {
            account_id: currentAccount.account_id,
            connection_id: connection.connection_id,
        }
    };
    
    const params = serialize(data);
    const requestUrl = `/connection_api/sub_connections?${params}`;
    const subConnectionsCall = yield call(getData, requestUrl);
    if (subConnectionsCall.data.status === 'success') {
        const subChannels = subConnectionsCall.data.sub_connections;
        yield put({ type: SET_SUB_CHANNELS, subChannels });
    }
}

export function* fetchWordpressBlogs(action, dispatch) {
    const data = action.data;
    
    const requestUrl = `/connection_api/wordpress_blogs`;
    const result = yield call(postData, requestUrl, data);
    
    if(result.data.status === 'success') {
        const subChannels = result.data.blogs;
        yield put({ type: SET_SUB_CHANNELS, subChannels});
    }
}

export function* setConnectionCallback(action, dispatch) {
    const currentAccount = yield select(makeSelectCurrentAccount());
    const subChannel = action.channelObject;
    console.log(action.channelObject);
    const sub = yield select(makeSelectSubCallback());
    if (sub) {
        yield put({ type: SET_SUB_CHANNEL, subChannel });
        yield call(getSubConnections, subChannel);
    }  else {
        const connectionData = {
            payload: {
                status: [1,3,5],
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
        
        toastr.success('Success!', 'Connection added');
    }
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

export function* watchSubChannels() {
    const watcher = yield takeLatest(CREATE_SUB_CHANNELS, createSubChannels);
    
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}

export function* watchWordpress() {
    const watcher = yield takeLatest(GET_WORDPRESS_BLOGS, fetchWordpressBlogs);
    
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}

export default [
    connectChannel,
    removeChannel,
    connectChannelCallback,
    watchSubChannels,
    watchWordpress,
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