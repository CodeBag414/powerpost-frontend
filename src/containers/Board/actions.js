import {
  FETCH_POST_SETS,
  BOARD_CALLBACK,
  SET_POST_SETS,
  DELETE_POST_SET_REQUEST,
} from './constants';

export function getPostSets() {
  return { type: FETCH_POST_SETS };
}

export function boardCallback(boardObject) {
  return { type: BOARD_CALLBACK, boardObject };
}

export function setPostSets(postSets) {
  return { type: SET_POST_SETS, postSets };
}

export function deletePostSetRequest(id) {
  return { type: DELETE_POST_SET_REQUEST, id };
}
