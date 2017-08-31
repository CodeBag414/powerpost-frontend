import {
  FETCH_PUBLIC_POST_SET_REQUEST,
  FETCH_PUBLIC_POST_SET_SUCCESS,
  FETCH_PUBLIC_POST_SET_ERROR,
} from './constants';

export function fetchPublicPostSetRequest(payload) {
  return {
    type: FETCH_PUBLIC_POST_SET_REQUEST,
    payload,
  };
}

export function fetchPublicPostSetSuccess(payload) {
  return {
    type: FETCH_PUBLIC_POST_SET_SUCCESS,
    payload,
  };
}

export function fetchPublicPostSetError(payload) {
  return {
    type: FETCH_PUBLIC_POST_SET_ERROR,
    payload,
  };
}
