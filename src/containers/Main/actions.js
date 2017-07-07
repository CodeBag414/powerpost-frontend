import {
    CHECK_USER_OBJECT,
    // CHECK_CURRENT_ACCOUNT,
} from 'containers/App/constants';

import {
    FETCH_ACCOUNT,
    FETCH_ACCOUNT_SUCCESS,
    FETCH_ACCOUNT_ERROR,
    TOGGLE_MENU,
    FETCH_CONNECTIONS,
    SET_CONNECTIONS,
    SET_PROCESSING,
} from './constants';

export function fetchCurrentAccount(accountId) {
  return {
    type: FETCH_ACCOUNT,
    accountId,
  };
}

export function toggleMenu(collapsed) {
  return {
    type: TOGGLE_MENU,
    collapsed,
  };
}

export function fetchCurrentAccountSuccess(account) {
  return {
    type: FETCH_ACCOUNT_SUCCESS,
    account,
  };
}

export function fetchCurrentAccountFail(error) {
  return {
    type: FETCH_ACCOUNT_ERROR,
    error,
  };
}

export function fetchConnections(accountId) {
  return {
    type: FETCH_CONNECTIONS,
    accountId,
  };
}

export function setConnections(connections) {
  return {
    type: SET_CONNECTIONS,
    connections,
  };
}

export function setProcessing(processing) {
  return {
    type: SET_PROCESSING,
    processing,
  };
}

/**
 * Checks if user object data exists in state
 *
 */
export function checkUser() {
  return { type: CHECK_USER_OBJECT };
}
