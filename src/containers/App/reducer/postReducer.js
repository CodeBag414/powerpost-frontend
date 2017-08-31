import { fromJS } from 'immutable';

import {
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  SET_POST,
  CLEAR_POST,
} from '../constants';

const initialState = fromJS({
  data: null,
  error: null,
  requesting: false,
});

function postReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_POST_REQUEST:
      return fromJS({
        data: null,
        error: null,
        requesting: true,
      });
    case CREATE_POST_SUCCESS:
      return fromJS({
        data: action.post,
        error: null,
        requesting: false,
      });
    case CREATE_POST_FAILURE:
      return fromJS({
        data: null,
        error: action.error,
        requesting: false,
      });
    case SET_POST:
      return state.set('data', fromJS(action.post));
    case CLEAR_POST:
      return state.set('data', fromJS({}));
    default:
      return state;
  }
}

export default postReducer;
