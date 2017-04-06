import { createSelector } from 'reselect';

const selectFeed = (state) => state.get('feed');

const makeSelectSocialFeed = () => createSelector(
    selectFeed,
    (feed) => feed.get('feed')
);

export {
    makeSelectSocialFeed,
};
