import React from 'react';
import Wrapper from './Wrapper';
import PPDialog from 'elements/atm.Dialog';
import Input from 'react-toolbox/lib/input';
import Button from 'elements/atm.Button';
import LargeImageWrapper from './LargeImageWrapper';


class VideoEditor extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      titleValue: this.props.videoItem.properties && this.props.videoItem.properties.title || '',
      descriptionValue: this.props.videoItem.properties && this.props.videoItem.properties.description || '',
      source: false,
      selectedImage: false,
    };
    
    this.prepareItem = this.prepareItem.bind(this);
    this.removeCoverImage = this.removeCoverImage.bind(this);
    this.openFilePicker = this.openFilePicker.bind(this);
    this.handleFilePickerSuccess = this.handleFilePickerSuccess.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    if (!this.state.titleValue && nextProps.videoItem.properties && nextProps.videoItem.properties.title) {
      this.setState({ titleValue: nextProps.videoItem.properties.title });
    }
    if (!this.state.descriptionValue && nextProps.videoItem.properties && nextProps.videoItem.properties.description) {
      this.setState({ descriptionValue: nextProps.videoItem.properties.description});
    }
    if (!this.state.source && nextProps.videoItem.properties) {
      this.setState({ source: nextProps.videoItem.source_url || nextProps.videoItem.properties.url });
    }
    if (nextProps.videoItem.properties && nextProps.videoItem.properties.thumb_url && !this.state.selectedImage) {
      this.setState({ selectedImage: {url:nextProps.videoItem.properties.thumb_url} });
    }
    if (!nextProps.isOpen) {
     this.setState({
        selectedImage: false,
        titleValue: '',
        descriptionValue: '',
        source: false,
      });
    }
  }
  
  handleInputChange = (name, value) => {
    this.setState({...this.state, [name]: value});
  };
  
  removeCoverImage() {
    this.setState({ selectedImage: {}, selectedImageIndex: false });
  }

  
  prepareItem() {
    let Item = {};
    if (this.props.videoItem.media_item_id) {
      const {properties, ...rest} = this.props.videoItem;
      const {title, description, ...other} = properties;
      Item = {
        action: 'update',
        properties: {
          ...other,
          title: this.state.titleValue || title || '',
          description: this.state.descriptionValue || description || '',
          picture: this.state.selectedImage.url,
        },
        ...rest,
      };
      console.log(Item);
    } else {
      Item = {
        action: 'create',
        mediaItemType: this.props.videoItem.mediaItemType,
        properties: {
          title: this.state.titleValue,
          description: this.state.descriptionValue,
          picture: this.state.selectedImage.url || '',
          ...this.props.videoItem.properties,
        }
      };
    }
    
    this.setState({
      titleValue: '',
      descriptionValue: '',
      selectedImage: false,
      source: false,
    });
      
    console.log(Item);
    this.props.handleSave(Item);
  }

  removeCoverImage() {
    this.setState({ selectedImage: {} });
  }
  
  openFilePicker() {
    const filepicker = require('filepicker-js');
    filepicker.setKey(this.props.filePickerKey);
    
    const filePickerOptions = { 
      buttonText: 'Choose', 
      container:'modal', 
      multiple: false,
      maxFiles: 1, 
      imageQuality: 80, 
      imageMax: [1200, 1200], 
      services: [ 'COMPUTER', 'WEBCAM', 'VIDEO', 'IMAGE_SEARCH', 'FLICKR', 'GOOGLE_DRIVE', 'FACEBOOK', 'INSTAGRAM', 'BOX', 'SKYDRIVE', 'URL'],
      conversions: ['crop', 'filter'],
    };
    function onFail(error) {
      console.log('error: ' + error);
    }
    filepicker.pick(filePickerOptions, this.handleFilePickerSuccess, onFail);
  }
  
  handleFilePickerSuccess(mediaItem) {
    this.setState({ selectedImage: mediaItem, selectedImageIndex: false, });
  }
  
  render() {
    return(
      <PPDialog
        active={this.props.isOpen}
        title='Video Editor'
        onEscKeyDown={this.props.closeAllDialog}
        onOverlayClick={this.props.closeAllDialog}
        actions={this.props.actions}
        type="large"
      >
        <Wrapper>
          <div className='row'>
            <div className="embed-responsive embed-responsive-16by9">
              <iframe className="embed-responsive-item" src={this.state.source}></iframe>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <h2>Video Information</h2>
              <Input type="text" value={this.state.titleValue} label="Video Title" onChange={this.handleInputChange.bind(this, 'titleValue')} />
              <Input type="text" multiline value={this.state.descriptionValue} label="Video Description" onChange={this.handleInputChange.bind(this, 'descriptionValue')} />
            </div>
            <div className="col-md-6">
              { this.state.selectedImage &&
                <div style={{ textAlign: 'center' }}>
                  <LargeImageWrapper src={ this.state.selectedImage.url } />
                </div>
              }
              <div style={{ marginTop: '10px', textAlign: 'center', marginBottom: '10px' }}>
                <Button label="Upload Cover Image" onClick={this.openFilePicker} primary style={{ margin: '5px' }}/>
                { this.state.selectedImage &&
                  <Button label="Remove Cover Image" onClick={this.removeCoverImage} style={{ margin: '5px' }}/>
                }
              </div>
            </div>
          </div>
          <div style={{height: '60px', textAlign: 'right'}}>
          <Button label="Save" primary onClick={this.prepareItem} style={{marginTop: '20px'}} />
          </div>
        </Wrapper>
      </PPDialog>    
    );
  }
}

export default VideoEditor;