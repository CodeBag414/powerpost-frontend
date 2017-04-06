import { fromJS } from 'immutable';

import {
  FETCH_SOCIAL_FEED,
  SET_SOCIAL_FEED,
} from './constants';

const initialState = fromJS({
  connectionId: '',
  feed: [],
});

function feedReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SOCIAL_FEED:
      return state
    .set('feed', []);
    case SET_SOCIAL_FEED:
      return state
    .set('feed', action.feed);
    default: return state;
  }
}

export default feedReducer;
