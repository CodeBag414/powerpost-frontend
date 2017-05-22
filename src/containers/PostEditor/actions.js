import {
  POST_COMMENT_REQUEST,
  ADD_COMMENT,
  FETCH_COMMENTS_REQUEST,
  SET_COMMENTS,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT,
  FETCH_ACCOUNT_TAGS_REQUEST,
  SET_ACCOUNT_TAGS,
  SUBMIT_BUNCH_POSTS_REQUEST,
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

export function fetchAccountTags(accountId) {
  return { type: FETCH_ACCOUNT_TAGS_REQUEST, accountId };
}

export function setAccountTags(accountTags) {
  return { type: SET_ACCOUNT_TAGS, accountTags };
}

export function submitPostsRequest(posts) {
  return { type: SUBMIT_BUNCH_POSTS_REQUEST, posts };
}
