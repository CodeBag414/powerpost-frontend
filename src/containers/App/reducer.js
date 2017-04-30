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
  FETCH_PAYMENT_SOURCES_SUCCESS,
  FETCH_PAYMENT_SOURCES_ERROR,
  FETCH_PAYMENT_HISTORY_SUCCESS,
  FETCH_PAYMENT_HISTORY_ERROR,
  FETCH_GROUP_USERS,
  FETCH_GROUP_USERS_SUCCESS,
  FETCH_GROUP_USERS_ERROR,
  INVITE_EMAIL_TO_GROUP,
  INVITE_EMAIL_TO_GROUP_SUCCESS,
  INVITE_EMAIL_TO_GROUP_ERROR,
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
  creatingPaymentSource: {},
  coupon: {},
  subscription: {},
  currentPlan: {},
  paymentSources: {},
  paymentHistory: {},
  groupUsers: {},
  inviteEmailToGroup: {},
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
        .set('creatingPaymentSource', {
          fetching: true,
        });
    case CREATE_PAYMENT_SOURCE_SUCCESS:
      return state
        .set('creatingPaymentSource', {
          fetching: false,
          details: action.payload,
          error: null,
        })
        .set('paymentSources', {
          details: action.payload,
        });
    case CREATE_PAYMENT_SOURCE_ERROR:
      return state
        .set('creatingPaymentSource', {
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
    case FETCH_PAYMENT_SOURCES_SUCCESS:
      return state
        .set('paymentSources', {
          details: action.payload,
          error: null,
        });
    case FETCH_PAYMENT_SOURCES_ERROR:
      return state
        .set('paymentSources', {
          details: null,
          error: action.payload,
        });
    case FETCH_PAYMENT_HISTORY_SUCCESS:
      return state
        .set('paymentHistory', {
          details: action.payload,
          error: null,
        });
    case FETCH_PAYMENT_HISTORY_ERROR:
      return state
        .set('paymentHistory', {
          details: null,
          error: action.payload,
        });
    case FETCH_GROUP_USERS:
      return state
        .set('groupUsers', {
          isFetching: true,
          details: null,
          error: null,
        });
    case FETCH_GROUP_USERS_SUCCESS:
      return state
        .set('groupUsers', {
          isFetching: false,
          details: action.payload,
          error: null,
        });
    case FETCH_GROUP_USERS_ERROR:
      return state
        .set('groupUsers', {
          isFetching: false,
          details: null,
          error: action.payload,
        });
    case INVITE_EMAIL_TO_GROUP:
      return state
        .set('inviteEmailToGroup', {
          isFetching: true,
        });
    case INVITE_EMAIL_TO_GROUP_SUCCESS:
      return state
        .set('inviteEmailToGroup', {
          isFetching: false,
          details: action.payload,
          error: null,
        });
    case INVITE_EMAIL_TO_GROUP_ERROR:
      return state
        .set('inviteEmailToGroup', {
          isFetching: false,
          details: null,
          error: action.payload,
        });
    default:
      return state;
  }
}

export default globalReducer;
