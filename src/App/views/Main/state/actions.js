import {
    FETCH_ACCOUNT,
    FETCH_ACCOUNT_SUCCESS,
    FETCH_ACCOUNT_ERROR,
    TOGGLE_MENU
} from './constants';

import {
    CHECK_USER_OBJECT,
    CHECK_CURRENT_ACCOUNT,
} from '../../../state/constants';

export function fetchCurrentAccount(account_id) {
    console.log('in fetchCurrentAccount: ' + account_id);
    return {
        type: FETCH_ACCOUNT,
        account_id
    };
}

export function toggleMenu(collapsed) {
    return {
        type: TOGGLE_MENU,
        collapsed
    };
}

export function fetchCurrentAccountSuccess(account) {
    return {
        type: FETCH_ACCOUNT_SUCCESS,
        account
    };
}

export function fetchCurrentAccountFail(error) {
    return {
        type: FETCH_ACCOUNT_ERROR,
        error
    };
}

/**
 * Checks if user object data exists in state 
 * 
 */
export function checkUser() {
  return {type: CHECK_USER_OBJECT };
}
