import { fromJS } from 'immutable';

import {
    SET_BRAND_FILTER,
    SET_NEW_BRAND,
    SET_DELETE_BRAND,
} from './constants';

const initialState = fromJS({
  brandFilter: '',
  newBrand: {},
  deleteBrandID: '',
  channelType: '',
});

function brandsReducer(state = initialState, action) {
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
    default: return state;
  }
}

export default brandsReducer;
