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
  POST_COMMENT_REQUEST,
  ADD_COMMENT,
  FETCH_COMMENTS_REQUEST,
  SET_COMMENTS,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT,
  FETCH_ACCOUNT_TAGS_REQUEST,
  SET_ACCOUNT_TAGS,
} from './constants';

const initialState = fromJS({
  comments: [],
  postSet: {
    isFetching: false,
    error: null,
    details: {},
  },
  accountTags: {
    isFetching: false,
    error: null,
    data: [],
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
        .set('postSet', fromJS({
          [`${action.section}-fetching`]: true,
          [`${action.section}-error`]: null,
          isFetching: true,
          error: null,
          details: {},
        }));
    case FETCH_POST_SET_SUCCESS:
      return state
        .set('postSet', fromJS({
          [`${action.section}-fetching`]: false,
          [`${action.section}-error`]: null,
          isFetching: false,
          error: null,
          details: action.payload,
        }));
    case FETCH_POST_SET_ERROR:
      return state
        .set('postSet', fromJS({
          [`${action.section}-fetching`]: false,
          [`${action.section}-error`]: action.payload,
          isFetching: false,
          error: action.payload,
          details: {},
        }));
    case UPDATE_POST_SET_REQUEST:
      return state
        .setIn(['postSet', 'isFetching'], true);
    case UPDATE_POST_SET_SUCCESS:
      return state
        .set('postSet', fromJS({
          isFetching: false,
          error: null,
          details: action.payload,
        }));
    case UPDATE_POST_SET_ERROR:
      return state
        .set('postSet', fromJS({
          isFetching: false,
          error: action.payload,
          details: {},
        }));
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
    default: return state;
  }
}

export default boardReducer;
