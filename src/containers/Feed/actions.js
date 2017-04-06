import {
  FETCH_SOCIAL_FEED,
  SET_SOCIAL_FEED,
} from './constants';

export function fetchSocialFeed(connectionId) {
  return { type: FETCH_SOCIAL_FEED, connectionId };
}

export function setSocialFeed(feed) {
  return { type: SET_SOCIAL_FEED, feed };
}
