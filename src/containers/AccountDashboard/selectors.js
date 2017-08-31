import { createSelector } from 'reselect';

const selectAccountDashboard = (state) => state.get('accountDashboard');

const selectStatusCount = () => createSelector(
  selectAccountDashboard,
  (accountDashboard) => accountDashboard.get('statusCount')
);

export {
  selectStatusCount,
};
