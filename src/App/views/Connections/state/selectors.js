import { createSelector } from 'reselect';

const selectConnections = (state) => state.get('connections');

const makeSelectConnections = () => createSelector(
    selectConnections,
    (connections) => connections.get('connections')
);

const makeSelectDialogShown = () => createSelector(
    selectConnections,
    (connections) => connections.get('dialogShown')
);

export {
    makeSelectConnections,
    makeSelectDialogShown
};
