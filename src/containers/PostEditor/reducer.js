import { fromJS } from 'immutable';
import _ from 'lodash';

import {
  CREATE_MEDIA_ITEM_SUCCESS,
  CREATE_MEDIA_ITEM_ERROR,
  VIDEO_PROCESSING_DONE,
} from 'containers/App/constants';

// TODO: Move all media item related stuff to app redux
import {
  POST_COMMENT_REQUEST,
  ADD_COMMENT,
  FETCH_COMMENTS_REQUEST,
  SET_COMMENTS,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT,
  FETCH_ACCOUNT_TAGS_REQUEST,
  SET_ACCOUNT_TAGS,
  FETCH_COLLECTIONS_SUCCESS,
  FETCH_MEDIA_ITEMS_ERROR,
  FETCH_MEDIA_ITEMS_SUCCESS,
  FETCH_URL_CONTENT_SUCCESS,
  PROCESS_ITEM,
  PROCESS_ITEM_SUCCESS,
  SET_VISIBILITY_FILTER,
  SHOW_ALL,
  FETCH_WORDPRESS_GUI_REQUEST,
  FETCH_WORDPRESS_GUI_SUCCESS,
  FETCH_WORDPRESS_GUI_FAILURE,
  CLEAR_MEDIA_ITEM,
  GET_MEDIA_ITEM_SUCCESS,
  CLEAR_URL_CONTENT,
  FETCH_FACEBOOK_ENTITIES_SUCCESS,
  GET_EMBED_DATA_SUCCESS,
} from './constants';

const initialState = fromJS({
  comments: [],
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
  urlContent: {},
  embedData: {},
  isProcessing: false,
  accountTags: {
    isFetching: false,
    error: null,
    data: [],
  },
  pending: false,
  filter: SHOW_ALL,
  wordpressGUI: {
    isFetching: false,
    error: null,
    data: {},
  },
  newMediaItem: {},
  facebookEntities: {},
});

function boardReducer(state = initialState, action) {
  switch (action.type) {
    case POST_COMMENT_REQUEST:
      return state
        .set('pending', true);
    case ADD_COMMENT:
      return state
        .set('pending', false)
        .updateIn(['comments'], (comments) => comments.push(fromJS(action.comment)));
    case GET_EMBED_DATA_SUCCESS:
      return state
        .set('embedData', action.embedData);
    case FETCH_COMMENTS_REQUEST:
      return state
        .set('pending', true)
        .set('comments', fromJS([]));
    case SET_VISIBILITY_FILTER:
      return state
        .set('filter', action.filter);
    case SET_COMMENTS:
      return state
        .set('pending', false)
        .set('comments', fromJS(action.comments));
    case DELETE_COMMENT_REQUEST:
      return state
        .set('pending', true);
    case DELETE_COMMENT:
      return state
        .set('pending', false)
        .updateIn(['comments'], (comments) => comments.filter((comment) => comment.get('comment_id') !== action.commentId));
    case CLEAR_URL_CONTENT:
      return state
        .set('urlContent', {});
    case FETCH_ACCOUNT_TAGS_REQUEST:
      return state
        .set('accountTags', fromJS({
          isFetching: true,
          error: null,
          data: [],
        }));
    case SET_ACCOUNT_TAGS:
      return state
        .set('accountTags', fromJS({
          isFetching: false,
          error: null,
          data: action.accountTags,
        }));
    case CREATE_MEDIA_ITEM_SUCCESS:
      return state
        .set('newMediaItem', fromJS(action.mediaItems[0]));
    case VIDEO_PROCESSING_DONE:
      return state
        .set('newMediaItem', fromJS(action.mediaItem));
    case CREATE_MEDIA_ITEM_ERROR:
    case CLEAR_MEDIA_ITEM:
      return state
        .set('newMediaItem', fromJS({}));
    case GET_MEDIA_ITEM_SUCCESS:
      return state.set('newMediaItem', fromJS(action.mediaItem[0]));
    case FETCH_URL_CONTENT_SUCCESS:
      return state
        .set('urlContent', action.urlData);
    case FETCH_COLLECTIONS_SUCCESS:
      return state
        .set('collections', _.get(action, 'collections.data.collections', []))
        .set('activeCollection', _.get(action, 'collections.data.collections', []).map((coll) => (coll.parent_collection_id == null) && coll)[0]);
    case FETCH_MEDIA_ITEMS_SUCCESS:
      return state
        .set('mediaItems', _.get(action, 'mediaItems.data.collection.media_items', []).filter((t) => t.status !== '0'));
    case FETCH_MEDIA_ITEMS_ERROR:
      return state
        .set('error', action.mediaItems.data.message);
    case PROCESS_ITEM:
      return state
        .set('isProcessing', true);
    case PROCESS_ITEM_SUCCESS:
      return state
        .set('isProcessing', false);
    case FETCH_WORDPRESS_GUI_REQUEST:
      return state
        .setIn(['wordpressGUI', 'isFetching'], true);
    case FETCH_WORDPRESS_GUI_SUCCESS:
      return state
        .setIn(['wordpressGUI', 'isFetching'], false)
        .setIn(['wordpressGUI', 'data'], fromJS(action.payload))
        .setIn(['wordpressGUI', 'error'], null);
    case FETCH_WORDPRESS_GUI_FAILURE:
      return state
        .setIn(['wordpressGUI', 'isFetching'], false)
        .setIn(['wordpressGUI', 'error'], fromJS(action.payload));
    case FETCH_FACEBOOK_ENTITIES_SUCCESS:
      return state.set('facebookEntities', fromJS(action.entities));
    default: return state;
  }
}

export default boardReducer;
