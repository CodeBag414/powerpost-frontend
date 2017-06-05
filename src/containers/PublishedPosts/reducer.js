import { fromJS } from 'immutable';
import _ from 'lodash';

import {
  SET_POST_SETS,
} from './constants';

const initialState = fromJS({
  postSets: [],
  postSet: {},
});

function publishedPostsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_POST_SETS:
      return state
        .set('postSets', fromJS(_.orderBy(action.postSets, ['creation_time'], ['desc']).slice(0, 50)));
    default: return state;
  }
}

export default publishedPostsReducer;
