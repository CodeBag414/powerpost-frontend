import { 
  FETCH_COLLECTIONS,
  FETCH_URL_CONTENT,
  CLEAR_URL_CONTENT,
  CREATE_MEDIA_ITEM,
  SEARCH_BING,
  FETCH_RSS_ITEMS,
  FETCH_RSS_FEEDS,
  CREATE_RSS_FEED,
  SET_VISIBILITY_FILTER,
  SET_SEARCH_FILTER,
  DELETE_MEDIA_ITEM,
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
    mediaItem,
  };
}

export function searchWeb(query) {
  return {
    type: SEARCH_BING,
    query,
  };
}

export function createFeed(data) {
  return {
    type: CREATE_RSS_FEED,
    data,
  }
}
export function getRSSItems(feedId) {
  return {
    type: FETCH_RSS_ITEMS,
    feedId,
  };
}

export function getFeeds(accountId) {
  return {
    type: FETCH_RSS_FEEDS,
    accountId,
  };
}

export function setVisibilityFilter(filter) {
  return {
    type: SET_VISIBILITY_FILTER,
    filter,
  };
}

export function setSearchFilter(searchFilter) {
  return {
    type: SET_SEARCH_FILTER,
    searchFilter,
  };
}

export function deleteMediaItem(id) {
  return {
    type: DELETE_MEDIA_ITEM,
    id,
  };
}
