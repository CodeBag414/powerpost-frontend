import { createSelector } from 'reselect';

const selectLibrary = (state) => state.get('library');

const makeSelectActiveCollection = () => createSelector(
   selectLibrary,
    (library) => library.get('activeCollection')
);

const makeSelectUrlContent = () => createSelector(
  selectLibrary,
  (library) => library.get('urlContent')
);

const makeSelectMediaItems = () => createSelector(
  selectLibrary,
  (library) => library.get('mediaItems')
);

export {
    makeSelectActiveCollection,
    makeSelectUrlContent,
    makeSelectMediaItems,
};
