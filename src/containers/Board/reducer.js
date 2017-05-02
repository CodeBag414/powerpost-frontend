import { fromJS } from 'immutable';

import {
  SET_POST_SETS,
  DELETE_POST_SET,
} from './constants';

const initialState = fromJS({
  postSets: [],
});

function boardReducer(state = initialState, action) {
  switch (action.type) {
    case SET_POST_SETS:
      return state
        .set('postSets', fromJS(action.postSets));
    case DELETE_POST_SET:
      return state
        .updateIn(['postSets'], postSets => postSets.filter((postSet => postSet.get('post_set_id') !== action.id)));
    default: return state;
  }
}

export default boardReducer;
