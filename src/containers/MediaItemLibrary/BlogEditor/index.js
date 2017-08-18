import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { htmlEncode, htmlDecode } from 'js-htmlencode';
import filepicker from 'filepicker-js';
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css';
import 'bootstrap/js/modal';
import 'bootstrap/js/dropdown';
import 'bootstrap/js/tooltip';
import 'bootstrap/dist/css/bootstrap.css';

import Button from 'elements/atm.Button';
import TextArea from 'elements/atm.TextArea';
import PPTextField from 'elements/atm.TextField';
import SimpleButton from 'elements/atm.SimpleButton';
import FullScreenDialog from 'elements/atm.FullScreenDialog';

import theme from 'theme';

import {
  makeSelectUser,
} from 'containers/App/selectors';

import Wrapper from './Wrapper';
import LargeImageWrapper from './LargeImageWrapper';
import GeneralInfo from './GeneralInfo';

class BlogEditor extends Component {
  static propTypes = {
    location: PropTypes.shape(),
    user: PropTypes.shape(),
    onUpdate: PropTypes.func,
    filePickerKey: PropTypes.string,
    onCreate: PropTypes.func,
    selectedItem: PropTypes.shape(),
  }

  constructor(props) {
    super(props);

    const selectedItem = props.selectedItem;

    this.state = {
      titleValue: selectedItem === null ? '' : selectedItem.properties.title,
      descriptionValue: selectedItem === null ? '' : selectedItem.properties.caption,
      selectedImage: selectedItem === null ?
      {}
      :
        {
          key: selectedItem.properties.thumb_key,
          url: selectedItem.properties.thumb_url,
        },
      creationTime: selectedItem === null ? 0 : selectedItem.creation_time,
      content: selectedItem === null ? '' : selectedItem.properties.html,
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.embedData.url) {
      this.injectEmbed(nextProps.embedData);
    }
  }

  injectEmbed = (embedData) => {
    const iframe = document.createElement('iframe');
    const container = document.createElement('div');
    const maxWidth = embedData.media.width;
    container.style.cssText = 'position:relative;width:100%;max-width:' + maxWidth + 'px;height:0;padding-bottom: 51%;';
    iframe.src = embedData.iframe_src;
    iframe.style.cssText = 'position:absolute;width:100%;max-width:' + maxWidth + 'px;height:100%;left:0;top:0;';
    container.appendChild(iframe);
    ReactSummernote.insertNode(container);
  }

  onBack = () => {
    const hash = this.props.location.hash
    if (hash.startsWith('#blog-editor')) {
      this.props.pushToRoute(this.props.location.pathname);
    } else if (hash.startsWith('#postset')) {
      const newHash = hash.split('#');
      this.props.pushToRoute(`${this.props.location.pathname}#${newHash[1]}`);
    }
  }

  onChange = (content) => {
    this.setState({ content: htmlEncode(content) });
  }

  onSaveBlog = (e) => {
    e.preventDefault();

    const payload = {
      title: this.state.titleValue,
      caption: this.state.descriptionValue,
      html: this.state.content,
      thumb_key: this.state.selectedImage && this.state.selectedImage.key,
    };

    this.props.onCreate(payload);
  }

  onUpdateBlog = (e) => {
    e.preventDefault();

    const payload = {
      title: this.state.titleValue,
      caption: this.state.descriptionValue,
      html: this.state.content,
      thumb_key: this.state.selectedImage && this.state.selectedImage.key,
    };
    const item = this.props.selectedItem;
    item.properties = payload;
    this.props.onUpdate(item);
  }

  handleInputChange = (name, value) => {
    this.setState({ ...this.state, [name]: value });
  }

  handleFilePickerSuccess = (mediaItem) => {
    this.setState({ selectedImage: mediaItem, selectedImageIndex: -1 });
  }

  removeCoverImage = () => {
    this.setState({ selectedImage: {}, selectedImageIndex: -1 });
  }

  openFilePicker = () => {
    filepicker.setKey(this.props.filePickerKey);

    const filePickerOptions = {
      buttonText: 'Choose',
      container: 'modal',
      multiple: false,
      maxFiles: 1,
      imageQuality: 80,
      imageMax: [1200, 1200],
      services: ['CONVERT', 'COMPUTER', 'GOOGLE_DRIVE', 'DROPBOX', 'BOX', 'IMAGE_SEARCH', 'FACEBOOK', 'INSTAGRAM'],
      conversions: ['crop', 'filter'],
    };
    function onFail(error) {
      console.log(`error: ${error}`);
    }
    filepicker.pick(filePickerOptions, this.handleFilePickerSuccess, onFail);
  }

  addImage = () => {
    const img = document.createElement('img');
    ReactSummernote.insertNode(img);
  }
  render() {
    const { user, selectedItem } = this.props;
    const { titleValue, descriptionValue, selectedImage, creationTime, content } = this.state;

    return (
      <FullScreenDialog
        active={true}
        title="Blog Editor"
        isContent
      >
        <Wrapper>
          <GeneralInfo
            blogName={titleValue || ''}
            creationTime={creationTime || ''}
            user={user}
            onBack={this.onBack}
            handleInputChange={this.handleInputChange}
          />
          <div style={{ padding: '10px' }} >
            <Button
              primary
              label="Add Image"
              onClick={this.props.openAddFile}
              style={{ marginLeft: '15px', marginRight: '15px' }}
            />
            <Button
              primary
              label="Embed Link"
              onClick={this.props.openAddLink}
            />
          </div>
          <div className="content-wrapper">
            <div className="main">
              <ReactSummernote
                value={htmlDecode(content || '')}
                options={{
                  dialogsInBody: true,
                  height: '70vh',
                  toolbar: [
                    ['fontname', ['fontname', 'fontsize', 'color']],
                    ['font', ['bold', 'italic', 'underline']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ['insert', ['link']],
                    ['view', ['fullscreen', 'codeview']],
                  ],
                  fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Merriweather'],
                }}
                onChange={this.onChange}
              />
            </div>
            <div className="right-pane">
              <div className="button-wrapper">
                {/* <Button
                  label="Create a Post"
                  onClick={this.createPost}
                  style={{ float: 'left', marginTop: '30px', marginLeft: '10px' }}
                />*/}
                <Button
                  primary
                  label={selectedItem === null ? 'Save Blog' : 'Update Blog'}
                  onClick={selectedItem === null ? this.onSaveBlog : this.onUpdateBlog}
                  style={{ float: 'left', marginTop: '30px', marginLeft: '10px' }}
                />
              </div>
              <TextArea
                floatingLabelText="Description"
                rows={5}
                value={descriptionValue || ''}
                onChange={(e) => this.handleInputChange('descriptionValue', e.target.value)}
              />
              <div className="image-wrapper">
                {selectedImage && selectedImage.url &&
                  <div className="header">
                    <p>Cover Image</p>
                    <SimpleButton
                      style={{ fontSize: '13px' }}
                      color={theme.textColor}
                      onClick={this.removeCoverImage}
                      noBorder
                    >
                      Remove
                    </SimpleButton>
                  </div>
                }
                {selectedImage && selectedImage.url &&
                  <div className="cover-image">
                    <LargeImageWrapper src={selectedImage.url} />
                  </div>
                }
                <SimpleButton
                  style={{ fontSize: '13px' }}
                  color={theme.textColor}
                  onClick={this.openFilePicker}
                  noBorder
                >
                  Upload New Cover Image
                </SimpleButton>
              </div>
            </div>
          </div>
        </Wrapper>
      </FullScreenDialog>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

export default connect(mapStateToProps)(BlogEditor);
