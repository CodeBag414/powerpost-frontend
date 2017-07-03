import {
  FETCH_STATUS_COUNT_REQUEST,
  FETCH_STATUS_COUNT_SUCCESS,
  FETCH_STATUS_COUNT_FAILURE,
} from './constants';

export function fetchStatusCountRequest(id) {
  return {
    type: FETCH_STATUS_COUNT_REQUEST,
    id,
  };
}

export function fetchStatusCountSuccess(payload) {
  return {
    type: FETCH_STATUS_COUNT_SUCCESS,
    payload,
  };
}

export function fetchStatusCountFailure(error) {
  return {
    type: FETCH_STATUS_COUNT_FAILURE,
    error,
  };
}
