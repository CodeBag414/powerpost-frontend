import { fromJS } from 'immutable';

import {
    TOGGLE_ADD_BRAND_DIALOG,
} from './constants';

let initialState = fromJS({
    dialogShown: false,
});

function brandsReducer (state = initialState, action) {
  console.log('add reducer', dialogShown)
  switch (action.type) {
      case TOGGLE_ADD_BRAND_DIALOG:
          return state
            .set('dialogShown', action.dialogShown);
      default: return state;
  }
}

export default brandsReducer;
