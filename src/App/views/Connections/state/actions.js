import {
    SET_CHANNEL_FILTER,
    SET_CONNECTIONS_LIST,
    TOGGLE_ADD_CONNECTION_DIALOG
} from './constants';

export function setChannelFilter(channelFilter) {
    return {
        type: SET_CHANNEL_FILTER,
        channelFilter
    };
}

export function setConnectionsList(connections) {
    return {
        type: SET_CONNECTIONS_LIST,
        connections
    };
}

export function toggleDialog(shown) {
    return {
        type: TOGGLE_ADD_CONNECTION_DIALOG,
        shown
    };
}
