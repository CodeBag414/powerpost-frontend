import { fromJS } from 'immutable';

import {
  FETCH_STATUS_COUNT_REQUEST,
  FETCH_STATUS_COUNT_SUCCESS,
  FETCH_STATUS_COUNT_FAILURE,
  FETCH_POST_SETS_REQUEST,
  FETCH_POST_SETS_SUCCESS,
  FETCH_POST_SETS_FAILURE,
} from './constants';

const initialState = fromJS({
  statusCount: {
    requesting: true,
    error: null,
    data: null,
  },
  postSets: {
    requesting: true,
    error: null,
    data: null,
  },
});

function accountDashboardReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_STATUS_COUNT_REQUEST:
      return state.set('statusCount', fromJS({
        requesting: true,
        error: null,
        data: null,
      }));
    case FETCH_STATUS_COUNT_SUCCESS:
      return state.set('statusCount', fromJS({
        requesting: false,
        error: null,
        data: action.payload,
      }));
    case FETCH_STATUS_COUNT_FAILURE:
      return state.set('statusCount', fromJS({
        requesting: false,
        error: action.erorr,
        data: null,
      }));
    case FETCH_POST_SETS_REQUEST:
      return state
        .setIn(['postSets', 'requesting'], true)
        .updateIn(['postSets'], (postSets) =>
          postSets.get('action') === action.action
            ? postSets
            : postSets.set('action', action.action).set('data', null));
    case FETCH_POST_SETS_SUCCESS:
      return state.set('postSets', fromJS({
        requesting: false,
        error: null,
        data: action.postSets,
      }));
    case FETCH_POST_SETS_FAILURE:
      return state.set('postSets', fromJS({
        requesting: false,
        error: action.error,
        data: null,
      }));
    default:
      return state;
  }
}

export default accountDashboardReducer;
