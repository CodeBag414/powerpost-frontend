import {
    TOGGLE_ADD_BRAND_DIALOG,
} from './constants';

export function toggleDialog(dialogShown) {
    console.log('add action', dialogShown)
    return {type: TOGGLE_ADD_BRAND_DIALOG, dialogShown};
}
