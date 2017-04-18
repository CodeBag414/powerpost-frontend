import {
  FETCH_ACCOUNT,
  UPDATE_ACCOUNT,
} from './constants';

export function fetchAccount(accountID) {
  return { type: FETCH_ACCOUNT, accountID };
}

export function updateAccount(data) {
  return { type: UPDATE_ACCOUNT, data };
}
