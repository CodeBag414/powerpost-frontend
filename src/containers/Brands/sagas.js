import { takeLatest, takeEvery } from 'redux-saga';
import { take, pull, call, put, fork, race, cancel, select } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { LOCATION_CHANGE } from 'react-router-redux';

import auth from 'utils/auth';
import { makeSelectUser } from './selectors';
import { toastr } from 'lib/react-redux-toastr';

import {
  CREATE_BRAND,
  DELETE_BRAND,
  SET_NEW_BRAND,
  SET_DELETE_BRAND,
} from './constants';

import {
    connectionCallback,
} from './actions';

import {
    postData, putData,
} from 'utils/request.js';

export function* authorize({ account_id, display_name, thumbnail_image_key }) {
  const data = {
    payload: {
      account_id,
      display_name,
      properties: {
        thumbnail_image_key,
      },
    } };
  // const params = serialize(data);

  const requestURL = '/account_api/subaccount';

  try {
    const account = yield call(postData, requestURL, data);
    console.log('create account', account);
    return;
    if (account.data.error) {
      yield put({ type: CREATE_BRAND, account });
    } else {
      yield put({ type: FETCH_ACCOUNT_SUCCESS, account });
    }
  } catch (error) {
    console.log('authorize catch error', error);
    // yield put({ type: FETCH_ACCOUNT_ERROR, error });
  }
}

// create Brand (subaccount)
export function* createBrand() {
  while (true) {
    // We always listen to `CREATE_BRAND` actions
    const request = yield take(CREATE_BRAND);
    const { account_id, display_name, thumbnail_image_key } = request.brandObject;
    const data = {
      payload: {
        account_id,
        display_name,
        properties: {
          thumbnail_image_key,
        },
      } };
    // const params = serialize(data);
    const requestUrl = '/account_api/subaccount';

    try {
      const response = yield call(postData, requestUrl, data);

      if (response.data.status === 'success') {
        toastr.success('Success!', 'A new brand has been added');
        const brand = response.data.subaccount;

        yield put({ type: SET_NEW_BRAND, brand });
      } else {
        toastr.fail('Error!', 'Something went wrong, please try again.');
      }
    } catch (error) {
      toastr.fail('Error!', 'Something went wrong, please try again.');
    }
  }
}

// delete brand (subaccount)
export function* deleteBrand() {
  while (true) {
    const request = yield take(DELETE_BRAND);
    const { account_id } = request.brandObject;
    const data = {
      payload: {
        account_id,
        status: 0,
      } };

    const requestUrl = '/account_api/account';

    try {
      const response = yield call(putData, requestUrl, data, true);

      if (response.data.status === 'success') {
        toastr.success('Success!', 'Deleted Brand');

        yield put({ type: SET_DELETE_BRAND, deleteBrandID: account_id });
      } else {
        toastr.fail('Error!', 'Something went wrong, please try again.');
        console.log('delete brand error', response);
      }
    } catch (error) {
      toastr.fail('Error!', 'Something went wrong, please try again.');
      console.log('delete brand error', error);
    }
  }
}

export default [
  createBrand,
  deleteBrand,
];

const serialize = function (obj, prefix) {
  let str = [],
    p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      let k = prefix ? `${prefix}[${p}]` : p,
        v = obj[p];
      str.push((v !== null && typeof v === 'object') ?
        serialize(v, k) :
        `${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
    }
  }
  return str.join('&');
};
