import { createSelector } from 'reselect';

const selectProfile = (state) => state.get('profile');

const makeSelectAccountProfile = () => createSelector(
  selectProfile,
  (profile) => profile.get('account')
);

export {
  makeSelectAccountProfile,
};
