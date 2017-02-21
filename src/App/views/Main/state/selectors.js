import { createSelector } from 'reselect';

const selectDashboard = (state) => state.get('dashboard');

const makeSelectMenuCollapsed = () => createSelector(
   selectDashboard,
    (dashboard) => dashboard.get('menuCollapsed')
);

const makeSelectCurrentAccount = () => createSelector(
    selectDashboard,
    (dashboard) => dashboard.get('activeBrand')
);

export {
    makeSelectMenuCollapsed,
    makeSelectCurrentAccount
};
