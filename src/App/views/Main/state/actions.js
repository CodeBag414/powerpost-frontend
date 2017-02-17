import {
    FETCH_ACCOUNT,
    TOGGLE_MENU
} from './constants';

export function fetchCurrentAccount(account_id) {
    return {
        type: FETCH_ACCOUNT,
        account_id
    };
}

export function toggleMenu(collapsed) {
    return {
        type: TOGGLE_MENU,
        collapsed
    };
}