import { createSelector } from 'reselect';

const selectPostSetEditor = (state) => state.get('postEditor');

const makeSelectComments = () => createSelector(
  selectPostSetEditor,
  (postSetEditor) => postSetEditor.get('comments'),
);

const makeSelectInProgress = () => createSelector(
  selectPostSetEditor,
  (postSetEditor) => postSetEditor.get('pending'),
);

export {
  makeSelectComments,
  makeSelectInProgress,
};
