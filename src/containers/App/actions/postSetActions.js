import {
  /* Post sets */
  FETCH_POST_SETS_REQUEST,
  FETCH_POST_SETS_SUCCESS,
  FETCH_POST_SETS_FAILURE,
  FETCH_POST_SETS_BY_ST_REQUEST,
  FETCH_POST_SETS_BY_ST_SUCCESS,
  FETCH_POST_SETS_BY_ST_FAILURE,

  /* Post set */
  FETCH_POST_SET_REQUEST,
  FETCH_POST_SET_SUCCESS,
  FETCH_POST_SET_ERROR,
  UPDATE_POST_SET_REQUEST,
  UPDATE_POST_SET_SUCCESS,
  UPDATE_POST_SET_FAILURE,
  CREATE_POST_SET_REQUEST,
  CREATE_POST_SET_SUCCESS,
  CREATE_POST_SET_FAILURE,
  DELETE_POST_SET_REQUEST,
  DELETE_POST_SET_SUCCESS,
  DELETE_POST_SET_FAILURE,
  CHANGE_POST_SET_STATUS_REQUEST,
  CHANGE_POST_SET_STATUS_SUCCESS,
  CHANGE_POST_SET_SORT_ORDER_REQUEST,
  CHANGE_POST_SET_SORT_ORDER_SUCCESS,
  SAVE_POST_SET_SORT_ORDER_REQUEST,
  SAVE_POST_SET_SORT_ORDER_SUCCESS,
  REPLICATE_POST_SET_REQUEST,
  REPLICATE_POST_SET_SUCCESS,
  REPLICATE_POST_SET_FAILURE,
} from '../constants';

/* Post sets */

export function fetchPostSetsRequest(accountId, payload) {
  return {
    type: FETCH_POST_SETS_REQUEST,
    accountId,
    filter: {
      sort_by: 'creation_time',
      sort_order: 'DESC',
      limit: 500,
      statuses: [1, 2, 3, 4, 5, 6],
      ...payload,
    },
  };
}
export function fetchPostSetsBySORequest(accountId) {
  return {
    type: FETCH_POST_SETS_REQUEST,
    accountId,
    filter: {
      sort_by: 'sort_order',
      sort_order: 'DESC',
      limit: 500,
    },
  };
}
export function fetchPostSetsSuccess(postSets) {
  return { type: FETCH_POST_SETS_SUCCESS, postSets };
}
export function fetchPostSetsFailure(error) {
  return { type: FETCH_POST_SETS_FAILURE, error };
}

export function fetchPostSetsBySTRequest(accountId, payload) {
  return {
    type: FETCH_POST_SETS_BY_ST_REQUEST,
    accountId,
    filter: {
      limit: 500,
      ...payload,
    },
  };
}
export function fetchPostSetsBySTSuccess(postSetsByST) {
  return { type: FETCH_POST_SETS_BY_ST_SUCCESS, postSetsByST };
}
export function fetchPostSetsBySTFailure(error) {
  return { type: FETCH_POST_SETS_BY_ST_FAILURE, error };
}

/* Post set */

export function fetchPostSetRequest(payload) {
  return {
    type: FETCH_POST_SET_REQUEST,
    payload,
  };
}
export function fetchPostSetSuccess(postSet) {
  return {
    type: FETCH_POST_SET_SUCCESS,
    postSet,
  };
}
export function fetchPostSetError(error) {
  return {
    type: FETCH_POST_SET_ERROR,
    error,
  };
}

export function createPostSetRequest(postSet, editing = true) {
  return { type: CREATE_POST_SET_REQUEST, postSet, editing };
}
export function createPostSetSuccess(postSet, editing) {
  return { type: CREATE_POST_SET_SUCCESS, postSet, editing };
}
export function createPostSetFailure(error) {
  return { type: CREATE_POST_SET_FAILURE, error };
}

export function updatePostSetRequest(payload) {
  return {
    type: UPDATE_POST_SET_REQUEST,
    payload,
  };
}
export function updatePostSetSuccess(postSet) {
  return {
    type: UPDATE_POST_SET_SUCCESS,
    postSet,
  };
}
export function updatePostSetFailure(error) {
  return {
    type: UPDATE_POST_SET_FAILURE,
    error,
  };
}

export function deletePostSetRequest(id) {
  return { type: DELETE_POST_SET_REQUEST, id };
}
export function deletePostSetSuccess(id) {
  return { type: DELETE_POST_SET_SUCCESS, id };
}
export function deletePostSetFailure(error) {
  return { type: DELETE_POST_SET_FAILURE, error };
}

export function changePostSetStatusRequest(id, status) {
  return { type: CHANGE_POST_SET_STATUS_REQUEST, id, status };
}
export function changePostSetStatusSuccess(id, status) {
  return { type: CHANGE_POST_SET_STATUS_SUCCESS, id, status };
}

export function changePostSetSortOrderRequest(id, afterId) {
  return { type: CHANGE_POST_SET_SORT_ORDER_REQUEST, id, afterId };
}
export function changePostSetSortOrderSuccess(id, sortOrder) {
  return { type: CHANGE_POST_SET_SORT_ORDER_SUCCESS, id, sortOrder };
}

export function savePostSetSortOrderRequest(id, sortOrder) {
  return { type: SAVE_POST_SET_SORT_ORDER_REQUEST, id, sortOrder };
}
export function savePostSetSortOrderSuccess(id, sortOrder) {
  return { type: SAVE_POST_SET_SORT_ORDER_SUCCESS, id, sortOrder };
}

export function replicatePostSetRequest(prevUrl, payload) {
  return {
    type: REPLICATE_POST_SET_REQUEST,
    prevUrl,
    payload,
  };
}
export function replicatePostSetSuccess(postSet) {
  return {
    type: REPLICATE_POST_SET_SUCCESS,
    postSet,
  };
}
export function replicatePostSetFailure(error) {
  return {
    type: REPLICATE_POST_SET_FAILURE,
    error,
  };
}
