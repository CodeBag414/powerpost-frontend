import {
  FETCH_POST_SET_REQUEST,
  FETCH_POST_SET_SUCCESS,
  FETCH_POST_SET_ERROR,
  UPDATE_POST_SET_REQUEST,
  UPDATE_POST_SET_SUCCESS,
  UPDATE_POST_SET_ERROR,
} from './constants';

export function fetchPostSetRequest(payload) {
  return {
    type: FETCH_POST_SET_REQUEST,
    payload,
  };
}

export function fetchPostSetSuccess(payload) {
  return {
    type: FETCH_POST_SET_SUCCESS,
    payload,
  };
}

export function fetchPostSetError(payload) {
  return {
    type: FETCH_POST_SET_ERROR,
    payload,
  };
}

export function updatePostSetRequest(payload) {
  return {
    type: UPDATE_POST_SET_REQUEST,
    payload,
  };
}

export function updatePostSetSuccess(payload) {
  return {
    type: UPDATE_POST_SET_SUCCESS,
    payload,
  };
}

export function updatePostSetError(payload) {
  return {
    type: UPDATE_POST_SET_ERROR,
    payload,
  };
}
