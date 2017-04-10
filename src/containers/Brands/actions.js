import {
    SET_BRAND_FILTER,
    CREATE_BRAND,
    SET_CONNECTIONS_LIST,
    TOGGLE_ADD_CONNECTION_DIALOG,
    CONNECTION_CALLBACK,
} from './constants';

export function setBrandFilter(brandFilter) {
    return {type: SET_BRAND_FILTER, brandFilter};
}

export function createBrandRequest(brandObject) {
    return {type: CREATE_BRAND, brandObject};
}

export function setConnectionsList(connections) {
    return {type: SET_CONNECTIONS_LIST, connections};
}

export function toggleDialog(shown) {
    return {type: TOGGLE_ADD_CONNECTION_DIALOG, shown};
}

export function connectionCallback(channelObject) {
    return {type: CONNECTION_CALLBACK, channelObject};
}
