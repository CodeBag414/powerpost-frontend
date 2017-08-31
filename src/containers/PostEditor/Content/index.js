import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Map, fromJS } from 'immutable';
import { routerActions } from 'react-router-redux';
import filepicker from 'filepicker-js';
import * as linkify from 'linkifyjs';
import ReactSummernote from 'react-summernote';
import { getMediaTypeAndItem } from 'utils/media';

import LinkEditor from 'containers/MediaItemLibrary/LinkEditor';
import FileEditor from 'containers/MediaItemLibrary/FileEditor';
import VideoEditor from 'containers/MediaItemLibrary/VideoEditor';
import LinkDialog from 'containers/MediaItemLibrary/LinkDialog';
import ImageEditor from 'containers/MediaItemLibrary/ImageEditor';
import BlogEditor from 'containers/MediaItemLibrary/BlogEditor';
import PostPreview from 'containers/PostEditor/PostPreview';
import EmbedDialog from 'containers/MediaItemLibrary/EmbedDialog';

import {
  setProcessing,
} from 'containers/Main/actions';

import {
  makeSelectFilePickerKey,
} from 'containers/App/selectors';

import {
  createMediaItem,
  updateMediaItem,
  removeMediaItem,
  setMediaItem,
  fetchUrlData,
  clearUrlContent,
  getEmbedData,
  createBlogItemRequest,
} from 'containers/PostEditor/actions';

import {
  makeSelectVisibleMediaItems,
  makeSelectInProgress,
  makeSelectUrlContent,
  makeSelectIsProcessing,
  makeSelectFilter,
  makeSelectEmbedData,
} from 'containers/PostEditor/selectors';

import PopupBorder from 'components/PopupBorder';

import Wrapper from './Wrapper';
import MessageEditor from '../MessageEditor';
import MediaLibraryDialog from '../MediaLibraryDialog';
import ChannelsRow from './ChannelsRow';
import MessageEditorWrapper from './MessageEditorWrapper';

import { CHANNELS } from './constants';

function getHasWordPressPost(postSet) {
  postSet.getIn(['data', 'posts']).some((post) => {
    if (post.get('status') === '0') return false;
    if (post.get('connection_channel') === 'wordpress') return true;
    return false;
  });
}

class Content extends Component {
  static propTypes = {
    pending: PropTypes.bool,
    postSet: PropTypes.object,
    accountId: PropTypes.number,
    filePickerKey: PropTypes.string,
    isProcessing: PropTypes.bool,
    pushToLibrary: PropTypes.func,
    id: PropTypes.string,
    urlContent: PropTypes.string,
    filter: PropTypes.string,
    mediaItems: PropTypes.array,
    updatePostSet: PropTypes.func,
    clearUrlContent: PropTypes.func,
    createMediaItem: PropTypes.func,
    updateMediaItem: PropTypes.func,
    fetchUrlData: PropTypes.func,
    removeMediaItem: PropTypes.func,
    setMediaItem: PropTypes.func,
    permissionClasses: PropTypes.object,
    setProcessing: PropTypes.func,
    availableFBChannel: PropTypes.string,
    location: PropTypes.object,
    getEmbedData: PropTypes.func,
    pushToRoute: PropTypes.func,
    embedData: PropTypes.object,
    goBack: PropTypes.func,
    createBlogItem: PropTypes.func,
  };

  static defaultProps = {
    params: {},
  };

  constructor(props) {
    super(props);
    const message = !props.postSet.get('data').isEmpty() ? props.postSet.getIn(['data', 'message']) : '';
    const mediaItems = !props.postSet.get('data').isEmpty() ? props.postSet.getIn(['data', 'media_items']).toJS() : [];
    const hasWordPressPost = !props.postSet.get('data').isEmpty() && getHasWordPressPost(props.postSet);
    const characterLimit = this.calculateCharacterLimit(message, mediaItems[0] || [], false);
    this.state = {
      channelIndex: -1,
      characterLimit,
      fileEditor: false,
      message,
      hasWordPressPost,
      imageEditor: false,
      videoEditor: false,
      linkEditor: false,
      linkDialog: false,
      embedDialog: false,
      mediaItem: {},
      item: mediaItems[0] || {},
      urls: [],
    };
  }

  componentDidMount() {
    const { message } = this.state;
    this.linkifyMessage(message);
  }

  componentWillReceiveProps(nextProps) {
    const { postSet, urlContent } = nextProps;
    const { messageUrls, message } = this.state;

    if (urlContent !== this.props.urlContent) {
      for (let i = 0; i < messageUrls.length; i += 1) {
        const url = messageUrls[i];
        if (urlContent.providerUrl === url.href) {
          const newMessage = message.replace(url.value, urlContent.short_url);
          this.setState({ message: newMessage });
          this.handleMessageChange(newMessage);
          this.handleMessageBlur(null, newMessage);
          return;
        }
      }
    }

    const newMessage = postSet.getIn(['data', 'message']);
    let newMediaItem = postSet.getIn(['data', 'media_items']) || fromJS([]);

    newMediaItem = newMediaItem.toJS();
    if (this.props.postSet.get('data').isEmpty() || this.props.postSet.getIn(['data', 'post_set_id']) !== postSet.getIn(['data', 'post_set_id'])) {
      this.setState({ message: newMessage || '' });
      this.linkifyMessage(newMessage);
    }
    if (newMediaItem[0]) {
      this.setState({
        item: newMediaItem[0],
      });
    }
    if (newMediaItem.length === 0 && this.state.item.media_item_id) {
      this.setState({ item: {} });
    }

    const hasWordPressPost = getHasWordPressPost(postSet);

    this.setState({
      characterLimit: this.calculateCharacterLimit(newMessage, newMediaItem[0], hasWordPressPost),
      hasWordPressPost,
    });
  }

  calculateCharacterLimit = (message = this.state.message, item = this.state.item, hasWordPressPost = this.state.hasWordPressPost) => {
    let mediaLength = (item && Object.keys(item).length > 0) ? 24 : 0;
    if (hasWordPressPost) mediaLength += 24;
    return 140 - (message ? message.length : 0) - mediaLength;
  }

  handleMessageChange = (value) => {
    const message = value;
    const characterLimit = this.calculateCharacterLimit(message);
    this.setState({ message, characterLimit });
    this.linkifyMessage(message);
  }

  linkifyMessage = (message) => {
    const links = linkify.find(message || '');
    let urls = [];
    if (links && links.length) {
      urls = links.filter((link) =>
        link.type === 'url' && link.href.indexOf('upo.st') === -1);
    }
    this.setState({ messageUrls: urls });
  }

  handleMessageBlur = (event, message = this.state.message) => {
    const { channelIndex } = this.state;
    const { updatePostSet, postSet } = this.props;
    const postSetDetails = postSet.get('data').toJS();

    if (channelIndex > -1) {
      const channelMessages = postSetDetails.properties;
      const channelName = CHANNELS[channelIndex].name;
      const newChannelMessages = {
        ...channelMessages,
        [channelName]: message,
      };
      updatePostSet({
        ...postSetDetails,
        id: postSetDetails.post_set_id,
        properties: newChannelMessages,
      });
    } else {
      updatePostSet({
        ...postSetDetails,
        id: postSetDetails.post_set_id,
        message,
      });
    }
  }

  openLinkEditor = (linkItem) => {
    if (linkItem) {
      this.setState({ linkEditor: true, mediaItem: linkItem });
    } else {
      this.setState({ linkEditor: true });
    }
  }

  openFileEditor = (fileItem) => {
    this.setState({ fileEditor: true, mediaItem: fileItem });
  }

  openMediaLibrary = () => {
    this.setState({ mediaLibrary: true });
  }

  openImageEditor = (imageItem) => {
    this.setState({ imageEditor: true, mediaItem: imageItem });
  }

  openVideoEditor = (videoItem) => {
    this.setState({ videoEditor: true, mediaItem: videoItem });
  }

  openLinkDialog = () => {
    this.setState({ linkDialog: true });
  }

  openEmbedDialog = () => {
    this.setState({ embedDialog: true });
  }

  closeAllDialog = () => {
    this.setState({
      linkDialog: false,
      embedDialog: false,
      linkEditor: false,
      videoEditor: false,
      imageEditor: false,
      fileEditor: false,
      mediaLibrary: false,
      mediaItem: {},
      addLinkValue: '',
    });
    this.props.clearUrlContent();
  }

  handleLinkEditorSave = (item) => {
    const { filePickerKey } = this.props;
    this.closeAllDialog();
    this.props.setProcessing(true);
    const { action, ...linkItem } = item;
    filepicker.setKey(filePickerKey);

    const picture = linkItem && (linkItem.picture || (linkItem.properties && linkItem.properties.picture) || '');

    if (picture) {
      filepicker.storeUrl(`https://process.filestackapi.com/${filePickerKey}/${picture}`, (Blob) => {
        if (action === 'update') {
          linkItem.properties.picture = Blob.url;
          linkItem.properties.picture_key = Blob.key;
        } else {
          linkItem.picture = Blob.url;
          linkItem.picture_key = Blob.key;
        }
        filepicker.storeUrl(
          `https://process.filestackapi.com/${this.props.filePickerKey}/resize=width:300,height:300,fit:clip/${picture}`,
            (blob) => {
              linkItem.account_id = this.props.accountId;
              linkItem.mediaItemType = 'link';
              if (action === 'create') {
                linkItem.thumb_key = blob.key;
                linkItem.picture = null;
                this.props.createMediaItem(linkItem);
              } else if (action === 'update') {
                linkItem.properties.thumb_key = blob.key;
                linkItem.properties.picture = null;
                this.props.updateMediaItem(linkItem);
              }
            });
      });
    } else {
      linkItem.mediaItemType = 'link';
      linkItem.account_id = this.props.accountId;
      if (action === 'create') {
        this.props.createMediaItem(linkItem);
      } else if (action === 'update') {
        this.props.updateMediaItem(linkItem);
      }
    }
  }

  openAddBlog = () => {
    this.setState({ blogItem: {} });
    const { pathname } = this.props.location;
    const { hash } = this.props.location;
    this.props.pushToRoute(`${pathname}${hash}#blog-editor`);
  }

  openBlogEditor = (mediaItem) => {
    const { pathname } = this.props.location;
    const { hash } = this.props.location;

    this.setState({ blogItem: mediaItem });
    this.props.pushToRoute(`${pathname}${hash}#blog-editor`);
  }

  openFilePicker = () => {
    const { filePickerKey } = this.props;
    filepicker.setKey(filePickerKey);
    const hash = this.props.location.hash;
    let mimetypes;
    if (hash.endsWith('#blog-editor')) {
      mimetypes = { mimetype: 'image/*' };
    }
    const filePickerOptions = {
      buttonText: 'Upload',
      container: 'modal',
      ...mimetypes,
      multiple: false,
      maxFiles: 1,
      imageQuality: 80,
      imageMax: [1200, 1200],
      services: ['CONVERT', 'COMPUTER', 'GOOGLE_DRIVE', 'DROPBOX', 'BOX', 'IMAGE_SEARCH', 'FACEBOOK', 'INSTAGRAM'],
      conversions: ['crop', 'filter'],
    };
    const filePickerStoreOptions = {
      location: 'S3',
    };
    function onFail(error) {
      console.log('error: ', error);
    }

    filepicker.pickAndStore(filePickerOptions, filePickerStoreOptions, this.handleOpenFilePicker, onFail);
  }

  handleVideoEditorSave = (videoItem) => {
    this.setState({ videoEditor: false, mediaItem: {} });
    this.props.setProcessing(true);
    const { action, ...item } = videoItem;
    const { filePickerKey } = this.props;
    filepicker.setKey(filePickerKey);
    if (item.picture) {
      filepicker.storeUrl(`https://process.filestackapi.com/${filePickerKey}/${item.picture}`, (Blob) => {
        item.picture = Blob.url;
        item.picture_key = Blob.key;
        filepicker.storeUrl(
          `https://process.filestackapi.com/${filePickerKey}/resize=width:300,height:300,fit:clip/${item.picture}`,
          (blob) => {
            item.thumb_key = blob.key;
            item.account_id = this.props.accountId;
            item.mediaItemType = 'link';
            if (action === 'create') {
              this.props.createMediaItem(item);
            } else if (action === 'update') {
              this.props.updateMediaItem(item);
            }
          });
      });
    } else if (action === 'update') {
      this.props.updateMediaItem(item);
    } else if (action === 'create') {
      this.props.createMediaItem(item);
    }
  }

  handleOpenFilePicker = (mediaItem) => {
    const { filePickerKey, accountId } = this.props;
    filepicker.setKey(filePickerKey);
    this.props.setProcessing(true);
    if (mediaItem[0].mimetype.match('image')) {
      filepicker.storeUrl(
        `https://process.filestackapi.com/${filePickerKey}/resize=width:300,height:300,fit:clip/${mediaItem[0].url}`,
        (blob) => {
          const imageItem = {
            mediaItemType: 'file',
            properties: {
              ...mediaItem[0],
              thumb_key: blob.key,
              account_id: accountId,
            },
          };
          this.openImageEditor(imageItem);
        });
    } else if (mediaItem[0].mimetype.match('video')) {
      const videoItem = {
        mediaItemType: 'file',
        properties: {
          ...mediaItem[0],
          account_id: accountId,
        },
      };
      this.openVideoEditor(videoItem);
    } else {
      const fileItem = {
        mediaItemType: 'file',
        properties: {
          ...mediaItem[0],
          account_id: accountId,
        },
      };
      this.openFileEditor(fileItem);
    }
  }

  handleFileEditorSave = (item) => {
    this.setState({ fileEditor: false, mediaItem: {} });
    this.props.setProcessing(true);
    const { action, ...fileItem } = item;
    const { filePickerKey, accountId } = this.props;
    filepicker.setKey(filePickerKey);
    if (fileItem.picture) {
      filepicker.storeUrl(`https://process.filestackapi.com/${filePickerKey}/${fileItem.picture}`, (Blob) => {
        fileItem.picture = Blob.url;
        fileItem.picture_key = Blob.key;
        filepicker.storeUrl(
          `https://process.filestackapi.com/${filePickerKey}/resize=width:300,height:300,fit:clip/${fileItem.picture}`,
          (blob) => {
            fileItem.thumb_key = blob.key;
            fileItem.account_id = accountId;
            fileItem.mediaItemType = 'link';
            if (action === 'create') {
              this.props.createMediaItem(fileItem);
            } else if (action === 'update') {
              this.props.updateMediaItem(fileItem);
            }
          });
      });
    } else if (action === 'update') {
      this.props.updateMediaItem(fileItem);
    } else if (action === 'create') {
      this.props.createMediaItem(fileItem);
    }
  }

  handleAddLinkValue = (event) => {
    this.setState({ addLinkValue: event.target.value });
  }

  handleAddLinkValueFromDialog = (link) => {
    this.setState({ addLinkValue: link }, () => this.handleAddLinkSubmit());
  }

  handleAddLinkSubmit = () => {
    if (this.state.addLinkValue === '') {
      this.setState({ addLinkValueError: 'A link URL is required' });
      return;
    }
    this.setState({ addLinkValue: '', linkDialog: false, searchDialog: false, rssFeedDialog: false, linkEditor: true });
    this.props.fetchUrlData(this.state.addLinkValue);
  }

  handleEmbedSubmit = () => {
    if (this.state.addLinkValue === '') {
      this.setState({ addLinkValueError: 'A link URL is required' });
      return;
    }
    this.setState({ addLinkValue: '', embedDialog: false });
    this.props.getEmbedData(this.state.addLinkValue);
  }

  handleImageEditorSave = (imageItem) => {
    this.setState({ imageEditor: false, mediaItem: {} });
    const { action, ...rest } = imageItem;
    if (action === 'update') {
      this.props.updateMediaItem(rest);
    } else if (action === 'create') {
      this.props.createMediaItem(rest);
    }
    const hash = this.props.location.hash;
    if (hash.endsWith('#blog-editor')) {
      const img = document.createElement('img');
      img.src = `https://s3.amazonaws.com/powerpost/${imageItem.properties.key}`;
      ReactSummernote.insertNode(img);
    }
  }

  removeItem = () => {
    this.props.removeMediaItem();
    setTimeout(() => this.handleMessageBlur(), 100);
  }

  openEditor = (mediaItem) => {
    if (mediaItem.type === 'image') {
      this.openImageEditor(mediaItem);
    } else if (mediaItem.type === 'link') {
      this.openLinkEditor(mediaItem);
    } else if (mediaItem.type === 'video') {
      this.openVideoEditor(mediaItem);
    } else if (mediaItem.type === 'document') {
      this.openFileEditor(mediaItem);
    } else if (mediaItem.type === 'blog') {
      this.openBlogEditor(mediaItem);
    }
  }

  addToPost = (mediaItem) => {
    this.props.setMediaItem(mediaItem);
    this.closeAllDialog();

    setTimeout(() => this.handleMessageBlur(), 100);
  }

  shortenUrl = () => {
    const { messageUrls } = this.state;
    messageUrls.forEach((url) => {
      this.props.fetchUrlData(url.value);
    });
  }

  convertUrl = () => {
    const { messageUrls } = this.state;
    if (!messageUrls.length) return;

    const urlToConvert = messageUrls[0];
    this.setState({
      addLinkValue: urlToConvert.href,
      linkDialog: true,
    });
  }

  /* Channel selector handler */
  handleChannelClick = (channelIndex) => {
    if (channelIndex === this.state.channelIndex) return;

    const { message } = this.state;
    const { postSet } = this.props;
    const globalMessage = this.state.channelIndex === -1 ? message : postSet.getIn(['data', 'message']);

    if (channelIndex > -1) {
      const channelMessages = postSet.getIn(['data', 'properties']).toJS();
      const channelName = CHANNELS[channelIndex].name;
      this.setState({
        message: channelMessages[channelName] || globalMessage,
      });
    } else {
      this.setState({
        message: globalMessage,
      });
    }
    this.setState({ channelIndex });
  }

  createBlogPost = (blogItem) => {
    this.props.setProcessing(true);
    this.props.createBlogItem(blogItem);
  }

  updateBlogPost = (blogItem) => {
    this.props.setProcessing(true);
    const inBlog = true;
    this.props.updateMediaItem(blogItem, inBlog);
  }

  render() {
    const { location: { hash }, pending, pushToLibrary, id, accountId, postSet, permissionClasses, availableFBChannel } = this.props;
    const { message, characterLimit, item, messageUrls, channelIndex } = this.state;
    // const { params: { postset_id, account_id } } = this.props;
    const actions = [
      { label: 'close', onClick: this.closeAllDialog },
    ];
    const blogEditor = hash.endsWith('#blog-editor');
    let previewConnection;
    const previewPostTime = new Date().getTime() / 1000;
    const previewPostData = Map();
    const { type, mediaItem } = getMediaTypeAndItem(this.state.item, postSet);
    if (channelIndex > -1) {
      previewConnection = {
        channel: CHANNELS[channelIndex].name.substr(8),
        channel_icon: CHANNELS[channelIndex].icon,
        display_name: 'Display Name',
        parent_display_name: 'username',
        properties: {
          board_data: {
            name: 'Board Name',
          },
        },
      };
    }

    return (
      <Wrapper pending={pending}>
        <ChannelsRow
          channelIndex={channelIndex}
          handleChannelClick={this.handleChannelClick}
        />
        <MessageEditorWrapper className={permissionClasses.message}>
          <PopupBorder
            left={0}
            top={channelIndex > -1 ? -7 : undefined}
            arrowRight={channelIndex > -1 ? 6 + (29.44 * (4 - channelIndex)) : undefined}
            borderColor={channelIndex > -1 ? CHANNELS[channelIndex].color : 'inherit'}
            hasArrow={channelIndex > -1}
          >
            <MessageEditor
              message={message}
              mediaItem={item}
              removeMediaItem={this.removeItem}
              characterLimit={characterLimit}
              handleMessageChange={this.handleMessageChange}
              handleMessageBlur={this.handleMessageBlur}
              openFilePicker={this.openFilePicker}
              openEditor={this.openEditor}
              openAddBlog={this.openAddBlog}
              updateBlogPost={this.updateBlogPost}
              pushToLibrary={pushToLibrary}
              accountId={accountId}
              postSetId={id}
              openLinkDialog={this.openLinkDialog}
              openMediaLibrary={this.openMediaLibrary}
              isProcessing={this.props.isProcessing}
              urls={messageUrls}
              shortenUrl={this.shortenUrl}
              convertUrl={this.convertUrl}
              currentChannel={channelIndex}
              permissionClasses={permissionClasses}
              isMentionsInput={channelIndex === 0}
              availableFBChannel={availableFBChannel}
            />
          </PopupBorder>
        </MessageEditorWrapper>
        {channelIndex > -1 &&
          <PostPreview
            marginBottom
            className="bottom-margin"
            connection={previewConnection}
            mediaItem={mediaItem}
            post={previewPostData}
            postMessage={message}
            postSetId={postSet.getIn(['data', 'post_set_id'])}
            postTime={previewPostTime}
            type={type}
          />
        }
        <LinkEditor actions={actions} closeAllDialog={this.closeAllDialog} handleLinkEditorSave={this.handleLinkEditorSave} linkEditorDialog={this.state.linkEditor} urlContent={this.props.urlContent} filePickerKey={this.props.filePickerKey} linkItem={this.state.mediaItem} />
        <ImageEditor actions={actions} setProcessing={this.props.setProcessing} closeAllDialog={this.closeAllDialog} handleSave={this.handleImageEditorSave} isOpen={this.state.imageEditor} filePickerKey={this.props.filePickerKey} imageItem={this.state.mediaItem} />
        <EmbedDialog actions={actions} setProcessing={this.props.setProcessing} closeAllDialog={this.closeAllDialog} embedDialog={this.state.embedDialog} handleAddLinkValue={this.handleAddLinkValue} handleSubmit={this.handleEmbedSubmit} value={this.state.addLinkValue} error={this.state.addLinkValueError} />
        <LinkDialog actions={actions} setProcessing={this.props.setProcessing} closeAllDialog={this.closeAllDialog} linkDialog={this.state.linkDialog} handleAddLinkValue={this.handleAddLinkValue} handleSubmit={this.handleAddLinkSubmit} urlValue={this.state.addLinkValue} errorText={this.state.addLinkValueError} />
        <VideoEditor actions={actions} setProcessing={this.props.setProcessing} closeAllDialog={this.closeAllDialog} handleSave={this.handleVideoEditorSave} isOpen={this.state.videoEditor} filePickerKey={this.props.filePickerKey} videoItem={this.state.mediaItem} />
        <FileEditor actions={actions} setProcessing={this.props.setProcessing} closeAllDialog={this.closeAllDialog} handleSave={this.handleFileEditorSave} isOpen={this.state.fileEditor} filePickerKey={this.props.filePickerKey} fileItem={this.state.mediaItem} />
        <MediaLibraryDialog actions={actions} filter={this.props.filter} closeAllDialog={this.closeAllDialog} isOpen={this.state.mediaLibrary} mediaItems={this.props.mediaItems} addToPost={this.addToPost} />
        <div className="blog-editor">
          { blogEditor ? <BlogEditor
            filePickerKey={this.props.filePickerKey}
            location={this.props.location}
            onCreate={this.createBlogPost}
            onUpdate={this.updateBlogPost}
            selectedItem={this.state.blogItem}
            openAddFile={this.openFilePicker}
            openAddLink={this.openEmbedDialog}
            openBlogEditor={this.openBlogEditor}
            goBack={this.props.goBack}
            pushToRoute={this.props.pushToRoute}
            embedData={this.props.embedData}
            handleAddLinkValueFromDialog={this.handleAddLinkValueFromDialog}
          /> : null }
        </div>
      </Wrapper>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    createMediaItem: (mediaItem) => dispatch(createMediaItem(mediaItem)),
    updateMediaItem: (mediaItem) => dispatch(updateMediaItem(mediaItem)),
    removeMediaItem: () => dispatch(removeMediaItem()),
    pushToLibrary: (redirectUrl, accountId) => dispatch(routerActions.push({ pathname: `/account/${accountId}/library`, query: { postSet: redirectUrl } })),
    setMediaItem: (mediaItem) => dispatch(setMediaItem(mediaItem)),
    fetchUrlData: (url) => dispatch(fetchUrlData(url)),
    getEmbedData: (url) => dispatch(getEmbedData(url)),
    clearUrlContent: () => dispatch(clearUrlContent()),
    setProcessing: (processing) => dispatch(setProcessing(processing)),
    pushToRoute: (route) => dispatch(routerActions.push(route)),
    createBlogItem: (payload) => dispatch(createBlogItemRequest(payload)),
    goBack: () => dispatch(routerActions.goBack()),
  };
}

const mapStateToProps = createStructuredSelector({
  pending: makeSelectInProgress(),
  filePickerKey: makeSelectFilePickerKey(),
  urlContent: makeSelectUrlContent(),
  mediaItems: makeSelectVisibleMediaItems(),
  isProcessing: makeSelectIsProcessing(),
  filter: makeSelectFilter(),
  embedData: makeSelectEmbedData(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);
