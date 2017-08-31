import { createSelector } from 'reselect';

const selectAuth = (state) => state.get('auth');

const selectLoggedIn = () => createSelector(
  selectAuth,
  (auth) => auth.get('loggedIn'),
);

const makeSelectAuthError = () => createSelector(
  selectAuth,
  (auth) => auth.get('error'),
);

const makeSelectUser = () => createSelector(
  selectAuth,
  (auth) => auth.get('user'),
);

const makeSelectUserAccount = () => createSelector(
  selectAuth,
  (auth) => auth.get('userAccount'),
);

const makeSelectSharedAccounts = () => createSelector(
  selectAuth,
  (auth) => auth.get('sharedAccounts'),
);

const makeSelectSubAccounts = () => createSelector(
  selectAuth,
  (auth) => auth.get('subAccounts'),
);

const makeSelectUserAvatar = () => createSelector(
  selectAuth,
  (auth) => auth.getIn(['user', 'properties']),
);

const makeSelectFilePickerKey = () => createSelector(
  selectAuth,
  (auth) => auth.get('filePickerKey'),
);

const selectCreatingPaymentSource = () => createSelector(
  selectAuth,
  (auth) => auth.get('creatingPaymentSource'),
);

const selectCoupon = () => createSelector(
  selectAuth,
  (auth) => auth.get('coupon'),
);

const selectSubscription = () => createSelector(
  selectAuth,
  (auth) => auth.get('subscription'),
);

const selectCurrentPlan = () => createSelector(
  selectAuth,
  (auth) => auth.get('currentPlan'),
);

const selectPaymentSources = () => createSelector(
  selectAuth,
  (auth) => auth.get('paymentSources'),
);

const selectPaymentHistory = () => createSelector(
  selectAuth,
  (auth) => auth.get('paymentHistory'),
);

const selectGroupUsers = () => createSelector(
  selectAuth,
  (auth) => auth.get('groupUsers'),
);

const selectInviteEmailToGroup = () => createSelector(
  selectAuth,
  (auth) => auth.get('inviteEmailToGroup'),
);

/* Post sets */
const makeSelectPostSets = () => createSelector(
  selectAuth,
  (auth) => auth.get('postSets'),
);
const makeSelectPostSetsByST = () => createSelector(
  selectAuth,
  (auth) => auth.get('postSetsByST'),
);

/* Post set */
const makeSelectPostSet = () => createSelector(
  selectAuth,
  (auth) => auth.get('postSet'),
);

/* Posts */
const makeSelectPosts = () => createSelector(
  selectAuth,
  (auth) => auth.get('posts'),
);

/* Post */
const makeSelectPost = () => createSelector(
  selectAuth,
  (auth) => auth.get('post'),
);

/* Media items */
const makeSelectMediaItems = () => createSelector(
  selectAuth,
  (auth) => auth.get('mediaItems'),
);

const makeSelectMediaItem = () => createSelector(
  selectAuth,
  (auth) => auth.getIn(['postSet', 'data', 'media_items']),
);

export {
  selectAuth,
  selectLoggedIn,
  makeSelectAuthError,
  makeSelectUser,
  makeSelectUserAccount,
  makeSelectSubAccounts,
  makeSelectSharedAccounts,
  makeSelectUserAvatar,
  makeSelectFilePickerKey,
  selectCreatingPaymentSource,
  selectCoupon,
  selectSubscription,
  selectCurrentPlan,
  selectPaymentSources,
  selectPaymentHistory,
  selectGroupUsers,
  selectInviteEmailToGroup,

  /* Post sets */
  makeSelectPostSets,
  makeSelectPostSetsByST,
  makeSelectPostSet,

  /* Posts */
  makeSelectPosts,
  makeSelectPost,

  /* Media items */
  makeSelectMediaItems,
  makeSelectMediaItem,
};
