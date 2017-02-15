import { createSelector } from 'reselect';

const selectAuth = (state) => state.get('auth');

const makeSelectAuthError = () => createSelector(
    selectAuth,
    (auth) => { console.log(auth); auth.get('error') }
);

const makeSelectUser = () => createSelector(
    selectAuth,
    (auth) => { console.log(auth.get('user')); return auth.get('user') }
);
export {
    selectAuth,
    makeSelectAuthError,
    makeSelectUser
};