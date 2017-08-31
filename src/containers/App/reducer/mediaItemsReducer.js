import { Map, fromJS } from 'immutable';

import {
  FETCH_MEDIA_ITEMS_SUCCESS,
  FETCH_MEDIA_ITEMS_FAILURE,
} from '../constants';

const initialState = Map();

function mediaItemsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MEDIA_ITEMS_SUCCESS:
      return state.set('mediaItems', fromJS(action.mediaItems.data.collection.media_items.filter((t) => t.status !== '0')));
    case FETCH_MEDIA_ITEMS_FAILURE:
      return state
        .set('error', action.mediaItems.data.message);
    default:
      return state;
  }
}

export default mediaItemsReducer;
