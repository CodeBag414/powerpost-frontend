import {
  /* Posts */
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,

  /* Post */
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  CREATE_BUNCH_POSTS_REQUEST,
  CREATE_BUNCH_POSTS_SUCCESS,
  CREATE_BUNCH_POSTS_FAILURE,
  ADD_POST_TO_POST_SET,
  UPDATE_BUNCH_POSTS_REQUEST,
  UPDATE_BUNCH_POSTS_SUCCESS,
  UPDATE_BUNCH_POSTS_FAILURE,
  SET_POST,
  CLEAR_POST,
} from '../constants';

/* Posts */

export function fetchPostsRequest(accountId) {
  return { type: FETCH_POSTS_REQUEST, accountId };
}
export function fetchPostsSuccess(posts) {
  return { type: FETCH_POSTS_SUCCESS, posts };
}
export function fetchPostsFailure(error) {
  return { type: FETCH_POSTS_FAILURE, error };
}

/* Post */
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
export function createPostFailure(error) {
  return {
    type: CREATE_POST_FAILURE,
    error,
  };
}

export function updatePostRequest(post) {
  return { type: UPDATE_POST_REQUEST, post };
}
export function updatePostSuccess(post) {
  return { type: UPDATE_POST_SUCCESS, post };
}
export function updatePostFailure(error) {
  return { type: UPDATE_POST_FAILURE, error };
}

export function createBunchPostsRequest(posts) {
  return { type: CREATE_BUNCH_POSTS_REQUEST, posts };
}
export function createBunchPostsSuccess() {
  return { type: CREATE_BUNCH_POSTS_SUCCESS };
}
export function createBunchPostsFailure(error) {
  return { type: CREATE_BUNCH_POSTS_FAILURE, error };
}
export function addPostToPostSet(post) {
  return { type: ADD_POST_TO_POST_SET, post };
}

export function updateBunchPostsRequest(posts, postSet) {
  return { type: UPDATE_BUNCH_POSTS_REQUEST, posts, postSet };
}
export function updateBunchPostsSuccess(posts, postSet) {
  return { type: UPDATE_BUNCH_POSTS_SUCCESS, posts, postSet };
}
export function updateBunchPostsFailure(error) {
  return { type: UPDATE_BUNCH_POSTS_FAILURE, error };
}

export function setPost(post) {
  return { type: SET_POST, post };
}

export function clearPost() {
  return { type: CLEAR_POST };
}
