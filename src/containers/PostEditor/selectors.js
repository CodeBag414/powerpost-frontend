import { createSelector } from 'reselect';
import {
  SHOW_ALL,
  SHOW_BLOGS,
  SHOW_IMAGES,
  SHOW_LINKS,
  SHOW_VIDEOS,
  SHOW_FILES,
} from './constants';
const selectPostSetEditor = (state) => state.get('postEditor');

const makeSelectComments = () => createSelector(
  selectPostSetEditor,
  (postSetEditor) => postSetEditor.get('comments'),
);

const makeSelectEmbedData = () => createSelector(
  selectPostSetEditor,
  (postSetEditor) => postSetEditor.get('embedData')
);

const makeSelectFilter = () => createSelector(
  [selectPostSetEditor],
  (postSetEditor) => postSetEditor.get('filter')
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

const makeSelectActiveCollection = () => createSelector(
   selectPostSetEditor,
    (postSetEditor) => postSetEditor.get('activeCollection')
);

const makeSelectAccountTags = () => createSelector(
  selectPostSetEditor,
  (postSetEditor) => postSetEditor.get('accountTags'),
);

const makeSelectMediaItems = () => createSelector(
  [selectPostSetEditor],
  (postSetEditor) => postSetEditor.get('mediaItems')
);

const makeSelectVisibleMediaItems = () => createSelector(
  [makeSelectMediaItems(), makeSelectFilter()],
  (mediaItems, filter) => {
    switch (filter) {
      case SHOW_ALL:
        return mediaItems;
      case SHOW_BLOGS:
        return mediaItems.filter((t) => t.type === 'blog');
      case SHOW_IMAGES:
        return mediaItems.filter((t) => t.type === 'image');
      case SHOW_LINKS:
        return mediaItems.filter((t) => t.type === 'link');
      case SHOW_VIDEOS:
        return mediaItems.filter((t) => t.type === 'video');
      case SHOW_FILES:
        return mediaItems.filter((t) => t.type === 'document');
      default:
        return mediaItems;
    }
  });

const selectWordpressGUI = () => createSelector(
  selectPostSetEditor,
  (postSetEditor) => postSetEditor.get('wordpressGUI'),
);

const selectNewMediaItem = () => createSelector(
  selectPostSetEditor,
  (postSetEditor) => postSetEditor.get('newMediaItem'),
);

const selectFacebookEntities = () => createSelector(
  selectPostSetEditor,
  (postSetEditor) => postSetEditor.get('facebookEntities'),
);

export {
  makeSelectComments,
  makeSelectAccountTags,
  makeSelectInProgress,
  makeSelectActiveCollection,
  makeSelectUrlContent,
  makeSelectMediaItems,
  makeSelectIsProcessing,
  makeSelectFilter,
  makeSelectVisibleMediaItems,
  selectWordpressGUI,
  selectNewMediaItem,
  selectFacebookEntities,
  makeSelectEmbedData,
};
