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

const selectPostSet = () => createSelector(
  selectPostSetEditor,
  (postSetEditor) => postSetEditor.get('postSet'),
);

export {
  makeSelectComments,
  makeSelectInProgress,
  selectPostSet,
};
