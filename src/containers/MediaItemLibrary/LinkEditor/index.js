import React from 'react';
import Wrapper from './Wrapper';
import PPDialog from 'elements/atm.Dialog';
import Spinner from 'elements/atm.Spinner';
import Input from 'react-toolbox/lib/input';
import Button from 'elements/atm.Button';
import LargeImageWrapper from './LargeImageWrapper';
import SmallImageWrapper from './SmallImageWrapper';

class LinkEditor extends React.Component {
  constructor(props) {
    super(props);
    let selectedImage = false;
    if(this.props.urlContent.images && this.props.urlContent.images.length) {
      selectedImage = this.props.urlContent.images[0];
    }
    
    this.state = {
      titleValue: this.props.urlContent.title || false,
      descriptionValue: this.props.urlContent.description || false,
      selectedImage: selectedImage,
      url: '',
      selectedImageIndex: 0,
    };
    
    this.removeCoverImage = this.removeCoverImage.bind(this);
    this.openFilePicker = this.openFilePicker.bind(this);
    this.handleFilePickerSuccess = this.handleFilePickerSuccess.bind(this);
    this.prepareLinkItem = this.prepareLinkItem.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    if (!this.state.titleValue && nextProps.urlContent.title) {
      this.setState({ titleValue: nextProps.urlContent.title });
    }
    if (!this.state.captionValue && nextProps.urlContent.description) {
      this.setState({ descriptionValue: nextProps.urlContent.description});
    }
    if (!this.state.url && nextProps.urlContent.original_url) {
      this.setState({ url: nextProps.urlContent.original_url });
    }
    if (!this.state.url && (nextProps.linkItem && nextProps.linkItem.properties && nextProps.linkItem.properties.link)) {
      this.setState({ url: nextProps.linkItem.properties.link });
    }
    if (!this.state.titleValue && (nextProps.linkItem && nextProps.linkItem.properties && nextProps.linkItem.properties.title)) {
      this.setState({ titleValue: nextProps.linkItem.properties.title });
    }
    if (!this.state.captionValue && (nextProps.linkItem && nextProps.linkItem.properties && nextProps.linkItem.properties.description)) {
      console.log('in update');
      this.setState({ descriptionValue: nextProps.linkItem.properties.description});
    }
    if (nextProps.urlContent.images && nextProps.urlContent.images.length && !this.state.selectedImage) {
      this.setState({ selectedImage: nextProps.urlContent.images[0], selectedImageIndex: 0 });
    }
    if (nextProps.linkItem && nextProps.linkItem.properties && nextProps.linkItem.properties.picture && !this.state.selectedImage) {
      this.setState({ selectedImage: {url: nextProps.linkItem.properties.picture} });
    }
    if (!nextProps.linkEditorDialog) {
      this.setState({
        selectedImage: false,
        titleValue: '',
        descriptionValue: '',
        selectedImageIndex: 0,
      });
    }
  }
  handleInputChange = (name, value) => {
    this.setState({...this.state, [name]: value});
  };
  
  removeCoverImage() {
    this.setState({ selectedImage: {}, selectedImageIndex: false });
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
  
  prepareLinkItem() {
    let imageUrl = '';
    if (this.state.selectedImage) {
      imageUrl = this.state.selectedImage.url;
    }
    let linkItem = {};
    if (Object.keys(this.props.linkItem).length > 0) {
      const {properties, ...rest} = this.props.linkItem;
      const {title, description, ...other} = properties;
      linkItem = {
        action: 'update',
        properties: {
          ...other,
          title: this.state.titleValue,
          description: this.state.descriptionValue,
        },
        ...rest,
      };
      console.log(linkItem);
    } else {
      linkItem = {
        action: 'create',
        url: this.props.urlContent.url,
        title: this.state.titleValue,
        description: this.state.descriptionValue,
        picture: imageUrl,
      };
    }
    this.setState({
      selectedImage: false,
      titleValue: '',
      descriptionValue: '',
      selectedImageIndex: 0,
      url: '',
    });
    
    this.props.handleLinkEditorSave(linkItem);
  }
  
  render() {
    return(
      <PPDialog
        active={this.props.linkEditorDialog}
        title='Link Editor'
        onEscKeyDown={this.props.closeAllDialog}
        onOverlayClick={this.props.closeAllDialog}
        actions={this.props.actions}
        type="large"
      >
        <Wrapper>
          { !this.props.urlContent.images && !this.props.linkItem && <Spinner /> }
          { (this.props.urlContent.images || this.props.linkItem) &&
            <div>
              <Input type='text' label='Destination URL' value={this.state.url} disabled />
              <div className="row">
                <div className="col-sm-6">
                  <h2>Link Information</h2>
                  <Input type="text" value={this.state.titleValue} label="Link Title" onChange={this.handleInputChange.bind(this, 'titleValue')} />
                  <Input type="text" multiline value={this.state.descriptionValue} label="Link Description" onChange={this.handleInputChange.bind(this, 'descriptionValue')} />
                  { (this.props.urlContent.images && this.props.urlContent.images.length > 0) &&
                    <div>
                        <div>Images returned from URL:</div>
                        <div style={{ marginTop: '20px', minHeight: '100px' }}>
                            { this.props.urlContent.images.map((image, i) =>
                                <div key={i} style={{ height: '75px', width: '100px', float: 'left', margin: '10px' }}>
                                    <SmallImageWrapper src={image.url} isSelected={this.state.selectedImageIndex == i} onClick={ () => { this.setState({ selectedImage: image, selectedImageIndex: i }); } }/>
                                </div>
                            )}
                        </div>
                        
                    </div>
                }
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
            </div>
          }
        <div style={{height: '60px', textAlign: 'right'}}>
          <Button label="Save Link" primary style={{ marginTop: '20px' }} onClick={this.prepareLinkItem} />
        </div>
        </Wrapper>
      </PPDialog>    
    );
  }
}

export default LinkEditor;