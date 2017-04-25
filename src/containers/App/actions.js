import {
  SET_AUTH,
  SENDING_REQUEST,
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  UPDATE_REQUEST,
  LOGOUT,
  REQUEST_ERROR,
  CLEAR_ERROR,
  CREATE_PAYMENT_SOURCE,
  CREATE_PAYMENT_SOURCE_SUCCESS,
  CREATE_PAYMENT_SOURCE_ERROR,
  APPLY_COUPON,
  APPLY_COUPON_SUCCESS,
  APPLY_COUPON_ERROR,
  POST_SUBSCRIPTION,
  POST_SUBSCRIPTION_SUCCESS,
  POST_SUBSCRIPTION_ERROR,
  FETCH_CURRENT_PLAN,
  FETCH_CURRENT_PLAN_SUCCESS,
  FETCH_CURRENT_PLAN_ERROR,
  FETCH_PAYMENT_SOURCES,
  FETCH_PAYMENT_SOURCES_SUCCESS,
  FETCH_PAYMENT_SOURCES_ERROR,
  // CHECK_USER_OBJECT,
} from './constants';

/**
 * Sets the authentication state of the application
 * @param  {boolean} newAuthState True means a user is logged in, false means no user is logged in
 */
export function setAuthState(newAuthState) {
  return { type: SET_AUTH, newAuthState };
}

/**
 * Sets the `currentlySending` state, which displays a loading indicator during requests
 * @param  {boolean} sending True means we're sending a request, false means we're not
 */
export function sendingRequest(sending) {
  return { type: SENDING_REQUEST, sending };
}

/**
 * Tells the app we want to log in a user
 * @param  {object} data          The data we're sending for log in
 * @param  {string} data.username The username of the user to log in
 * @param  {string} data.password The password of the user to log in
 */
export function loginRequest(data) {
  return { type: LOGIN_REQUEST, data };
}

/**
 * Tells the app we want to log out a user
 */
export function logout() {
  return { type: LOGOUT };
}

/**
 * Tells the app we want to register a user
 * @param  {object} data          The data we're sending for registration
 * @param  {string} data.username The username of the user to register
 * @param  {string} data.password The password of the user to register
 */
export function registerRequest(data) {
  return { type: REGISTER_REQUEST, data };
}

/**
 * Tells the app we want to update a user
 * @param  {object} data          The data we're sending for user setting
 * @param  {string} name          The fullname of the user to update
 * @param  {string} company_name  The company name of the user to update
 * @param  {string} title         The title of the user to update
 * @param  {string} email         The email of the user to update
 * @param  {string} phone_number  The phone number of the user to update
 * @param  {string} time_zone     The time zone of the user to update
 */
export function updateRequest(data) {
  return { type: UPDATE_REQUEST, data };
}

/**
 * Sets the `error` state to the error received
 * @param  {object} error The error we got when trying to make the request
 */
export function requestError(error) {
  return { type: REQUEST_ERROR, error };
}

/**
 * Sets the `error` state as empty
 */
export function clearError() {
  return { type: CLEAR_ERROR };
}

export function createPaymentSource(payload) {
  return {
    type: CREATE_PAYMENT_SOURCE,
    payload,
  };
}

export function createPaymentSourceSuccess(payload) {
  return {
    type: CREATE_PAYMENT_SOURCE_SUCCESS,
    payload,
  };
}

export function createPaymentSourceError(payload) {
  return {
    type: CREATE_PAYMENT_SOURCE_ERROR,
    payload,
  };
}

export function applyCoupon(payload) {
  return {
    type: APPLY_COUPON,
    payload,
  };
}

export function applyCouponSuccess(payload) {
  return {
    type: APPLY_COUPON_SUCCESS,
    payload,
  };
}

export function applyCouponError(payload) {
  return {
    type: APPLY_COUPON_ERROR,
    payload,
  };
}

export function postSubscription(payload) {
  return {
    type: POST_SUBSCRIPTION,
    payload,
  };
}

export function postSubscriptionSuccess(payload) {
  return {
    type: POST_SUBSCRIPTION_SUCCESS,
    payload,
  };
}

export function postSubscriptionError(payload) {
  return {
    type: POST_SUBSCRIPTION_ERROR,
    payload,
  };
}

export function fetchCurrentPlan(payload) {
  return {
    type: FETCH_CURRENT_PLAN,
    payload,
  };
}

export function fetchCurrentPlanSuccess(payload) {
  return {
    type: FETCH_CURRENT_PLAN_SUCCESS,
    payload,
  };
}

export function fetchCurrentPlanError(payload) {
  return {
    type: FETCH_CURRENT_PLAN_ERROR,
    payload,
  };
}

export function fetchPaymentSources(payload) {
  return {
    type: FETCH_PAYMENT_SOURCES,
    payload,
  };
}

export function fetchPaymentSourcesSuccess(payload) {
  return {
    type: FETCH_PAYMENT_SOURCES_SUCCESS,
    payload,
  };
}

export function fetchPaymentSourcesError(payload) {
  return {
    type: FETCH_PAYMENT_SOURCES_ERROR,
    payload,
  };
}
