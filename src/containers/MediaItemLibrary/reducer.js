/**
 * The reducer takes care of state changes in our app through actions
 */
import { fromJS } from 'immutable';

import {
  FETCH_COLLECTIONS,
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
  SET_SEARCH_FILTER,
  SET_SORT_ORDER,
  CREATE_MEDIA_ITEM_SUCCESS,
  DELETE_MEDIA_ITEM_SUCCESS,
  VIDEO_PROCESSING_DONE,
  UPDATE_MEDIA_ITEM_SUCCESS,
  CREATE_RSS_FEED_SUCCESS,
  SET_ACTIVE_MEDIA_ITEM_ID,
  INVITE_EMAIL_TO_STREAM_REQUEST,
  INVITE_EMAIL_TO_STREAM_SUCCESS,
  INVITE_EMAIL_TO_STREAM_FAILURE,
  CREATE_BLOG_ITEM_SUCCESS,
  CLEAR_RSS_ITEMS,
  GET_EMBED_DATA_SUCCESS,
} from './constants';

// The initial application state
const initialState = fromJS({
  activeMediaItemId: false,
  detailView: false,
  addView: false,
  isFetching: true,
  error: false,
  processingItem: false,
  feeds: [],
  rssItems: [],
  searchFilter: null,
  sort: 'newest',
  urlContent: {},
  embedData: {},
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
  emailInvited: {
    processing: false,
    data: {},
    error: null,
  },
});

// Takes care of changing the application state
function mediaLibraryReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_COLLECTIONS:
      return state
        .set('isFetching', true);
    case FETCH_COLLECTIONS_SUCCESS:
      return state
        .set('collections', action.collections.data.collections)
        .set('activeCollection', action.collections.data.collections.map((coll) => (coll.parent_collection_id == null) && coll)[0]);
    case FETCH_MEDIA_ITEMS_SUCCESS:
      return state
        .set('mediaItems', action.mediaItems.data.collection.media_items.filter((t) => t.status !== '0'))
        .set('isFetching', false);
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
        .set('urlContent', {})
        .set('embedData', {});
    case GET_EMBED_DATA_SUCCESS:
      return state
        .set('embedData', action.embedData);
    case SEARCH_BING_SUCCESS:
      return state
        .set('searchResults', action.webResults);
    case CREATE_RSS_FEED_SUCCESS:
      return state
        .update('feeds', (feeds) => feeds.concat([action.feed]));
    case FETCH_RSS_FEEDS_SUCCESS:
      return state
        .set('feeds', action.feeds);
    case FETCH_RSS_ITEMS_SUCCESS:
      return state
        .set('rssItems', action.rssItems);
    case CLEAR_RSS_ITEMS:
      return state
        .set('rssItems', []);
    case SET_VISIBILITY_FILTER:
      return state
        .set('filter', action.filter);
    case SET_SORT_ORDER:
      return state
        .set('sort', action.sortOrder);
    case SET_SEARCH_FILTER:
      return state
        .set('searchFilter', action.searchFilter);
    case CREATE_MEDIA_ITEM_SUCCESS:
      return state
        .update('mediaItems', (mediaItems) => mediaItems.concat(action.mediaItems[0]));
    case VIDEO_PROCESSING_DONE:
      return state
        .set('mediaItems', updateObjectInArrayForVideo(state.get('mediaItems'), action));
    case DELETE_MEDIA_ITEM_SUCCESS:
      return state
        .set('mediaItems', state.get('mediaItems').filter((o) => o.media_item_id !== action.id));
    case UPDATE_MEDIA_ITEM_SUCCESS:
      return state
        .set('mediaItems', updateObjectInArray(state.get('mediaItems'), action));
    case SET_ACTIVE_MEDIA_ITEM_ID:
      return state
        .set('activeMediaItemId', action.id);
    case INVITE_EMAIL_TO_STREAM_REQUEST:
      return state
        .setIn(['emailInvited', 'processing'], true);
    case INVITE_EMAIL_TO_STREAM_SUCCESS:
      return state
        .setIn(['emailInvited', 'processing'], false)
        .setIn(['emailInvited', 'data'], fromJS(action.payload));
    case INVITE_EMAIL_TO_STREAM_FAILURE:
      return state
        .setIn(['emailInvited', 'processing'], false)
        .setIn(['emailInvited', 'error'], action.payload);
    case CREATE_BLOG_ITEM_SUCCESS:
      return state
        .update('mediaItems', (mediaItems) => mediaItems.concat(action.payload.media_items));
    default:
      return state;
  }
}

export default mediaLibraryReducer;

function updateObjectInArray(array, action) {
  return array.map((item) => {
    if (item.media_item_id !== action.mediaItems[0].media_item_id) {
            // This isn't the item we care about - keep it as-is
      return item;
    }

        // Otherwise, this is the one we want - return an updated value
    return {
      ...item,
      ...action.mediaItems[0],
    };
  });
}

function updateObjectInArrayForVideo(array, action) {
  return array.map((item) => {
    if (item.media_item_id !== action.mediaItem.media_item_id) {
            // This isn't the item we care about - keep it as-is
      return item;
    }

        // Otherwise, this is the one we want - return an updated value
    return {
      ...item,
      ...action.mediaItem,
    };
  });
}

/* function deleteObjectInArray(array, action) {
  return array.map((item, index) => {
    if (item.media_item_id !== action.id) {
      return item;
    }
  });
}
*/
