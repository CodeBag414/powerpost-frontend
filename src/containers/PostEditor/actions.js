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
  CREATE_MEDIA_ITEM,
  UPDATE_MEDIA_ITEM,
  REMOVE_MEDIA_ITEM,
  FETCH_URL_CONTENT,
  CLEAR_URL_CONTENT,
  GET_MEDIA_ITEM,
  SET_MEDIA_ITEM,
  FETCH_COLLECTIONS,
  SET_VISIBILITY_FILTER,
  FETCH_WORDPRESS_GUI_REQUEST,
  FETCH_WORDPRESS_GUI_SUCCESS,
  FETCH_WORDPRESS_GUI_FAILURE,
  CLEAR_POST,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  SET_WORDPRESS_POST_REQUEST,
  CLEAR_MEDIA_ITEM,
  FETCH_FACEBOOK_ENTITIES,
  FETCH_FACEBOOK_ENTITIES_SUCCESS,
  GET_EMBED_DATA,
  CREATE_BLOG_ITEM_REQUEST,
  CREATE_BLOG_ITEM_SUCCESS,
  CREATE_BLOG_ITEM_FAILURE,
} from './constants';

export function createBlogItemRequest(payload) {
  return {
    type: CREATE_BLOG_ITEM_REQUEST,
    payload,
  };
}

export function createBlogItemSuccess(payload) {
  return {
    type: CREATE_BLOG_ITEM_SUCCESS,
    payload,
  };
}

export function createBlogItemFailure(error) {
  return {
    type: CREATE_BLOG_ITEM_FAILURE,
    error,
  };
}

export function fetchCollections(accountId) {
  return {
    type: FETCH_COLLECTIONS,
    accountId,
  };
}

export function getEmbedData(url) {
  return {
    type: GET_EMBED_DATA,
    url,
  };
}

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

export function removeMediaItem() {
  return { type: REMOVE_MEDIA_ITEM };
}

export function updateMediaItem(mediaItem, inBlog = false) {
  return {
    type: UPDATE_MEDIA_ITEM,
    mediaItem,
    inBlog,
  };
}

export function fetchUrlData(url) {
  return {
    type: FETCH_URL_CONTENT,
    url,
  };
}

export function clearUrlContent() {
  return {
    type: CLEAR_URL_CONTENT,
  };
}

export function getMediaItem(mediaItemId) {
  return {
    type: GET_MEDIA_ITEM,
    mediaItemId,
  };
}

export function setMediaItem(mediaItem) {
  return {
    type: SET_MEDIA_ITEM,
    mediaItem,
  };
}

export function createMediaItem(mediaItem) {
  return {
    type: CREATE_MEDIA_ITEM,
    mediaItem,
  };
}

export function setVisibilityFilter(filter) {
  return {
    type: SET_VISIBILITY_FILTER,
    filter,
  };
}

export function fetchWordpressGUIRequest(payload) {
  return {
    type: FETCH_WORDPRESS_GUI_REQUEST,
    payload,
  };
}

export function fetchWordpressGUISuccess(payload) {
  return {
    type: FETCH_WORDPRESS_GUI_SUCCESS,
    payload,
  };
}

export function fetchWordpressGUIFailure(payload) {
  return {
    type: FETCH_WORDPRESS_GUI_FAILURE,
    payload,
  };
}

export function clearPost() {
  return {
    type: CLEAR_POST,
  };
}

export function createPostRequest(payload) {
  return {
    type: CREATE_POST_REQUEST,
    payload,
  };
}
export function createPostSuccess(payload) {
  return {
    type: CREATE_POST_SUCCESS,
    payload,
  };
}
export function createPostFailure(payload) {
  return {
    type: CREATE_POST_FAILURE,
    payload,
  };
}

export function setWordpressPostRequest(payload) {
  return {
    type: SET_WORDPRESS_POST_REQUEST,
    payload,
  };
}

export function clearMediaItem() {
  return {
    type: CLEAR_MEDIA_ITEM,
  };
}

export function fetchFacebookEntities(payload) {
  return {
    type: FETCH_FACEBOOK_ENTITIES,
    payload,
  };
}

export function fetchFacebookEntitiesSuccess(entities) {
  return {
    type: FETCH_FACEBOOK_ENTITIES_SUCCESS,
    entities,
  };
}
