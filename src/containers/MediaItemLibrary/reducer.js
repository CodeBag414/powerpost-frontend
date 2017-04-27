/*
 * The reducer takes care of state changes in our app through actions
 */
import { fromJS } from 'immutable';
import { combineReducers } from 'redux';

import {
   FETCH_COLLECTIONS_SUCCESS,
   FETCH_MEDIA_ITEMS_SUCCESS,
   FETCH_MEDIA_ITEMS_ERROR,
   MEDIA_ERROR,
   FETCH_URL_CONTENT_SUCCESS,
   CLEAR_URL_CONTENT,
   SEARCH_BING_SUCCESS,
   FETCH_RSS_FEEDS_SUCCESS,
   FETCH_RSS_ITEMS_SUCCESS,
   SET_VISIBILITY_FILTER,
   SHOW_ALL,
   SHOW_BLOGS,
   SHOW_LINKS,
   SHOW_IMAGES,
   SHOW_VIDEOS,
   SET_SEARCH_FILTER,
   CREATE_MEDIA_ITEM_SUCCESS,
   DELETE_MEDIA_ITEM_SUCCESS,
} from './constants';

// The initial application state
const initialState = fromJS({
  activeMediaItem: {},
  detailView: false,
  addView: false,
  isFetching: true,
  error: false,
  feeds: [],
  rssItems: [],
  searchFilter: null,
  urlContent: {},
  filter: SHOW_ALL,
  collections: [{}],
  activeCollection: {
    collection_id: false,
    user_id: false,
    account_id: false,
    type: false,
    status: false,
    creation_time: false,
    properties: [],
    name: false,
    title: false,
    parent_collection_id: false,
  },
  mediaItems: [],
});

// Takes care of changing the application state
function mediaLibraryReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_COLLECTIONS_SUCCESS:
      return state
        .set('collections', action.collections.data.collections)
        .set('activeCollection', action.collections.data.collections.map((coll) => (coll.parent_collection_id == null) && coll)[0]);
    case FETCH_MEDIA_ITEMS_SUCCESS:
      return state
        .set('mediaItems', action.mediaItems.data.collection.media_items.filter(t => t.status !== '0'));
    case FETCH_MEDIA_ITEMS_ERROR:
      return state
        .set('error', action.mediaItems.data.message);
    case MEDIA_ERROR:
      return state
        .set('error', action.error);
    case FETCH_URL_CONTENT_SUCCESS:
      return state
        .set('urlContent', action.urlData);
    case CLEAR_URL_CONTENT:
      return state
        .set('urlContent', {});
    case SEARCH_BING_SUCCESS:
      return state
        .set('searchResults', action.webResults);
    case FETCH_RSS_FEEDS_SUCCESS:
      return state
        .set('feeds', action.feeds);
    case FETCH_RSS_ITEMS_SUCCESS:
      return state
        .set('rssItems', action.rssItems);
    case SET_VISIBILITY_FILTER:
      return state
        .set('filter', action.filter);
    case SET_SEARCH_FILTER:
      return state
        .set('searchFilter', action.searchFilter);
    case CREATE_MEDIA_ITEM_SUCCESS:
      return state
        .update('mediaItems', mediaItems => mediaItems.concat(action.mediaItems));
    case DELETE_MEDIA_ITEM_SUCCESS:
      return state
        .set('mediaItems', state.get('mediaItems').filter(t => t.id != action.id));
    default:
      return state;
  }
}

export default mediaLibraryReducer;
