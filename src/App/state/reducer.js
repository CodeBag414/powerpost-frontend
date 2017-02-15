/*
 * The reducer takes care of state changes in our app through actions
 */
 import { fromJS } from 'immutable';
import {
  CHANGE_FORM,
  SET_AUTH,
  SENDING_REQUEST,
  REQUEST_ERROR,
  CLEAR_ERROR,
  SET_ROLES,
  SET_USER,
  CHECK_USER_OBJECT,
  CLEAR_USER
} from './constants';

import auth from '../../utils/auth';

// The initial application state
let initialState = fromJS({
  formState: {
    username: '',
    password: ''
  },
  error: '',
  currentlySending: false,
  user: {},
  roles: {},
  loggedIn: auth.loggedIn()
});

// Takes care of changing the application state
function globalReducer (state = initialState, action) {
  switch (action.type) {
    case CHANGE_FORM:
      return state.set('formState', action.newFormState);
    case SET_AUTH:
      return state.set('loggedIn', action.newAuthState);
    case SET_USER:
      return state.set('user', action.user);
    case SET_ROLES:
      return state.set('roles', action.roles);
    case SENDING_REQUEST:
      return state.set('currentlySending', action.sending);
    case REQUEST_ERROR:
      return state.set('error', action.error);
    case CLEAR_ERROR:
      return state.set('error','');
    case CLEAR_USER:
      return state.set('user', {});
    default:
      return state;
  }
}

export default globalReducer;