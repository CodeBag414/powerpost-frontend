import { createSelector } from 'reselect';

const selectBrands = (state) => state.get('brands');

const makeSelectBrandFilter = () => createSelector(
    selectBrands,
    (brands) => brands.get('brandFilter')
);

const makeSelectNewBrand = () => createSelector(
    selectBrands,
    (brands) => brands.get('newBrand')
);

const makeSelectDeleteBrandID = () => createSelector(
    selectBrands,
    (brands) => brands.get('deleteBrandID')
);

const makeSelectDialogShown = () => createSelector(
    selectBrands,
    (brands) => brands.get('dialogShown')
);

export {
    makeSelectBrandFilter,
    makeSelectNewBrand,
    makeSelectDeleteBrandID,
    makeSelectDialogShown,
};
