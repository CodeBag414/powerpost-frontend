import {
    SET_BRAND_FILTER,
    CREATE_BRAND,
    DELETE_BRAND,
    SET_NEW_BRAND,
    SET_DELETE_BRAND,
} from './constants';

export function setBrandFilter(brandFilter) {
  return { type: SET_BRAND_FILTER, brandFilter };
}

export function createBrandRequest(brandObject) {
  return { type: CREATE_BRAND, brandObject };
}

export function deleteBrandRequest(brandObject) {
  return { type: DELETE_BRAND, brandObject };
}

// export function setNewBrand(brandObject) {
//     return {type: SET_NEW_BRAND, brandObject};
// }
