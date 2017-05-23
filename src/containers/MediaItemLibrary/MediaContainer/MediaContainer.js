import React from 'react';
import Wrapper from './Wrapper';
import MediaItem from './MediaItem';
import ProcessingItem from './ProcessingItem';

const MediaContainer = (props) => {
  return(
    <Wrapper className='row'>
      { !props.visibleMediaItems && <span>You don't have any media items yet.</span> }
      { props.processingItem && <ProcessingItem />}
      { props.visibleMediaItems && props.visibleMediaItems.map((item, i) => <MediaItem key={i} mediaItem={item} query={props.query} pushToEditor={props.pushToEditor} onDelete={props.onConfirmDelete} openPreview={props.openPreview} openEditor={props.openEditor} />)}
    </Wrapper>
  );
};

export default MediaContainer;