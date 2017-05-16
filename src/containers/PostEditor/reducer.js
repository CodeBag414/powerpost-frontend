import { fromJS } from 'immutable';

import {
  FETCH_POST_SET_REQUEST,
  FETCH_POST_SET_SUCCESS,
  FETCH_POST_SET_ERROR,
} from '_common/constants';

import {
  POST_COMMENT_REQUEST,
  ADD_COMMENT,
  FETCH_COMMENTS_REQUEST,
  SET_COMMENTS,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT,
} from './constants';

const initialState = fromJS({
  comments: [],
  postSet: {
    fetching: false,
    error: null,
    data: {},
  },
  pending: false,
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
    case FETCH_COMMENTS_REQUEST:
      return state
        .set('pending', true)
        .set('comments', fromJS([]));
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
    case FETCH_POST_SET_REQUEST:
      return state
        .setIn(['postSet', 'fetching'], true);
    case FETCH_POST_SET_SUCCESS:
      return state
        .set('postSet', fromJS({
          fetching: false,
          error: null,
          data: action.payload,
        }));
    case FETCH_POST_SET_ERROR:
      return state
        .set('postSet', fromJS({
          fetching: false,
          error: action.payload,
          data: {},
        }));
    default: return state;
  }
}

export default boardReducer;
