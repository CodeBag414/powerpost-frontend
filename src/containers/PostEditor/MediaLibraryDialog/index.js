import React from 'react';
import PropTypes from 'prop-types';

import FullScreenDialog from 'elements/atm.FullScreenDialog';
import MediaItem from 'containers/MediaItemLibrary/MediaContainer/MediaItem';

import {
  SHOW_ALL,
  SHOW_BLOGS,
  SHOW_VIDEOS,
  SHOW_LINKS,
  SHOW_IMAGES,
  SHOW_FILES,
} from 'containers/PostEditor/constants';

import Wrapper from './Wrapper';
import FilterLink from './FilterLink';
import BackButton from './BackButton';

const MediaLibraryDialog = ({ isOpen, closeAllDialog, addToPost, mediaItems, actions, filter }) => (
  <FullScreenDialog
    active={isOpen}
    title="Content Hub"
    onEscKeyDown={closeAllDialog}
    onOverlayClick={closeAllDialog}
    actions={actions}
    isContent
  >
    <Wrapper>
      <BackButton><a onClick={closeAllDialog}><i className="fa fa-long-arrow-left" /> Back to Post Editor</a></BackButton>
      <div className="row">
        <div className="col-md-8">
          <FilterLink filter={SHOW_ALL} active={filter === SHOW_ALL}>All</FilterLink>
          <FilterLink filter={SHOW_BLOGS} active={filter === SHOW_BLOGS}>Blogs</FilterLink>
          <FilterLink filter={SHOW_IMAGES} active={filter === SHOW_IMAGES}>Images</FilterLink>
          <FilterLink filter={SHOW_LINKS} active={filter === SHOW_LINKS}>Links</FilterLink>
          <FilterLink filter={SHOW_VIDEOS} active={filter === SHOW_VIDEOS}>Videos</FilterLink>
          <FilterLink filter={SHOW_FILES} active={filter === SHOW_FILES}>Files</FilterLink>
        </div>
      </div>
      {mediaItems && mediaItems.map((item) => <MediaItem mediaItem={item} inPostEditor addToPost={addToPost} />)}
    </Wrapper>
  </FullScreenDialog>
);

MediaLibraryDialog.propTypes = {
  isOpen: PropTypes.bool,
  addToPost: PropTypes.func,
  closeAllDialog: PropTypes.func,
  mediaItems: PropTypes.array,
  actions: PropTypes.array,
  filter: PropTypes.string,
};

export default MediaLibraryDialog;
