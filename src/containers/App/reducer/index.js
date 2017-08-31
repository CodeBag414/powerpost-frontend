/*
 * The reducer takes care of state changes in our app through actions
 */
import { Map, fromJS } from 'immutable';
import { find, remove } from 'lodash';
import auth from 'utils/auth';
import reduceReducers from 'reduce-reducers';

/* import sub-reducers here */
import postSetsReducer from './postSetsReducer';
import postSetReducer from './postSetReducer';
import postSetsBySTReducer from './postSetsBySTReducer';
import postsReducer from './postsReducer';
import postReducer from './postReducer';
import mediaItemsReducer from './mediaItemsReducer';

import {
  SET_AUTH,
  SENDING_REQUEST,
  REQUEST_ERROR,
  CLEAR_ERROR,
  SET_ROLES,
  SET_USER,
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
  ADD_USER_TO_GROUP,
  ADD_USER_TO_GROUP_SUCCESS,
  ADD_USER_TO_GROUP_ERROR,
  REMOVE_USER_FROM_GROUP,
  REMOVE_USER_FROM_GROUP_SUCCESS,
  REMOVE_USER_FROM_GROUP_ERROR,
} from '../constants';

// The initial application state
const initialState = fromJS({
  error: '',
  currentlySending: false,
  user: {},
  sharedAccounts: [],
  userAccount: null,
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
  postSets: {
    requesting: true,
    error: null,
    data: {},
    action: null,
  },
  mediaItems: [],
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
    case ADD_USER_TO_GROUP:
    case REMOVE_USER_FROM_GROUP: {
      const groupUsers = state.get('groupUsers');
      const user = find(groupUsers.details.groups_users, { user_id: action.payload.user_id });
      user.processing = true;
      return state
        .set('groupUsers', { ...groupUsers });
    }
    case ADD_USER_TO_GROUP_SUCCESS: {
      const groupUsers = state.get('groupUsers');
      const user = find(groupUsers.details.groups_users, { user_id: action.payload.user_id });
      user.processing = false;
      user.group_id = action.payload.group_id;
      return state
        .set('groupUsers', { ...groupUsers });
    }
    case ADD_USER_TO_GROUP_ERROR: {
      const groupUsers = state.get('groupUsers');
      const user = find(groupUsers.details.groups_users, { user_id: action.payload.user_id });
      user.processing = false;
      return state
        .set('groupUsers', { ...groupUsers });
    }
    case REMOVE_USER_FROM_GROUP_SUCCESS: {
      const groupUsers = state.get('groupUsers');
      remove(groupUsers.details.groups_users, (groupUser) => groupUser.user_id === action.payload.user_id);
      return state
        .set('groupUsers', { ...groupUsers });
    }
    case REMOVE_USER_FROM_GROUP_ERROR: {
      const groupUsers = state.get('groupUsers');
      const user = find(groupUsers.details.groups_users, { user_id: action.payload.user_id });
      user.processing = false;
      return state
        .set('groupUsers', { ...groupUsers });
    }
    default:
      return state;
  }
}

function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers);

  return function combination(state = Map(), action) {
    return state
      .withMutations((temporaryState) => {
        reducerKeys.forEach((reducerName) => {
          const reducer = reducers[reducerName];
          const currentDomainState = temporaryState.get(reducerName);
          const nextDomainState = reducer(currentDomainState, action);

          if (nextDomainState === undefined) {
            throw new Error(`Reducer "${reducerName}" returned undefined when handling "${action.type}" action. To ignore an action, you must explicitly return the previous state.`);
          }

          temporaryState.set(reducerName, nextDomainState);
        });
      });
  };
}

export default reduceReducers(
  globalReducer,
  combineReducers({
    postSets: postSetsReducer,
    postSetsByST: postSetsBySTReducer,
    postSet: postSetReducer,
    posts: postsReducer,
    post: postReducer,
    mediaItems: mediaItemsReducer,
  }),
);
