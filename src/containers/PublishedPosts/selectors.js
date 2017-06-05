import { createSelector } from 'reselect';

const selectPublishedPosts = (state) => state.get('publishedPosts');

const makeSelectPostSets = () => createSelector(
  selectPublishedPosts,
  (publishedPosts) => publishedPosts.get('postSets'),
);

const makeSelectPostSet = () => createSelector(
  selectPublishedPosts,
  (publishedPosts) => publishedPosts.get('postSet')
);

export {
  makeSelectPostSets,
  makeSelectPostSet,
};
