import { fromJS } from 'immutable';

import {
  FETCH_SUBSCRIPTIONS_SUCCESS,
  FETCH_SUBSCRIPTIONS_ERROR,
} from './constants';

const initialState = fromJS({
  subscriptions: {},
});

export default function (state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case FETCH_SUBSCRIPTIONS_SUCCESS:
      return state
        .set('subscriptions', {
          details: payload,
          error: null,
        });
    case FETCH_SUBSCRIPTIONS_ERROR:
      return state
        .set('subscriptions', {
          details: null,
          error: payload,
        });
    default:
      return state;
  }
}
