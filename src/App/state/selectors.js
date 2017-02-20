import { createSelector } from 'reselect';

const selectAuth = (state) => state.get('auth');

const makeSelectAuthError = () => createSelector(
    selectAuth,
    (auth) => { console.log(auth); auth.get('error') }
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

const makeSelectAllAccounts = () => createSelector(
    [ makeSelectUserAccount,
    makeSelectSharedAccounts,
    makeSelectSubAccounts] ,
    (userAccount, sharedAccounts, subAccounts) => {
        console.log(userAccount);
        console.log(sharedAccounts);
        console.log(subAccounts);
        
       // let accounts = sharedAccounts.concat(subAccounts);
        let accounts = [].push(userAccount);
        return accounts;
    });
export {
    selectAuth,
    makeSelectAuthError,
    makeSelectUser,
    makeSelectUserAccount,
    makeSelectSubAccounts,
    makeSelectSharedAccounts,
    makeSelectAllAccounts
};