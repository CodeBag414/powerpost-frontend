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

const makeSelectUserAvatar = () => createSelector(
    selectAuth,
    (auth) => auth.getIn(['properties', 'thumb_url'])
);

export {
    makeSelectMenuCollapsed,
    makeSelectCurrentAccount,
    makeSelectUserAvatar
};
