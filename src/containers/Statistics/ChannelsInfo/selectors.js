import { createSelector } from 'reselect';

const selectChannel = (state) => state.get('channel');

const makeSelectCurrentChannel = () => createSelector(
    selectChannel,
    (channel) => channel.get('activeChannel')
);

export {
    makeSelectCurrentChannel,
};
