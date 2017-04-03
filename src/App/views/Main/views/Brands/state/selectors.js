import { createSelector } from 'reselect';

const selectConnections = (state) => state.get('connections');
const makeSelectDialogShown = () => createSelector(
    selectConnections,
    (connection) => connection.get('dialogShown')
);

export {
    makeSelectDialogShown,
};