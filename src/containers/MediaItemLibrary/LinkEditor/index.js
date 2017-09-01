import React, { Component } from 'react';
import PropTypes from 'prop-types';
import filepicker from 'filepicker-js';

import PPDialog from 'elements/atm.Dialog';
import TextArea from 'elements/atm.TextArea';
import PPTextField from 'elements/atm.TextField';
import FontIcon from 'elements/atm.FontIcon';
import Button from 'elements/atm.Button';
import SimpleButton from 'elements/atm.SimpleButton';
import Loading from 'components/Loading';
import theme from 'theme';

import Wrapper from './Wrapper';
import LargeImageWrapper from './LargeImageWrapper';
import SmallImageWrapper from './SmallImageWrapper';
import HeadingWrapper from './HeadingWrapper';
import BodyWrapper from './BodyWrapper';
import FooterWrapper from './FooterWrapper';

class LinkEditor extends Component {
  static propTypes = {
    urlContent: PropTypes.shape(),
    linkItem: PropTypes.shape(),
    filePickerKey: PropTypes.string,
    linkEditorDialog: PropTypes.func,
    closeAllDialog: PropTypes.func,
    handleLinkEditorSave: PropTypes.func,
  };

  constructor(props) {
    super(props);

    const { urlContent } = this.props;

    let selectedImage = {};
    let selectedImageIndex = -1;

    if (urlContent.image) {
      selectedImage = urlContent.image || '';
      selectedImageIndex = 0;
    }

    this.state = {
      titleValue: urlContent.title || '',
      descriptionValue: urlContent.description || '',
      selectedImage,
      url: '',
      selectedImageIndex,
    };

    this.removeCoverImage = this.removeCoverImage.bind(this);
    this.openFilePicker = this.openFilePicker.bind(this);
    this.handleFilePickerSuccess = this.handleFilePickerSuccess.bind(this);
    this.prepareLinkItem = this.prepareLinkItem.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.linkEditorDialog) {
      this.setState({
        selectedImage: {},
        titleValue: '',
        descriptionValue: '',
        selectedImageIndex: -1,
      });
    }

    if (nextProps.linkItem && nextProps.linkItem.properties) {
      if (this.state.url !== nextProps.linkItem.properties.link) {
        this.setState({ url: nextProps.linkItem.properties.link });
      }
      if (this.state.titleValue !== nextProps.linkItem.properties.title) {
        this.setState({ titleValue: nextProps.linkItem.properties.title });
      }
      if (this.state.captionValue !== nextProps.linkItem.properties.description) {
        this.setState({ descriptionValue: nextProps.linkItem.properties.description });
      }
      if (this.state.selectedImage !== nextProps.linkItem.properties.picture) {
        this.setState({ selectedImage: { url: nextProps.linkItem.properties.thumb_url } });
      }
    }

    if (nextProps.urlContent && nextProps.urlContent.title) {
      if (this.state.titleValue !== nextProps.urlContent.title) {
        this.setState({ titleValue: nextProps.urlContent.title });
      }
      if (this.state.captionValue !== nextProps.urlContent.description) {
        this.setState({ descriptionValue: nextProps.urlContent.description });
      }
      if (this.state.url !== nextProps.urlContent.url) {
        this.setState({ url: nextProps.urlContent.url });
      }
      if (nextProps.urlContent.image) {
        this.setState({ selectedImage: { url: nextProps.urlContent.image || '' }, selectedImageIndex: 0 });
      }
    }
  }
  handleInputChange = (name, value) => {
    this.setState({ ...this.state, [name]: value });
  };

  removeCoverImage() {
    this.setState({ selectedImage: 'remove', selectedImageIndex: -1 });
  }

  openFilePicker() {
    filepicker.setKey(this.props.filePickerKey);

    const filePickerOptions = {
      buttonText: 'Choose',
      container: 'modal',
      multiple: false,
      maxFiles: 1,
      imageQuality: 80,
      imageMax: [1200, 1200],
      services: ['CONVERT', 'COMPUTER', 'GOOGLE_DRIVE', 'DROPBOX', 'BOX', 'IMAGE_SEARCH'],
      conversions: ['crop', 'filter'],
    };
    function onFail(error) {
      console.log(`error: ${error}`);
    }
    filepicker.pick(filePickerOptions, this.handleFilePickerSuccess, onFail);
  }

  handleFilePickerSuccess(mediaItem) {
    this.setState({ selectedImage: mediaItem, selectedImageIndex: -1 });
  }

  prepareLinkItem(create) {
    let imageUrl = '';
    if (this.state.selectedImage.url) {
      imageUrl = this.state.selectedImage.url;
    }
    if (this.state.selectedImage === 'remove') {
      imageUrl = 'remove';
    }
    let createPost = false;
    if (create) {
      createPost = true;
    }

    let linkItem = {};
    if (Object.keys(this.props.linkItem).length > 0) {
      const { properties, ...rest } = this.props.linkItem;

      linkItem = {
        action: 'update',
        create: createPost,
        properties: {
          ...properties,
          title: this.state.titleValue,
          picture: imageUrl,
          description: this.state.descriptionValue,
        },
        ...rest,
      };
    } else {
      linkItem = {
        action: 'create',
        create: createPost,
        url: this.props.urlContent.url,
        title: this.state.titleValue,
        picture: imageUrl,
        description: this.state.descriptionValue,
      };
    }
    this.setState({
      selectedImage: {},
      titleValue: '',
      descriptionValue: '',
      selectedImageIndex: -1,
      url: '',
    });
    this.props.handleLinkEditorSave(linkItem, create);
  }

  render() {
    const { urlContent, linkEditorDialog, closeAllDialog, mediaLibraryContext } = this.props;
    const { url, titleValue, descriptionValue, selectedImage } = this.state;
    const create = true;
    const doNotCreate = false;

    return (
      <PPDialog
        active={linkEditorDialog}
        onEscKeyDown={closeAllDialog}
        onOverlayClick={closeAllDialog}
      >
        <Wrapper>
          <HeadingWrapper>
            <div className="header-info">
              <h3>Content Editor<span><i className="fa fa-link" />{url}</span></h3>
              <button onClick={closeAllDialog}><FontIcon value="clear" /></button>
            </div>
            <p>Modify the link information below.</p>
          </HeadingWrapper>
          <BodyWrapper>
            <div className="info-wrapper">
              <PPTextField
                type="text"
                name="title"
                floatingLabelText="Title"
                value={titleValue}
                disabled
                onChange={(e) => this.handleInputChange('titleValue', e.target.value)}
              />
              <TextArea
                floatingLabelText="Description"
                rows={3}
                value={descriptionValue}
                disabled
                onChange={(e) => this.handleInputChange('descriptionValue', e.target.value)}
              />
            </div>
            <div className="image-wrapper">
              {selectedImage && selectedImage.url &&
                <div className="cover-image">
                  <LargeImageWrapper src={selectedImage.url} />
                </div>
              }
            </div>
          </BodyWrapper>
          <FooterWrapper>
            <div className="button-wrapper" style={{ display: 'inline-block' }}>
              { mediaLibraryContext &&
                <Button onClick={() => this.prepareLinkItem(create)} primary style={{ marginRight: '5px', marginBottom: '5px' }} className={this.props.permissionClasses.addToPost} >Save & Create Post</Button>
              }
              <Button onClick={() => this.prepareLinkItem(doNotCreate)} style={{ marginBottom: '5px' }} primary>Save</Button>
            </div>
          </FooterWrapper>
          {!urlContent.url && !this.props.linkItem.properties ? <Loading opacity={0.5} showIndicator={urlContent} /> : null}
        </Wrapper>
      </PPDialog>
    );
  }
}

export default LinkEditor;
