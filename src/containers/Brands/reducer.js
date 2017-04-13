import { fromJS } from 'immutable';

import {
    SET_BRAND_FILTER,
    SET_NEW_BRAND,
    SET_DELETE_BRAND,
    TOGGLE_ADD_CONNECTION_DIALOG,
} from './constants';

let initialState = fromJS({
    brandFilter: '',
    newBrand: {},
    deleteBrandID: '',
    channelType: '',
    dialogShown: false,
});

function brandsReducer (state = initialState, action) {
  switch (action.type) {
      case SET_BRAND_FILTER:
          return state
            .set('brandFilter', action.brandFilter);
      case SET_NEW_BRAND:
          return state
            .set('newBrand', action.brand);
      case SET_DELETE_BRAND:
          return state
            .set('deleteBrandID', action.deleteBrandID);
      case TOGGLE_ADD_CONNECTION_DIALOG:
          return state
            .set('dialogShown', action.shown);
      default: return state;
  }
}

export default brandsReducer;
