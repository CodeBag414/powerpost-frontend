import { createSelector } from 'reselect';

const selectBrands = (state) => state.get('brands');

const makeSelectChannelFilter = () => createSelector(
    selectBrands,
    (brands) => brands.get('channelFilter')
);

const makeSelectChannelType = () => createSelector(
    selectBrands,
    (brands) => brands.get('channelType')
);

const makeSelectConnections = () => createSelector(
    selectBrands,
    (brands) => brands.get('connections')
);

const makeSelectDialogShown = () => createSelector(
    selectBrands,
    (brands) => brands.get('dialogShown')
);

const makeSelectSocialUrls = () => createSelector(
    selectBrands,
    (brands) => brands.get('socialUrls')
);

export {
    makeSelectChannelFilter,
    makeSelectChannelType,
    makeSelectConnections,
    makeSelectDialogShown,
    makeSelectSocialUrls,
};
