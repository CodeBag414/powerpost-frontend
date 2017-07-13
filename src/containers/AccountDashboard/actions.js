import {
  FETCH_STATUS_COUNT_REQUEST,
  FETCH_STATUS_COUNT_SUCCESS,
  FETCH_STATUS_COUNT_FAILURE,
  FETCH_POST_SETS_REQUEST,
  FETCH_POST_SETS_SUCCESS,
  FETCH_POST_SETS_FAILURE,
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

export function fetchPostSetsRequest(accountId) {
  return {
    type: FETCH_POST_SETS_REQUEST,
    accountId,
    filter: {
      sort_by: 'creation_time',
      sort_order: 'DESC',
      limit: 500,
      statuses: [2, 5],
    },
  };
}

export function fetchPostSetsSuccess(postSets) {
  return { type: FETCH_POST_SETS_SUCCESS, postSets };
}

export function fetchPostSetsFailure(error) {
  return { type: FETCH_POST_SETS_FAILURE, error };
}
