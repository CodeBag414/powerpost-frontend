import axios from 'axios';
import cookie from 'react-cookie';

export const API_URL = 'https://dev2.powerpost.digital';

// Post Request
export function postData(url, data, isAuthReq = true) {
  const requestUrl = API_URL + url;
  let headers = {};
  const key = cookie.load('token');

  if (isAuthReq) {
    headers = { headers: { 'X-API-KEY': key } };
  }

  return axios.post(requestUrl, data, headers).catch((error) => Promise.reject(error.response.data));
}

// Get Request
export function getData(url, isAuthReq = true) {
  const requestUrl = API_URL + url;
  let headers = {};
  const key = cookie.load('token');

  if (isAuthReq) {
    headers = { headers: { 'X-API-KEY': key } };
  }

  return axios.get(requestUrl, headers);
}

// Put Request
export function putData(url, data, isAuthReq = true) {
  const requestUrl = API_URL + url;
  let headers = {};
  const key = data.payload.apiKey || (isAuthReq && cookie.load('token'));

  if (key) {
    headers = { headers: { 'X-API-KEY': key } };
  }

  return axios.put(requestUrl, data, headers);
}

// Patch Request
export function patchData(url, data, isAuthReq = true) {
  const requestUrl = API_URL + url;
  let headers = {};
  const key = data.payload.apiKey || (isAuthReq && cookie.load('token'));

  if (key) {
    headers = { headers: { 'X-API-KEY': key } };
  }

  return axios.patch(requestUrl, data, headers);
}

// Delete Request
export function deleteData(url, isAuthReq = true) {
  const requestUrl = API_URL + url;
  let headers = {};
  const key = cookie.load('token');
  if (isAuthReq) {
    headers = { headers: { 'X-API-KEY': key } };
  }

  return axios.delete(requestUrl, headers);
}

export function serialize(obj, prefix) {
  const str = [];
  let p;
  for (p in obj) { // eslint-disable-line no-restricted-syntax
    if (Object.prototype.hasOwnProperty.call(obj, p)) {
      const k = prefix ? `${prefix}[${p}]` : p, v = obj[p]; // eslint-disable-line
      str.push((v !== null && typeof v === 'object') ?
        serialize(v, k) :
        `${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
    }
  }
  return str.join('&');
}
