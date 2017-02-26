import { fromJS } from 'immutable';

import {
    TOGGLE_ADD_CONNECTION_DIALOG
} from './constants';

let initialState = fromJS({
    dialogShown: false
});

function connectionsReducer (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_ADD_CONNECTION_DIALOG:
        return state
            .set('dialogShown', action.shown);
    default:
      return state;
  }
}

export default connectionsReducer;
