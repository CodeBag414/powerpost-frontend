import {
    IS_LOADING_CHANNEL,
    FETCH_CHANNEL,
    FETCH_CHANNEL_SUCCESS,
    FETCH_CHANNEL_ERR,
    FETCH_CHANNEL_CONNECTION,
} from './constants';

export function fetchCurrentChannel(channelid) {
    return { type: FETCH_CHANNEL, channelid };
}

export function fetchCurrentChannelSuccess(channelInfo) {
    return { type: FETCH_CHANNEL_SUCCESS, channelInfo };
}

export function fetchCurrentChannelErr(err) {
    return { type: FETCH_CHANNEL_ERR, err };
}
