import { createSelector } from 'reselect';

const selectAccountDashboard = (state) => state.get('accountDashboard');

const selectStatusCount = () => createSelector(
  selectAccountDashboard,
  (accountDashboard) => accountDashboard.get('statusCount')
);

const selectPostSets = () => createSelector(
  selectAccountDashboard,
  (accountDashboard) => accountDashboard.get('postSets')
);

export {
  selectStatusCount,
  selectPostSets,
};
