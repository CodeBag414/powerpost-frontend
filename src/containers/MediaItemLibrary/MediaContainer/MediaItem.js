import React from 'react';
import styled from 'styled-components';


const MediaItem = (props) => {
  console.log(props.mediaItem);
  return(
    <div className='row'>
      <div className='col-md-5'>
       
      </div>
      <div className='col-md-2'>
       
      </div>
      <div className='col-md-3'>
        { props.mediaItem.creation_time }
      </div>
      <div className='col-md-2'>
        
      </div>
      <hr />
    </div>
  );
};

export default MediaItem;