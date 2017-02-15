/**
 * Combine all reducers in this file and export the combined reducers
 *
 */

 import { fromJS } from 'immutable';
 import { combineReducers } from 'redux-immutable';
 import { LOCATION_CHANGE } from 'react-router-redux';
  import globalReducer from '../App/state/reducer';
 /**
  * routeReducer
  *
  * the reducer merges route location changes into our immutable state.
  *
  */

  // initial routing state
  const routeInitialState = fromJS({
      locationBeforeTransition: null,
  });

  // merge route into the global application state
  function routeReducer(state = routeInitialState, action) {
      switch(action.type) {
        case LOCATION_CHANGE:
            return state.merge({
                locationBeforeTransition: action.payload,
            });
        default:
            return state;
      }
  }
  
  /**
   * Create the main reducer with async loaded ones
   * 
   */
  export default function createReducer(asyncReducers) {
      return combineReducers({
          routing: routeReducer,
          auth: globalReducer,
          ...asyncReducers
      });
  }