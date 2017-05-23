import React from 'react';
import Wrapper from './Wrapper';
import PPDialog from 'elements/atm.Dialog';
import Input from 'react-toolbox/lib/input';
import Button from 'elements/atm.Button';
import LargeImageWrapper from './LargeImageWrapper';


class ImageEditor extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      titleValue: this.props.imageItem.properties && this.props.imageItem.properties.title || '',
      descriptionValue: this.props.imageItem.properties && this.props.imageItem.properties.description || '',
      selectedImage: this.props.imageItem.url || false,
    };
    
    this.prepareItem = this.prepareItem.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    if (!this.state.titleValue && nextProps.imageItem.properties && nextProps.imageItem.properties.title) {
      this.setState({ titleValue: nextProps.imageItem.properties.title });
    }
    if (!this.state.descriptionValue && nextProps.imageItem.properties && nextProps.imageItem.properties.description) {
      this.setState({ descriptionValue: nextProps.imageItem.properties.description});
    }
    if (nextProps.imageItem.properties && nextProps.imageItem.properties.url && !this.state.selectedImage) {
      this.setState({ selectedImage: nextProps.imageItem.properties.url });
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
    this.setState({ selectedImage: {}, selectedImageIndex: false });
  }

  
  prepareItem() {
    let Item = {};
    if (this.props.imageItem.media_item_id) {
      const {properties, ...rest} = this.props.imageItem;
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
        mediaItemType: this.props.imageItem.mediaItemType,
        properties: {
          title: this.state.titleValue,
          description: this.state.descriptionValue,
          ...this.props.imageItem.properties,
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
  
  render() {
    return(
      <PPDialog
        active={this.props.isOpen}
        title='Image Editor'
        onEscKeyDown={this.props.closeAllDialog}
        onOverlayClick={this.props.closeAllDialog}
        actions={this.props.actions}
        type="large"
      >
        <Wrapper>
          <div className="row">
            <div className="col-sm-6">
              <h2>Image Information</h2>
              <Input type="text" value={this.state.titleValue} label="Image Title" onChange={this.handleInputChange.bind(this, 'titleValue')} />
              <Input type="text" multiline value={this.state.descriptionValue} label="Image Description" onChange={this.handleInputChange.bind(this, 'descriptionValue')} />
            </div>
            <div className="col-md-6">
                <div style={{ textAlign: 'center' }}>
                  <LargeImageWrapper src={ this.state.selectedImage } />
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

export default ImageEditor;