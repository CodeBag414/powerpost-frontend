import React from 'react';
import Wrapper from './Wrapper';
import PPDialog from 'elements/atm.Dialog';
import Input from 'react-toolbox/lib/input';
import Button from 'elements/atm.Button';
import MediaItem from 'containers/MediaItemLibrary/MediaContainer/MediaItem';

class MediaLibraryDialog extends React.Component {
  constructor(props) {
    super(props);
  
  }
  
  componentWillReceiveProps(nextProps) {
  
  }
  
  render() {
    return(
      <PPDialog
        active={this.props.isOpen}
        title='Media Library'
        onEscKeyDown={this.props.closeAllDialog}
        onOverlayClick={this.props.closeAllDialog}
        actions={this.props.actions}
        type="large"
      >
        <Wrapper>
        { this.props.mediaItems && this.props.mediaItems.map((item, i) => <MediaItem mediaItem={item} inPostEditor={true} addToPost={this.props.addToPost} />)}
        </Wrapper>
      </PPDialog>    
    );
  }
}

export default MediaLibraryDialog;