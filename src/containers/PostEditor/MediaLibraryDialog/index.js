import React from 'react';
import FullScreenDialog from 'elements/atm.FullScreenDialog';
import MediaItem from 'containers/MediaItemLibrary/MediaContainer/MediaItem';
import styled from 'styled-components';

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

const BackButton = styled.div`
  position: absolute;
  top: 30px;
  padding: 20px;
`;

class MediaLibraryDialog extends React.Component {
  render() {
    return(
      <FullScreenDialog
        active={this.props.isOpen}
        title='Content Hub'
        onEscKeyDown={this.props.closeAllDialog}
        onOverlayClick={this.props.closeAllDialog}
        actions={this.props.actions}
        isContent
      >
        <Wrapper>
        <BackButton><a onClick={this.props.closeAllDialog}><i className='fa fa-long-arrow-left' /> Back to Post Editor</a></BackButton>
        <div className="row">
          <div className="col-md-8">
            <FilterLink filter={SHOW_ALL} active={this.props.filter === SHOW_ALL}>All</FilterLink>
            <FilterLink filter={SHOW_BLOGS} active={this.props.filter === SHOW_BLOGS}>Blogs</FilterLink>
            <FilterLink filter={SHOW_IMAGES} active={this.props.filter === SHOW_IMAGES}>Images</FilterLink>
            <FilterLink filter={SHOW_LINKS} active={this.props.filter === SHOW_LINKS}>Links</FilterLink>
            <FilterLink filter={SHOW_VIDEOS} active={this.props.filter === SHOW_VIDEOS}>Videos</FilterLink>
            <FilterLink filter={SHOW_FILES} active={this.props.filter === SHOW_FILES}>Files</FilterLink>
          </div>
        </div>
        { this.props.mediaItems  && this.props.mediaItems.map((item, i) => <MediaItem mediaItem={item} inPostEditor={true} addToPost={this.props.addToPost} />)}
        </Wrapper>
      </FullScreenDialog>    
    );
  }
}

export default MediaLibraryDialog;
