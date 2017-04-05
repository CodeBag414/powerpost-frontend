import { createSelector } from 'reselect';

const selectBrands = (state) => state.get('brands');

const makeSelectBrandFilter = () => createSelector(
    selectBrands,
    (brands) => brands.get('brandFilter')
);

const makeSelectDialogShown = () => createSelector(
    selectBrands,
    (brands) => brands.get('dialogShown')
);

export {
    makeSelectBrandFilter,
    makeSelectDialogShown,
};
