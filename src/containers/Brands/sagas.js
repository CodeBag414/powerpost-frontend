import { takeLatest, takeEvery } from 'redux-saga';
import { take, pull, call, put, fork, race, cancel, select } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import {LOCATION_CHANGE} from 'react-router-redux';

import auth from 'utils/auth';
import { makeSelectUser } from './selectors';
import { toastr } from 'lib/react-redux-toastr';

import {
  CREATE_BRAND,
} from './constants';

import {
    connectionCallback,
} from './actions';

import {
    postData
} from 'utils/request.js';

export function* authorize({ account_id, display_name, thumbnail_image_key }) {
  // We send an action that tells Redux we're sending a request
  // yield put({ type: SENDING_REQUEST, sending: true });
  // We then try to register or log in the user, depending on the request
  const data = {
    payload: {
      account_id: account_id,
      display_name: display_name,
      properties: {
        thumbnail_image_key: thumbnail_image_key
      }
  }};
  const params = serialize(data);
  console.log('params', params)
  const requestURL = `/account_api/subaccount`;
  try {
    
    const account = yield call(postData, requestURL, true, data);
    console.log('create account', account)
    return
    if (account.data.error) {
      yield put({ type: CREATE_BRAND, account });
    } else {
      yield put({ type: FETCH_ACCOUNT_SUCCESS, account });
    }
  } catch (error) {
    yield put({ type: FETCH_ACCOUNT_ERROR, error });
  }
  
}

export function* registerFlow() {
  while (true) {
    // We always listen to `CREATE_BRAND` actions
    const request = yield take(CREATE_BRAND);
    const { account_id, display_name, thumbnail_image_key } = request.brandObject;
    // We call the `authorize` task with the data, telling it that we are registering a user
    // This returns `true` if the registering was successful, `false` if not
    const wasSuccessful = yield call(authorize, { account_id, display_name, thumbnail_image_key });
    console.log('registerFlow', wasSuccessful)
    return;
    // If we could register a user, we send the appropiate actions
    if (wasSuccessful) {
      yield put({ type: SET_AUTH, newAuthState: true }); // User is logged in (authorized) after being registered
      yield put({ type: CHANGE_FORM, newFormState: { name: '', password: '' } }); // Clear form
      forwardTo('/dashboard'); // Go to dashboard page
    }
  }
}

export default [
    registerFlow
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