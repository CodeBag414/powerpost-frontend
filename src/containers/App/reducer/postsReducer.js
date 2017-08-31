import { fromJS } from 'immutable';

import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
} from '../constants';

const initialState = fromJS({
  requesting: false,
  error: null,
  data: {},
});

function postsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return fromJS({
        requesting: true,
        error: null,
        data: null,
      });
    case FETCH_POSTS_SUCCESS:
      return fromJS({
        requesting: true,
        error: null,
        data: action.posts,
      });
    case FETCH_POSTS_FAILURE:
      return fromJS({
        requesting: false,
        error: action.error,
        data: null,
      });
    default:
      return state;
  }
}

export default postsReducer;
