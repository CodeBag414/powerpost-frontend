import { fromJS } from 'immutable';

import {
  /* Post sets */
  FETCH_POST_SETS_REQUEST,
  FETCH_POST_SETS_SUCCESS,
  FETCH_POST_SETS_FAILURE,

  /* Post set */
  DELETE_POST_SET_SUCCESS,
  UPDATE_POST_SET_SUCCESS,
  UPDATE_POST_SET_FAILURE,
  REMOVE_POST_SET_FROM_STREAM_SUCCESS,
  CHANGE_POST_SET_STATUS_SUCCESS,
  CHANGE_POST_SET_SORT_ORDER_SUCCESS,
  SAVE_POST_SET_SORT_ORDER_SUCCESS,
  REPLICATE_POST_SET_REQUEST,
  REPLICATE_POST_SET_SUCCESS,
  REPLICATE_POST_SET_FAILURE,
} from '../constants';

const initialState = fromJS({
  requesting: false,
  error: null,
  data: {},
});

function postSetsReducer(state = initialState, action) {
  switch (action.type) {
    /* Post sets */
    case FETCH_POST_SETS_REQUEST:
      return state.set('requesting', true);
    case FETCH_POST_SETS_SUCCESS:
      return fromJS({
        requesting: false,
        error: null,
        data: action.postSets,
      });
    case FETCH_POST_SETS_FAILURE:
      return fromJS({
        requesting: false,
        error: action.error,
        data: null,
      });

    /* Post set */
    case UPDATE_POST_SET_SUCCESS:
      return state
        .updateIn(
          ['data', 'post_sets'],
          (postSets) => postSets && postSets.map((postSet) => postSet.get('post_set_id') === action.postSet.post_set_id ? fromJS(action.postSet) : postSet),
        );
    case UPDATE_POST_SET_FAILURE:
      console.log('Update post set error! ', action.error);
    case REMOVE_POST_SET_FROM_STREAM_SUCCESS:
      return state
        .updateIn(
          ['data', 'post_sets'],
          (postSets) => postSets && postSets.filter((postSet) => postSet.get('post_set_id') !== action.id),
        );
    case DELETE_POST_SET_SUCCESS: {
      return state
        .updateIn(
          ['data', 'post_sets'],
          (postSets) => postSets && postSets.filter((postSet) => postSet.get('post_set_id') !== action.id),
        );
    }
    case CHANGE_POST_SET_STATUS_SUCCESS:
      return state
        .updateIn(['data', 'post_sets'], (postSets = fromJS([])) => postSets.map((postSet) =>
          postSet.get('post_set_id') !== action.id ? postSet : postSet.set('status', action.status),
        ));
    case CHANGE_POST_SET_SORT_ORDER_SUCCESS:
    case SAVE_POST_SET_SORT_ORDER_SUCCESS:
      return state
        .updateIn(['data', 'post_sets'], (postSets = fromJS([])) =>
          postSets.map((postSet) =>
            postSet.get('post_set_id') !== action.id ? postSet : postSet.set('sort_order', action.sortOrder),
          )
          .sort((a, b) => b.get('sort_order') - a.get('sort_order'))
        );
    case REPLICATE_POST_SET_REQUEST:
      return state.set('requesting', true);
    case REPLICATE_POST_SET_SUCCESS:
      return state
        .set('requesting', false)
        .update('data', (postSets) => postSets.push(fromJS(action.postSet)));
    case REPLICATE_POST_SET_FAILURE:
      return state.set('requesting', false);
    default:
      return state;
  }
}

export default postSetsReducer;
