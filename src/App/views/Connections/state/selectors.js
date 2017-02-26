import { createSelector } from 'reselect';

const selectConnections = (state) => state.get('connections');

const makeSelectDialogShown = () => createSelector(
   selectConnections,
    (connections) => connections.get('dialogShown')
);

export {
    makeSelectDialogShown
};
