/*
 * The reducer takes care of state changes in our app through actions
 */
import { fromJS } from 'immutable';
import {
  SET_AUTH,
  SENDING_REQUEST,
  REQUEST_ERROR,
  CLEAR_ERROR,
  SET_ROLES,
  SET_USER,
  // CHECK_USER_OBJECT,
  CLEAR_USER,
  CREATE_PAYMENT_SOURCE,
  CREATE_PAYMENT_SOURCE_SUCCESS,
  CREATE_PAYMENT_SOURCE_ERROR,
  APPLY_COUPON_SUCCESS,
  APPLY_COUPON_ERROR,
  POST_SUBSCRIPTION,
  POST_SUBSCRIPTION_SUCCESS,
  POST_SUBSCRIPTION_ERROR,
  FETCH_CURRENT_PLAN,
  FETCH_CURRENT_PLAN_SUCCESS,
  FETCH_CURRENT_PLAN_ERROR,
} from './constants';

import auth from 'utils/auth';

// The initial application state
const initialState = fromJS({
  error: '',
  currentlySending: false,
  user: {},
  sharedAccounts: [],
  userAccount: {},
  subAccounts: [],
  loggedIn: auth.loggedIn(),
  filePickerKey: 'A6Upb4pDFTFu9uXIjmV8Oz',
  paymentSource: {},
  coupon: {},
  subscription: {},
  currentPlan: {},
});

// Takes care of changing the application state
function globalReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH:
      return state.set('loggedIn', action.newAuthState);
    case SET_USER:
      return state
      .set('user', action.user.user)
      .set('sharedAccounts', action.user.shared_accounts)
      .set('userAccount', action.user.user_own_account)
      .set('subAccounts', action.user.subaccounts);
    case SET_ROLES:
      return state.set('roles', action.roles);
    case SENDING_REQUEST:
      return state.set('currentlySending', action.sending);
    case REQUEST_ERROR:
      return state.set('error', action.error);
    case CLEAR_ERROR:
      return state.set('error', '');
    case CLEAR_USER:
      return state
      .set('user', {})
      .set('sharedAccounts', [])
      .set('userAccount', {})
      .set('subAccounts', []);
    case CREATE_PAYMENT_SOURCE:
      return state
        .set('paymentSource', {
          fetching: true,
        });
    case CREATE_PAYMENT_SOURCE_SUCCESS:
      return state
        .set('paymentSource', {
          fetching: false,
          details: action.payload,
          error: null,
        });
    case CREATE_PAYMENT_SOURCE_ERROR:
      return state
        .set('paymentSource', {
          fetching: false,
          details: null,
          error: action.payload,
        });
    case APPLY_COUPON_SUCCESS:
      return state
        .set('coupon', {
          details: action.payload,
          error: null,
        });
    case APPLY_COUPON_ERROR:
      return state
        .set('coupon', {
          details: null,
          error: action.payload,
        });
    case POST_SUBSCRIPTION:
      return state
        .set('subscription', {
          fetching: true,
        });
    case POST_SUBSCRIPTION_SUCCESS:
      return state
        .set('subscription', {
          fetching: false,
          details: action.payload,
          error: null,
        });
    case POST_SUBSCRIPTION_ERROR:
      return state
        .set('subscription', {
          fetching: false,
          details: null,
          error: action.payload,
        });
    case FETCH_CURRENT_PLAN:
      return state
        .set('currentPlan', {
          fetching: true,
        });
    case FETCH_CURRENT_PLAN_SUCCESS:
      return state
        .set('currentPlan', {
          fetching: false,
          details: action.payload,
          error: null,
        });
    case FETCH_CURRENT_PLAN_ERROR:
      return state
        .set('currentPlan', {
          fetching: false,
          details: null,
          error: action.payload,
        });
    default:
      return state;
  }
}

export default globalReducer;
