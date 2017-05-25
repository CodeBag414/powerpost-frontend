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

const makeSelectIsProcessing = () => createSelector(
  selectPostSetEditor,
  (postSetEditor) => postSetEditor.get('isProcessing')
);

const makeSelectUrlContent = () => createSelector(
  selectPostSetEditor,
  (postSetEditor) => postSetEditor.get('urlContent')
);

const selectPostSet = () => createSelector(
  selectPostSetEditor,
  (postSetEditor) => postSetEditor.get('postSet'),
);

const makeSelectActiveCollection = () => createSelector(
   selectPostSetEditor,
    (postSetEditor) => postSetEditor.get('activeCollection')
);

const makeSelectAccountTags = () => createSelector(
  selectPostSetEditor,
  (postSetEditor) => postSetEditor.get('accountTags'),
);

const makeSelectMediaItem = () => createSelector(
  selectPostSetEditor,
  (postSetEditor) => postSetEditor.getIn(['postSet', 'details', 'media_items']),
);

const makeSelectMediaItems = () => createSelector(
  [selectPostSetEditor],
  (selectPostSetEditor) => selectPostSetEditor.get('mediaItems')
);

export {
  makeSelectComments,
  makeSelectAccountTags,
  makeSelectInProgress,
  makeSelectActiveCollection,
  selectPostSet,
  makeSelectUrlContent,
  makeSelectMediaItem,
  makeSelectMediaItems,
  makeSelectIsProcessing,
};
