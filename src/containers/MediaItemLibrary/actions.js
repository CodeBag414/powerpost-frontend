import { 
  FETCH_COLLECTIONS,
  FETCH_URL_CONTENT,
  CLEAR_URL_CONTENT,
  CREATE_MEDIA_ITEM,
} from './constants';

export function fetchCollections(accountId) {
  return {
    type: FETCH_COLLECTIONS,
    accountId,
  };
}

export function fetchUrlData(url) {
  return {
    type: FETCH_URL_CONTENT,
    url,
  };
}

export function clearUrlContent() {
  return {
    type: CLEAR_URL_CONTENT,
  };
}

export function createMediaItem(mediaItem) {
  return {
    type: CREATE_MEDIA_ITEM,
    mediaItem
  };
}