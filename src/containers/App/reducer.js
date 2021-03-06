/*
 * The reducer takes care of state changes in our app through actions
 */
import { fromJS } from 'immutable';
import { find, remove } from 'lodash';
import auth from 'utils/auth';

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
  ADD_USER_TO_GROUP,
  ADD_USER_TO_GROUP_SUCCESS,
  ADD_USER_TO_GROUP_ERROR,
  REMOVE_USER_FROM_GROUP,
  REMOVE_USER_FROM_GROUP_SUCCESS,
  REMOVE_USER_FROM_GROUP_ERROR,
  SET_POST_SETS,
  DELETE_POST_SET_SUCCESS,
  CHANGE_POST_SET_STATUS,
  UPDATE_BUNCH_POST_REQUEST,
  UPDATE_BUNCH_POST_SUCCESS,
  FETCH_POSTS,
  SET_POSTS,
  // UPDATE_POST_SUCCESS,
  UPDATE_POST_SET_SUCCESS,
  CREATE_POST_SET_SUCCESS,
  FETCH_MEDIA_ITEMS_SUCCESS,
  FETCH_MEDIA_ITEMS_ERROR,
  CHANGE_POST_SET_SORT_ORDER_SUCCESS,
  SAVE_POST_SET_SORT_ORDER_SUCCESS,
  FETCH_POST_SETS_REQUEST,
  FETCH_POST_SETS_SUCCESS,
  FETCH_POST_SETS_FAILURE,
} from './constants';

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
  mediaItmes: [],
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
    case FETCH_POST_SETS_REQUEST:
      return state
        .setIn(['postSets', 'requesting'], true)
        .updateIn(['postSets'], (postSets) =>
          postSets.get('action') === action.action
            ? postSets
            : postSets.set('action', action.action).set('data', null));
    case FETCH_POST_SETS_SUCCESS:
      return state.set('postSets', fromJS({
        action: state.getIn(['postSets', 'action']),
        requesting: false,
        error: null,
        data: action.postSets,
      }));
    case FETCH_POST_SETS_FAILURE:
      return state.set('postSets', fromJS({
        action: state.getIn(['postSets', 'action']),
        requesting: false,
        error: action.error,
        data: null,
      }));
    case UPDATE_BUNCH_POST_REQUEST:
      return state
        .setIn(['postSets', 'requesting'], true);
    case UPDATE_BUNCH_POST_SUCCESS:
      return state
        .updateIn(['postSets', 'data', 'scheduled_post_sets'], (postSets) => {
          const index = postSets.findIndex((item) =>
            (item.get('schedule_time') === action.postSet.schedule_time) && item.get('post_set_id') === action.postSet.post_set_id);
          return postSets.set(
            index,
            fromJS({
              ...action.postSet,
              posts: action.posts,
              schedule_time: action.posts[0].schedule_time,
              status: (action.posts && action.posts.length && action.posts.every((post) => post.status === 0))
                ? '0'
                : action.postSet.status,
            }),
          );
        })
        .setIn(['postSets', 'requesting'], false);
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
    case SET_POST_SETS:
      return state
        .set('postSets', action.postSets);
    case DELETE_POST_SET_SUCCESS: {
      return state
        .updateIn(
          ['postSets', 'data', 'unscheduled_post_sets'],
          (postSets) => postSets && postSets.filter((postSet) => postSet.get('post_set_id') !== action.id)
        )
        .updateIn(
          ['postSets', 'data', 'scheduled_post_sets'],
          (postSets) => postSets && postSets.filter((postSet) => postSet.get('post_set_id') !== action.id)
        )
        .updateIn(
          ['postSets', 'data', 'post_when_ready_post_sets'],
          (postSets) => postSets && postSets.filter((postSet) => postSet.get('post_set_id') !== action.id)
        )
        .updateIn(
          ['postSets', 'data', 'post_sets'],
          (postSets) => postSets && postSets.filter((postSet) => postSet.get('post_set_id') !== action.id)
        );
    }
    case CHANGE_POST_SET_STATUS:
      return state
        .updateIn(['postSets', 'data', 'post_sets'], (postSets = fromJS([])) => postSets.map((postSet) =>
          postSet.get('post_set_id') !== action.id ? postSet : postSet.set('status', action.status)
        ));
    case CHANGE_POST_SET_SORT_ORDER_SUCCESS:
    case SAVE_POST_SET_SORT_ORDER_SUCCESS:
      return state
        .updateIn(['postSets', 'data', 'post_sets'], (postSets = fromJS([])) => postSets.map((postSet) =>
          postSet.get('post_set_id') !== action.id ? postSet : postSet.set('sort_order', action.sort_order)
        ).sort((a, b) => b.get('sort_order') - a.get('sort_order')));
    case FETCH_POSTS:
      return state.set('posts', []);
    case SET_POSTS:
      return state.set('posts', action.posts);
    case UPDATE_POST_SET_SUCCESS:
      return state
        .updateIn(
          ['postSets', 'data', 'unscheduled_post_sets'],
          (postSets) => postSets && postSets.map((postSet) => postSet.get('post_set_id') === action.payload.post_set_id ? fromJS(action.payload) : postSet)
        )
        .updateIn(
          ['postSets', 'data', 'scheduled_post_sets'],
          (postSets) => postSets && postSets.map((postSet) =>
            (postSet.get('post_set_id') === action.payload.post_set_id) ?
              fromJS({
                ...postSet.toJS(),
                ...action.payload,
              })
            : postSet)
        )
        .updateIn(
          ['postSets', 'data', 'post_when_ready_post_sets'],
          (postSets) => postSets && postSets.map((postSet) => postSet.get('post_set_id') === action.payload.post_set_id ? fromJS(action.payload) : postSet)
        )
        .updateIn(
          ['postSets', 'data', 'post_sets'],
          (postSets) => postSets && postSets.map((postSet) => postSet.get('post_set_id') === action.payload.post_set_id ? fromJS(action.payload) : postSet)
        );
    // case UPDATE_POST_SET_SUCCESS: {
    //   // TODO: Do this for unscheduled_post_sets, post_when_ready_post_sets and state.get('postSets')
    //   const scheduledPostSets = state.getIn(['postSetsByST', 'data', 'scheduled_post_sets']);
    //   const index = scheduledPostSets.findIndex((postSet) => postSet.get('post_set_id') === action.payload.post_set_id);
    //   return (index > -1) ?
    //     state.updateIn(['postSetsByST', 'data', 'scheduled_post_sets', index], (postSet) => (fromJS({
    //       ...action.payload,
    //       schedule_time: postSet.get('schedule_time'),
    //     })))
    //     : state;
    // }
    case CREATE_POST_SET_SUCCESS:
      return state.set('post_set', {
        ...action.postSet,
        createSuccess: true,
      }).set('post_edit', action.edit);
    case FETCH_MEDIA_ITEMS_SUCCESS:
      return state.set('mediaItems', fromJS(action.mediaItems.data.collection.media_items.filter((t) => t.status !== '0')));
    case FETCH_MEDIA_ITEMS_ERROR:
      return state
        .set('error', action.mediaItems.data.message);
    default:
      return state;
  }
}

export default globalReducer;
