import { createSelector } from 'reselect';

const selectPublicPageSelector = (state) => state.get('publicPage');

const selectPublicPostSet = () => createSelector(
  selectPublicPageSelector,
  (publicPage) => publicPage.get('publicPostSet'),
);

export {
  selectPublicPostSet,
};
