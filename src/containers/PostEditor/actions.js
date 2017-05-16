import {
  POST_COMMENT_REQUEST,
  ADD_COMMENT,
  FETCH_COMMENTS_REQUEST,
  SET_COMMENTS,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT,
} from './constants';

export function fetchComments(postSetId) {
  return { type: FETCH_COMMENTS_REQUEST, postSetId };
}

export function setComments(comments) {
  return { type: SET_COMMENTS, comments };
}

export function postCommentRequest({ postSetId, text }) {
  return { type: POST_COMMENT_REQUEST, postSetId, text };
}

export function appendComment(comment) {
  return { type: ADD_COMMENT, comment };
}

export function deleteCommentRequest(commentId) {
  return { type: DELETE_COMMENT_REQUEST, commentId };
}

export function deleteComment(commentId) {
  return { type: DELETE_COMMENT, commentId };
}