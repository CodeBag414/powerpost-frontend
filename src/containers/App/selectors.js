import { createSelector } from 'reselect';

const selectAuth = (state) => state.get('auth');

const makeSelectAuthError = () => createSelector(
    selectAuth,
    (auth) => { console.log(auth); auth.get('error'); }
);

const makeSelectUser = () => createSelector(
    selectAuth,
    (auth) => auth.get('user')
);

const makeSelectUserAccount = () => createSelector(
    selectAuth,
    (auth) => auth.get('userAccount')
);

const makeSelectSharedAccounts = () => createSelector(
    selectAuth,
    (auth) => auth.get('sharedAccounts')
);

const makeSelectSubAccounts = () => createSelector(
    selectAuth,
    (auth) => auth.get('subAccounts')
);

const makeSelectUserAvatar = () => createSelector(
    selectAuth,
    (auth) => auth.getIn(['user', 'properties'])
);

const makeSelectFilePickerKey = () => createSelector(
    selectAuth,
    (auth) => auth.get('filePickerKey')
);

const selectPaymentSource = () => createSelector(
    selectAuth,
    (auth) => auth.get('paymentSource')
);

const selectCoupon = () => createSelector(
    selectAuth,
    (auth) => auth.get('coupon')
);

const selectSubscription = () => createSelector(
    selectAuth,
    (auth) => auth.get('subscription')
);

export {
    selectAuth,
    makeSelectAuthError,
    makeSelectUser,
    makeSelectUserAccount,
    makeSelectSubAccounts,
    makeSelectSharedAccounts,
    makeSelectUserAvatar,
    makeSelectFilePickerKey,
    selectPaymentSource,
    selectCoupon,
    selectSubscription,
};
