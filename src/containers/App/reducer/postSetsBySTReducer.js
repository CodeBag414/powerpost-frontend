import { fromJS } from 'immutable';

import {
  FETCH_POST_SETS_BY_ST_REQUEST,
  FETCH_POST_SETS_BY_ST_SUCCESS,
  FETCH_POST_SETS_BY_ST_FAILURE,
  UPDATE_POST_SET_SUCCESS,
  DELETE_POST_SET_SUCCESS,
  UPDATE_BUNCH_POSTS_REQUEST,
  UPDATE_BUNCH_POSTS_SUCCESS,
} from '../constants';

const initialState = fromJS({
  requesting: false,
  error: null,
  data: {},
});

function postSetsBySTReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POST_SETS_BY_ST_REQUEST:
      return fromJS({
        requesting: true,
        error: null,
        data: null,
      });
    case FETCH_POST_SETS_BY_ST_SUCCESS:
      return fromJS({
        requesting: false,
        error: null,
        data: action.postSetsByST,
      });
    case FETCH_POST_SETS_BY_ST_FAILURE:
      return fromJS({
        requesting: false,
        error: action.error,
        data: null,
      });
    case UPDATE_POST_SET_SUCCESS:
      return state
        .updateIn(
          ['data', 'unscheduled_post_sets'],
          (postSets) => postSets && postSets.map((postSet) => postSet.get('post_set_id') === action.postSet.post_set_id ? fromJS(action.postSet) : postSet)
        )
        .updateIn(
          ['data', 'scheduled_post_sets'],
          (postSets) => postSets && postSets.map((postSet) =>
            (postSet.get('post_set_id') === action.postSet.post_set_id) ?
              fromJS({
                ...postSet.toJS(),
                ...action.postSet,
              })
            : postSet)
        )
        .updateIn(
          ['data', 'post_when_ready_post_sets'],
          (postSets) => postSets && postSets.map((postSet) => postSet.get('post_set_id') === action.postSet.post_set_id ? fromJS(action.postSet) : postSet)
        );
    case DELETE_POST_SET_SUCCESS:
      return state
        .updateIn(
          ['data', 'unscheduled_post_sets'],
          (postSets) => postSets && postSets.filter((postSet) => postSet.get('post_set_id') !== action.id)
        )
        .updateIn(
          ['data', 'scheduled_post_sets'],
          (postSets) => postSets && postSets.filter((postSet) => postSet.get('post_set_id') !== action.id)
        )
        .updateIn(
          ['data', 'post_when_ready_post_sets'],
          (postSets) => postSets && postSets.filter((postSet) => postSet.get('post_set_id') !== action.id)
        );
    case UPDATE_BUNCH_POSTS_REQUEST:
      return state
        .set('requesting', true);
    case UPDATE_BUNCH_POSTS_SUCCESS:
      return state
        .updateIn(['data', 'scheduled_post_sets'], (postSets) => {
          const index = postSets.findIndex((item) =>
            (item.get('schedule_time') === action.postSet.schedule_time) && item.get('post_set_id') === action.postSet.post_set_id);
          return postSets.set(
            index,
            fromJS({
              ...action.postSet,
              posts: action.posts,
              schedule_time: action.posts[0].schedule_time,
              status: (action.posts && action.posts.length && action.posts.every((post) => post.status === 0))
                ? '0'
                : action.postSet.status,
            }),
          );
        })
        .set('requesting', false);
    default:
      return state;
  }
}

export default postSetsBySTReducer;
