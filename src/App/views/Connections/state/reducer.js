import { fromJS } from 'immutable';

import {
    SET_CHANNEL_FILTER,
    SET_CONNECTIONS_LIST,
    TOGGLE_ADD_CONNECTION_DIALOG
} from './constants';

let initialState = fromJS({
    channelFilter: '',
    dialogShown: false,
    connections: []
});

function connectionsReducer (state = initialState, action) {
  switch (action.type) {
      case SET_CHANNEL_FILTER:
          return state
              .set('channelFilter', action.channelFilter);
      case SET_CONNECTIONS_LIST:
          return state
              .set('connections', action.connections);
      case TOGGLE_ADD_CONNECTION_DIALOG:
          return state
              .set('dialogShown', action.shown);
    default:
      return state;
  }
}

export default connectionsReducer;
