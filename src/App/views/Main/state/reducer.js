/*
 * The reducer takes care of state changes in our app through actions
 */
import { fromJS } from 'immutable';
import {
    SET_ACTIVE_BRAND,
    FETCH_ACCOUNT,
    FETCH_ACCOUNT_SUCCESS,
    FETCH_ACCOUNT_ERROR,
    TOGGLE_MENU
} from './constants';

// The initial application state
let initialState = fromJS({
    menuCollapsed: false,
    activeBrand: {},
    isFetchingAccount: false,
    fetchingError: false
});

// Takes care of changing the application state
function dashboardReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_ACCOUNT:
        return state
            .set('isFetchingAccount', true)
            .set('fetchingError', false)
    case FETCH_ACCOUNT_SUCCESS:
        return state    
            .set('isFetching', false)
            .set('fetchingError', false)
            .set('activeBrand', action.account.data.account);
    case FETCH_ACCOUNT_ERROR:
        return state
            .set('isFetching', false)
            .set('fetchingError', action.error)
            .set('activeBrand', {});
    case TOGGLE_MENU:
        return state
            .set('menuCollapsed', action.collapsed)
    default:
      return state;
  }
}

export default dashboardReducer;