import { takeLatest } from 'redux-saga';
import { take, pull, call, put, fork, cancel, select } from 'redux-saga/effects';
import { makeSelectUserAccount } from '../../../state/selectors';
import { makeSelectCurrentAccount } from './selectors';
import {LOCATION_CHANGE} from 'react-router-redux';

import {
    FETCH_ACCOUNT,
    FETCH_ACCOUNT_SUCCESS,
    FETCH_ACCOUNT_ERROR,
} from './constants';
 import {
     CHECK_CURRENT_ACCOUNT
 } from '../../../state/constants';
 
import {
    getData
} from 'utils/request.js';


export function* getAccount(action, dispatch) {
    console.log('in saga getAccount: ' + action.action_id);
    let accountId = action.account_id;
    if(!action.account_id) {
        accountId = 'me';
        console.log('IN select user account!');
    }
    let currentAccount = yield select(makeSelectCurrentAccount());
    console.log('accountId: ' + accountId + ' | makeselectcurrentaccount: ' + currentAccount.account_id);
    if((accountId === 'me' && currentAccount.account_id) || accountId === currentAccount.account_id) {
        console.log('not getting new account');
        return;
    } else {
        const requestURL = `/account_api/account/${accountId}`;
        try {
            const account = yield call(getData, requestURL);
            yield put({ type: FETCH_ACCOUNT_SUCCESS, account});
        } catch(error) {
            yield put({ type: FETCH_ACCOUNT_ERROR, error});
        }
    }
}

export function* getAccountDataWatch() {
    yield fork(takeLatest, FETCH_ACCOUNT, getAccount);
}

export function* accountData() {
    const watcher = yield fork(getAccountDataWatch);
    
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}

export default [
    accountData
];