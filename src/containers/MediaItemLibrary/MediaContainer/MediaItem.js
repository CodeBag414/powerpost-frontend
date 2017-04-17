import React from 'react';
import styled from 'styled-components';


const MediaItem = (props) => {
  console.log(props.mediaItem);
  return(
    <div>
      <div className='row' style={{ height: '60px'}}>
        <div className='col-md-5' style={{ height: '100%'}}>
          <span style={{lineHeight: '60px'}}><img src={props.mediaItem.properties.thumb_url || ''} style={{ width: '45px', height: '45px' }}/>{props.mediaItem.properties.description}</span>
        </div>
        <div className='col-md-2' style={{ height: '100%'}}>
          <span style={{lineHeight: '60px'}} >{props.mediaItem.type}</span>
        </div>
        <div className='col-md-3' style={{ height: '100%'}}>
          <span style={{lineHeight: '60px'}}>{props.mediaItem.creation_time}</span>
        </div>
        <div className='col-md-2' style={{ height: '100%'}}>
          <span style={{lineHeight: '60px'}}>{props.mediaItem.user_display_name}</span>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default MediaItem;