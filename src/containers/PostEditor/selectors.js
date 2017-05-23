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

const makeSelectAccountTags = () => createSelector(
  selectPostSetEditor,
  (postSetEditor) => postSetEditor.get('accountTags'),
);

const makeSelectMediaItem = () => createSelector(
  selectPostSetEditor,
  (postSetEditor) => postSetEditor.getIn(['postSet', 'details', 'media_items']),
);

export {
  makeSelectComments,
  makeSelectAccountTags,
  makeSelectInProgress,
  selectPostSet,
  makeSelectMediaItem,
};
