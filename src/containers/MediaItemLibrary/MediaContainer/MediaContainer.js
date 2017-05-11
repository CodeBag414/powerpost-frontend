import React from 'react';
import Wrapper from './Wrapper';
import MediaItem from './MediaItem';


const MediaContainer = (props) => {
  console.log(props);
  return(
    <Wrapper className='row'>
      { !props.visibleMediaItems && <span>You don't have any media items yet.</span> }
      { props.visibleMediaItems && props.visibleMediaItems.slice(0).reverse().map((item, i) => <MediaItem key={i} mediaItem={item} onDelete={props.onConfirmDelete} openPreview={props.openPreview} />)}
    </Wrapper>
  );
};

export default MediaContainer;