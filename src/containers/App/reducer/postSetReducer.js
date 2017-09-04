import { fromJS } from 'immutable';

import {
  FETCH_POST_SET_REQUEST,
  FETCH_POST_SET_SUCCESS,
  FETCH_POST_SET_FAILURE,
  CREATE_POST_SET_SUCCESS,
  CREATE_POST_SET_FAILURE,
  UPDATE_POST_SET_REQUEST,
  UPDATE_POST_SET_SUCCESS,
  UPDATE_POST_SET_FAILURE,
  CREATE_BUNCH_POSTS_REQUEST,
  CREATE_BUNCH_POSTS_SUCCESS,
  ADD_POST_TO_POST_SET,
  CREATE_MEDIA_ITEM_SUCCESS,
  UPDATE_MEDIA_ITEM_SUCCESS,
  REMOVE_MEDIA_ITEM,
  SET_MEDIA_ITEM,
  VIDEO_PROCESSING_DONE,
} from '../constants';

const initialState = fromJS({
  data: null,
  editing: false,
  error: null,
  requesting: false,
  success: false,
});

function postSetReducer(state = initialState, action) {
  switch (action.type) {
    /* Post set */
    case FETCH_POST_SET_REQUEST:
      return state.set('requesting', true);
    case FETCH_POST_SET_SUCCESS:
      return state
        .set('data', fromJS(action.postSet))
        .set('error', null)
        .set('requesting', false);
    case FETCH_POST_SET_FAILURE:
      return state
        .set('data', null)
        .set('error', action.error)
        .set('requesting', false);
    case CREATE_POST_SET_SUCCESS:
      return state
        .set('data', fromJS(action.postSet))
        .set('editing', action.editing)
        .set('success', true);
    case CREATE_POST_SET_FAILURE:
      return state
        .set('data', fromJS(action.error))
        .set('editing', false)
        .set('success', false);
    case UPDATE_POST_SET_REQUEST:
      return state
        .set('requesting', true);
    case UPDATE_POST_SET_SUCCESS:
      return state
        .set('data', fromJS({
          ...action.postSet,
          user: state.getIn(['data', 'user']),
        }))
        .set('error', null)
        .set('requesting', false);
    case UPDATE_POST_SET_FAILURE:
      return state
        .set('error', fromJS(action.error))
        .set('requesting', false);

    /* Bunch posts */
    case CREATE_BUNCH_POSTS_REQUEST:
      return state
        .set('requesting', true);
    case CREATE_BUNCH_POSTS_SUCCESS:
      return state
        .set('requesting', false);
    case ADD_POST_TO_POST_SET:
      return state
        .updateIn(['data', 'posts'], (posts) => posts.push(fromJS(action.post)));

    /* Media items */
    case CREATE_MEDIA_ITEM_SUCCESS:
      return state
        .update('data', (postSetDetails) => postSetDetails.set('post_type', action.mediaItems[0].type))
        .updateIn(['data', 'media_items'], (mediaItems) => mediaItems.set(0, fromJS(action.mediaItems[0])))
        .updateIn(['data', 'media_item_ids'], (mediaItemIds) => mediaItemIds.set(0, action.mediaItems[0].media_item_id));
    case UPDATE_MEDIA_ITEM_SUCCESS:
      return state
        .update('data', (postSetDetails) => postSetDetails.set('post_type', action.mediaItems[0].type))
        .updateIn(['data', 'media_items'], (mediaItems) => mediaItems.set(0, fromJS(action.mediaItems[0])));
    case REMOVE_MEDIA_ITEM:
      return state
        .update('data', (postSetDetails) => postSetDetails.set('post_type', 'text'))
        .updateIn(['data', 'media_items'], () => fromJS([]))
        .updateIn(['data', 'media_item_ids'], () => fromJS([]));
    case SET_MEDIA_ITEM:
      return state
        .update('data', (postSetDetails) => postSetDetails.set('post_type', action.mediaItem.type))
        .updateIn(['data', 'media_items'], (mediaItems) => mediaItems.set(0, fromJS(action.mediaItem)))
        .updateIn(['data', 'media_item_ids'], (mediaItemIds) => mediaItemIds.set(0, action.mediaItem.media_item_id));
    case VIDEO_PROCESSING_DONE:
      return state
        .update('data', (postSetDetails) => postSetDetails.set('post_type', action.mediaItem.type))
        .updateIn(['data', 'media_items'], (mediaItems) => mediaItems.set(0, fromJS(action.mediaItem)))
        .updateIn(['data', 'media_item_ids'], (mediaItemIds) => mediaItemIds.set(0, action.mediaItem.media_item_id));
    default:
      return state;
  }
}

export default postSetReducer;
