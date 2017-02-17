import { takeLatest } from 'redux-saga';
import { take, pull, call, put, fork, cancel } from 'redux-saga/effects';

import {
    FETCH_ACCOUNT
} from './constants';


export function* getAccount(action) {
    
}

export function* getAccountDataWatch() {
    yield fork(takeLatest, FETCH_ACCOUNT, getAccount);
}

export function* accountData() {
    const watcher = yield fork(getAccountDataWatch);
}

export default [
    accountData
];