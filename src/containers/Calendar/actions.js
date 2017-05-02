import {
  FETCH_POSTS,
  SET_POSTS,
} from './constants';

export function fetchPosts(accountId) {
  return { type: FETCH_POSTS, accountId };
}

export function setPosts(posts) {
  return { type: SET_POSTS, posts };
}
