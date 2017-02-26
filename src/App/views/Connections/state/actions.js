import {
    TOGGLE_ADD_CONNECTION_DIALOG
} from './constants';

export function toggleDialog(shown) {
    return {
        type: TOGGLE_ADD_CONNECTION_DIALOG,
        shown
    };
}
