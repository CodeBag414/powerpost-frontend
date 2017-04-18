import { fromJS } from 'immutable';

import {
  FETCH_ACCOUNT,
} from './constants';

const initialState = fromJS({
  account: {},
});

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ACCOUNT:
      return state
        .set('account', action.account);
    default: return state;
  }
}

export default profileReducer;
