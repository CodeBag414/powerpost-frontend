/*
 * The reducer takes care of state changes in our app through actions
 */
import { fromJS } from 'immutable';

import {
  FETCH_POST_SET_REQUEST,
  FETCH_POST_SET_SUCCESS,
  FETCH_POST_SET_ERROR,
  UPDATE_POST_SET_REQUEST,
  UPDATE_POST_SET_SUCCESS,
  UPDATE_POST_SET_ERROR,
} from 'containers/App/constants';

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
  FETCH_STREAM_POST_SETS_REQUEST,
  FETCH_STREAM_POST_SETS_SUCCESS,
  FETCH_STREAM_POST_SETS_FAILURE,
  INVITE_EMAIL_TO_STREAM_REQUEST,
  INVITE_EMAIL_TO_STREAM_SUCCESS,
  INVITE_EMAIL_TO_STREAM_FAILURE,
  REPLICATE_POST_SET_REQUEST,
  REPLICATE_POST_SET_SUCCESS,
  REPLICATE_POST_SET_FAILURE,
  CREATE_BLOG_ITEM_SUCCESS,
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
  postSets: {
    isFetching: false,
    data: [],
    error: '',
  },
  postSet: {
    processing: false,
    data: {},
    error: null,
  },
  emailInvited: {
    processing: false,
    data: {},
    error: null,
  },
  postSetReplicationProcessing: false,
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
        .set('embedData', action.embedData);ß
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
    case FETCH_STREAM_POST_SETS_REQUEST:
      return state
        .setIn(['postSets', 'isFetching'], true)
        .setIn(['postSets', 'error'], '');
    case FETCH_STREAM_POST_SETS_SUCCESS:
      return state
        .setIn(['postSets', 'isFetching'], false)
        .setIn(['postSets', 'data'], fromJS(action.payload));
    case FETCH_STREAM_POST_SETS_FAILURE:
      return state
        .setIn(['postSets', 'isFetching'], false)
        .setIn(['postSets', 'error'], 'Fetching Stream Failure');
    case FETCH_POST_SET_REQUEST:
      return state
        .setIn(['postSet', 'processing'], true);
    case FETCH_POST_SET_SUCCESS:
      return state
        .setIn(['postSet', 'processing'], false)
        .setIn(['postSet', 'data'], fromJS(action.payload));
    case FETCH_POST_SET_ERROR:
      return state
        .setIn(['postSet', 'processing'], false)
        .setIn(['postSet', 'error'], action.payload);
    case UPDATE_POST_SET_REQUEST:
      return state
        .setIn(['postSet', 'processing'], true);
    case UPDATE_POST_SET_SUCCESS:
      return state
        .setIn(['postSet', 'processing'], false)
        .setIn(['postSet', 'data'], fromJS(action.payload))
        .updateIn(['postSets', 'data'], (postSets) =>
          postSets.filter((p) => p.get('post_set_id') !== action.payload.post_set_id)
        );
    case UPDATE_POST_SET_ERROR:
      return state
        .setIn(['postSet', 'processing'], false)
        .setIn(['postSet', 'error'], action.payload);
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
    case REPLICATE_POST_SET_REQUEST:
      return state.setIn(['postSets', 'isFetching'], true);
    case REPLICATE_POST_SET_SUCCESS:
      return state
        .setIn(['postSets', 'isFetching'], false)
        .updateIn(['postSets', 'data'], (postSets) => postSets.push(fromJS(action.payload)));
    case REPLICATE_POST_SET_FAILURE:
      return state.setIn(['postSets', 'isFetching'], false);
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
