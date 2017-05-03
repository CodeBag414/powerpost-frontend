import { take, call, put } from 'redux-saga/effects';

import { toastr } from 'lib/react-redux-toastr';

import {
    postData, putData,
} from 'utils/request';

import {
  createBrandSuccess,
  createBrandFailure,
  deleteBrandSuccess,
  deleteBrandFailure,
} from './actions';

import {
  CREATE_BRAND_REQUEST,
  DELETE_BRAND_REQUEST,
} from './constants';

// create Brand (subaccount)
export function* createBrand() {
  while (true) {
    // We always listen to `CREATE_BRAND` actions
    const request = yield take(CREATE_BRAND_REQUEST);
    const { account_id, display_name, thumbnail_image_key, color } = request.brandObject;

    const data = {
      payload: {
        account_id,
        display_name,
        properties: {
          thumbnail_image_key,
          color,
        },
      },
    };

    // const params = serialize(data);
    const requestUrl = '/account_api/subaccount';

    try {
      const response = yield call(postData, requestUrl, data);
      const { data: payload } = response;

      if (response.data.status === 'success') {
        toastr.success('Success!', 'A new brand has been added');
        yield put(createBrandSuccess(payload));
      } else {
        toastr.error(response.message);
      }
    } catch (error) {
      yield put(createBrandFailure(error));
    }
  }
}

// delete brand (subaccount)

export function* deleteBrand() {
  while (true) {
    const request = yield take(DELETE_BRAND_REQUEST);
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

        yield put(deleteBrandSuccess({ deleteBrandID: account_id }));
      } else {
        toastr.error('Error!', response.data.message);
      }
    } catch (error) {
      yield put(deleteBrandFailure(error));
    }
  }
}

export default [
  createBrand,
  deleteBrand,
];
