import { fromJS } from 'immutable';

import {
    SET_BRAND_FILTER,
    SET_CONNECTIONS_LIST,
    TOGGLE_ADD_CONNECTION_DIALOG,
} from './constants';

let initialState = fromJS({
    brandFilter: '',
    channelType: '',
    dialogShown: false,
    connections: [],
    socialUrls: {},
});

function brandsReducer (state = initialState, action) {
  switch (action.type) {
      case SET_BRAND_FILTER:
          return state
            .set('brandFilter', action.brandFilter);
      case SET_CONNECTIONS_LIST:
          return state
            .set('connections', action.connections);
      case TOGGLE_ADD_CONNECTION_DIALOG:
          return state
            .set('dialogShown', action.shown);
      default: return state;
  }
}

export default brandsReducer;
