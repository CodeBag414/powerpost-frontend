import React from 'react';
import Wrapper from './Wrapper';
import PPDialog from 'elements/atm.Dialog';
import Input from 'react-toolbox/lib/input';
import Button from 'elements/atm.Button';
import LargeImageWrapper from './LargeImageWrapper';


class FileEditor extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      titleValue: this.props.fileItem.properties && this.props.fileItem.properties.title || '',
      descriptionValue: this.props.fileItem.properties && this.props.fileItem.properties.description || '',
      selectedImage: false,
    };
    
    this.prepareItem = this.prepareItem.bind(this);
    this.removeCoverImage = this.removeCoverImage.bind(this);
    this.openFilePicker = this.openFilePicker.bind(this);
    this.handleFilePickerSuccess = this.handleFilePickerSuccess.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    if (!this.state.titleValue && nextProps.fileItem.properties && nextProps.fileItem.properties.title) {
      this.setState({ titleValue: nextProps.fileItem.properties.title });
    }
    if (!this.state.descriptionValue && nextProps.fileItem.properties && nextProps.fileItem.properties.description) {
      this.setState({ descriptionValue: nextProps.fileItem.properties.description});
    }
    if (!this.state.source && nextProps.fileItem.properties) {
      this.setState({ source: nextProps.fileItem.source_url || nextProps.fileItem.properties.url });
    }
    if (nextProps.fileItem.properties && nextProps.fileItem.properties.thumb_url && !this.state.selectedImage) {
      this.setState({ selectedImage: {url:nextProps.fileItem.properties.thumb_url} });
    }
    if (!nextProps.isOpen) {
     this.setState({
        selectedImage: false,
        titleValue: '',
        descriptionValue: '',
      });
    }
  }
  
  handleInputChange = (name, value) => {
    this.setState({...this.state, [name]: value});
  };
  
  removeCoverImage() {
    this.setState({ selectedImage: {} });
  }

  
  prepareItem() {
    let Item = {};
    if (this.props.fileItem.media_item_id) {
      const {properties, ...rest} = this.props.fileItem;
      const {title, description, ...other} = properties;
      Item = {
        action: 'update',
        properties: {
          ...other,
          title: this.state.titleValue || title || '',
          description: this.state.descriptionValue || description || '',
        },
        ...rest,
      };
      console.log(Item);
    } else {
      Item = {
        action: 'create',
        mediaItemType: this.props.fileItem.mediaItemType,
        properties: {
          title: this.state.titleValue,
          description: this.state.descriptionValue,
          ...this.props.fileItem.properties,
        }
      };
    }
    
    this.setState({
      titleValue: '',
      descriptionValue: '',
      selectedImage: false,
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

export default FileEditor;