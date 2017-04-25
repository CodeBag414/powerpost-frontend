import { createSelector } from 'reselect';

const selectSettings = (state) => state.get('settings');

const selectSubscriptions = () => createSelector(
  selectSettings,
  (settings) => settings.get('subscriptions')
);

export {
  selectSettings,
  selectSubscriptions,
};
