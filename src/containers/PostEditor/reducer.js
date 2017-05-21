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
  ADD_POST_TO_POSTSET,
  SUBMIT_BUNCH_POSTS_REQUEST,
  SUBMIT_BUNCH_POSTS_SUCCESS,
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
          isFetching: true,
          error: null,
          details: {},
        }));
    case FETCH_POST_SET_SUCCESS:
      return state
        .set('postSet', fromJS({
          isFetching: false,
          error: null,
          details: action.payload,
        }));
    case FETCH_POST_SET_ERROR:
      return state
        .set('postSet', fromJS({
          isFetching: false,
          error: action.payload,
          details: {},
        }));
    case UPDATE_POST_SET_REQUEST:
      return state
        .setIn(['postSet', `${action.section}-fetching`], true)
        .setIn(['postSet', `${action.section}-error`], null)
        .setIn(['postSet', 'isFetching'], true)
        .setIn(['postSet', 'error'], null);
    case UPDATE_POST_SET_SUCCESS:
      return state
        .setIn(['postSet', `${action.section}-fetching`], false)
        .setIn(['postSet', 'isFetching'], false)
        .setIn(['postSet', 'details'], fromJS(action.payload));
    case UPDATE_POST_SET_ERROR:
      return state
        .setIn(['postSet', `${action.section}-fetching`], false)
        .setIn(['postSet', `${action.section}-error`], fromJS(action.payload))
        .setIn(['postSet', 'error'], fromJS(action.payload));
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
    case SUBMIT_BUNCH_POSTS_REQUEST:
      return state
        .setIn(['postSet', 'bunch_post_fetching'], true);
    case SUBMIT_BUNCH_POSTS_SUCCESS:
      return state
        .setIn(['postSet', 'bunch_post_fetching'], false);
    case ADD_POST_TO_POSTSET:
      return state
        .updateIn(['postSet', 'details', 'posts'], (posts) => posts.push(fromJS(action.post)));
    default: return state;
  }
}

export default boardReducer;
