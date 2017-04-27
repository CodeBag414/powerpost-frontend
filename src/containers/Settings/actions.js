import {
  FETCH_SUBSCRIPTIONS,
  FETCH_SUBSCRIPTIONS_SUCCESS,
  FETCH_SUBSCRIPTIONS_ERROR,
} from './constants';

export function fetchSubscriptions(payload) {
  return {
    type: FETCH_SUBSCRIPTIONS,
    payload,
  };
}

export function fetchSubscriptionsSuccess(payload) {
  return {
    type: FETCH_SUBSCRIPTIONS_SUCCESS,
    payload,
  };
}

export function fetchSubscriptionsError(payload) {
  return {
    type: FETCH_SUBSCRIPTIONS_ERROR,
    payload,
  };
}
