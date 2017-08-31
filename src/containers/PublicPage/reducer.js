import { fromJS } from 'immutable';

import {
  FETCH_PUBLIC_POST_SET_REQUEST,
  FETCH_PUBLIC_POST_SET_SUCCESS,
  FETCH_PUBLIC_POST_SET_ERROR,
} from './constants';

const initialState = fromJS({
  publicPostSet: {
    isFetching: false,
    error: null,
    details: {},
  },
});

function publicPageReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PUBLIC_POST_SET_REQUEST:
      return state
        .set('publicPostSet', fromJS({
          isFetching: true,
          error: null,
          details: {},
        }));
    case FETCH_PUBLIC_POST_SET_SUCCESS:
      return state
        .set('publicPostSet', fromJS({
          isFetching: false,
          error: null,
          details: action.payload,
        }));
    case FETCH_PUBLIC_POST_SET_ERROR:
      return state
        .set('publicPostSet', fromJS({
          isFetching: false,
          error: action.payload,
          details: {},
        }));
    default:
      return state;
  }
}

export default publicPageReducer;
