import React from 'react';
import Wrapper from './Wrapper';
import MediaItem from './MediaItem';


const MediaContainer = (props) => {
  console.log(props.mediaItems);
  return(
    <Wrapper className='row'>
      <div className='col-md-5'>
        Name
      </div>
      <div className='col-md-2'>
        Kind
      </div>
      <div className='col-md-3'>
        Date Added
      </div>
      <div className='col-md-2'>
        Owner
      </div>
      <hr />
      { !props.mediaItems && <span>You don't have any media items yet.</span> }
      { props.mediaItems && props.mediaItems.map((item, i) => <MediaItem key={i} mediaItem={item} />)}
    </Wrapper>
  );
};

export default MediaContainer;