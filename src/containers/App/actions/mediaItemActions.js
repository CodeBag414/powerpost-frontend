import {
  FETCH_MEDIA_ITEMS_REQUEST,
  FETCH_MEDIA_ITEMS_SUCCESS,
  FETCH_MEDIA_ITEMS_ERROR,
} from '../constants';

export function fetchMediaItems(accountId) {
  return { type: FETCH_MEDIA_ITEMS_REQUEST, accountId };
}
export function fetchMediaItemsSuccess(mediaItems) {
  return { type: FETCH_MEDIA_ITEMS_SUCCESS, mediaItems };
}
export function fetchMediaItemsFailure(error) {
  return { type: FETCH_MEDIA_ITEMS_ERROR, error };
}
