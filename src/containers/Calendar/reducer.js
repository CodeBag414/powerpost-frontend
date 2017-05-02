import { fromJS } from 'immutable';

import {
  FETCH_POSTS,
  SET_POSTS,
} from './constants';

const initialState = fromJS({
  posts: [],
});

function calendarReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return state.set('posts', []);
    case SET_POSTS:
      return state.set('posts', action.posts);
    default: return state;
  }
}

export default calendarReducer;
