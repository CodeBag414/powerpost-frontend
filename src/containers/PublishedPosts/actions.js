import {
  FETCH_POST_SETS,
  PUBLISHED_POSTS_CALLBACK,
  SET_POST_SETS,
} from './constants';

export function getPostSets() {
  return { type: FETCH_POST_SETS };
}

export function publishedPostsCallback(publishedPostsObject) {
  return { type: PUBLISHED_POSTS_CALLBACK, publishedPostsObject };
}

export function setPostSets(postSets) {
  return { type: SET_POST_SETS, postSets };
}
