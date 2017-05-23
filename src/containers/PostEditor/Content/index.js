import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ImmutablePropTypes from 'react-immutable-proptypes';
import LinkEditor from 'containers/MediaItemLibrary/LinkEditor';
import FileEditor from 'containers/MediaItemLibrary/FileEditor';
import VideoEditor from 'containers/MediaItemLibrary/VideoEditor';
import LinkDialog from 'containers/MediaItemLibrary/LinkDialog';
import ImageEditor from 'containers/MediaItemLibrary/ImageEditor';
import { fromJS } from 'immutable';
import { routerActions } from 'react-router-redux'

import {
  updatePostSetRequest,
} from 'containers/App/actions';

import {
  makeSelectUser,
  makeSelectFilePickerKey,
} from 'containers/App/selectors';

import {
  postCommentRequest,
  deleteCommentRequest,
  createMediaItem,
  updateMediaItem,
  removeMediaItem,
  setMediaItem,
} from 'containers/PostEditor/actions';

import {
  makeSelectComments,
  makeSelectInProgress,
} from 'containers/PostEditor/selectors';

import Wrapper from './Wrapper';
import MessageEditor from '../MessageEditor';
import Comments from './Comments';
import Comment from './Comment';
import CommentInput from './CommentInput';

class Content extends Component {

  static propTypes = {
    postComment: PropTypes.func,
    deleteComment: PropTypes.func,
    comments: ImmutablePropTypes.list,
    user: PropTypes.shape(),
    pending: PropTypes.bool,
    postSet: PropTypes.object,
    updatePostSet: PropTypes.func,
  };

  static defaultProps = {
    params: {},
  };

  constructor(props) {
    super(props);
    const globalMessage = !props.postSet.get('details').isEmpty() ? props.postSet.getIn(['details', 'message']) : '';
    const characterLimit = 140 - globalMessage.length;
    this.state = {
      globalMessage,
      characterLimit,
      fileEditor: false,
      imageEditor: false,
      videoEditor: false,
      linkEditor: false,
      linkDialog: false,
      mediaItem: {},
      urlContent: {},
      item: {},
    };
  }

  componentWillReceiveProps({ postSet, location }) {

    const newMessage = postSet.getIn(['details', 'message']);
    let newMediaItem = postSet.getIn(['details', 'media_items']) || fromJS([]);

    newMediaItem = newMediaItem.toJS();
    if (newMessage === this.state.globalMessage || this.props.postSet.get('details').isEmpty()) {
      this.setState({ globalMessage: newMessage });
    }
    if (newMediaItem[0]) {
      this.setState({ item: newMediaItem[0] });
    }
    if (newMediaItem.length == 0 && this.state.item.media_item_id) {
      this.setState({ item: {} });
    }
    if(location.query.item) {
      const item = JSON.parse(location.query.item);
      this.props.setMediaItem(item);
      location.query = {};
      location.search = '';
    }
  }

  handleMessageChange = (value) => {
    const globalMessage = value;
    const characterLimit = 140 - globalMessage.length;
    this.setState({ globalMessage, characterLimit });
  }
  
  handleMessageBlur = () => {
    const { updatePostSet, postSet } = this.props;
    const { globalMessage } = this.state;
    updatePostSet({
      ...postSet.get('details').toJS(),
      id: postSet.getIn(['details', 'post_set_id']),
      message: globalMessage,
    });
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
  
  openImageEditor = (imageItem) => {
    this.setState({ imageEditor: true, mediaItem: imageItem });
  }
  
  openVideoEditor = (videoItem) => {
    this.setState({ videoEditor: true, mediaItem: videoItem });
  }
  
  openLinkDialog = () => {
    this.setState({ linkDialog: true });
  }
  
  closeAllDialog = () => {
    this.setState({ 
      linkDialog: false,
      linkEditor: false,
      videoEditor: false,
      imageEditor: false,
      fileEditor: false,
      mediaItem: {},
      urlContent: {},
      addLinkValue: '',
    });
  }

  openFilePicker = () => {
    const filepicker = require('filepicker-js');
    filepicker.setKey(this.props.filePickerKey);
    
    const filePickerOptions = { 
        buttonText: 'Upload', 
        container:'modal', 
        multiple: false,
        maxFiles: 1, 
        imageQuality: 80, 
        imageMax: [1200, 1200], 
        services: [ 'COMPUTER', 'WEBCAM', 'VIDEO', 'IMAGE_SEARCH', 'FLICKR', 'GOOGLE_DRIVE', 'FACEBOOK', 'INSTAGRAM', 'BOX', 'SKYDRIVE', 'URL'],
        conversions: ['crop', 'filter'],
    }; 
    const filePickerStoreOptions = {
        location: 'S3'
    };
    function onFail(error) {
        console.log('error: ' + error);
    }
    
    filepicker.pickAndStore(filePickerOptions, filePickerStoreOptions, this.handleOpenFilePicker, onFail);
  }
  
  handleVideoEditorSave(videoItem) {
    this.setState({ videoEditor: false, mediaItem: {} });
    const {action, ...item} = videoItem;
    const filepicker = require('filepicker-js');
    filepicker.setKey(this.props.filePickerKey);
    if(item.picture) {
      filepicker.storeUrl('https://process.filestackapi.com/' + this.props.filePickerKey + '/' + item.picture, (Blob) => {
        console.log(Blob);
        item.picture = Blob.url;
        item.picture_key = Blob.key;
        filepicker.storeUrl(
          'https://process.filestackapi.com/' + this.props.filePickerKey + '/resize=width:300,height:300,fit:clip/' + item.picture,
           (Blob) => {
            item.thumb_key = Blob.key;
            item.collection_id = this.props.activeCollection.collection_id;
            item.mediaItemType="link";
            if (action === 'create') {
              this.props.createMediaItem(item);
            } else if (action === 'update') {
              this.props.updateMediaItem(item);
            }
          });
      });
    } else {
      if (action === 'update') {
        this.props.updateMediaItem(item);
      } else if (action === 'create') {
        this.props.createMediaItem(item);
      }
    }
    setTimeout(() => { this.handleMessageBlur()}, 3000);
  }

  handleOpenFilePicker = (mediaItem) => {
    const filepicker = require('filepicker-js');
    filepicker.setKey(this.props.filePickerKey);
    
    if(mediaItem[0].mimetype.match('image')) {
  
      filepicker.storeUrl(
        'https://process.filestackapi.com/' + this.props.filePickerKey + '/resize=width:300,height:300,fit:clip/' + mediaItem[0].url,
        (Blob) => {
          mediaItem[0]["thumb_key"] = Blob.key;
          mediaItem[0].account_id = this.props.params.account_id;
          const imageItem = {
            mediaItemType: 'file',
            properties: {
              ...mediaItem[0],
            },
          };
          console.log(mediaItem);
          this.openImageEditor(imageItem);
        }); 
    } else if(mediaItem[0].mimetype.match('video')) {
      mediaItem[0].account_id = this.props.params.account_id;
      const videoItem = {
        mediaItemType: 'file',
        properties: {
          ...mediaItem[0],
        },
      };
      console.log(mediaItem);
      this.openVideoEditor(videoItem);
    } else  {
      console.log(mediaItem);
      mediaItem[0].account_id = this.props.params.account_id;
      const fileItem = {
        mediaItemType: 'file',
        properties: {
          ...mediaItem[0],
        }
      };
      this.openFileEditor(fileItem);
    }
  }
  
  handleFileEditorSave(item) {
    this.setState({ fileEditor: false, mediaItem: {} });
    const {action, ...fileItem} = item;
    const filepicker = require('filepicker-js');
    filepicker.setKey(this.props.filePickerKey);
    if(fileItem.picture) {
      filepicker.storeUrl('https://process.filestackapi.com/' + this.props.filePickerKey + '/' + fileItem.picture, (Blob) => {
        console.log(Blob);
        fileItem.picture = Blob.url;
        fileItem.picture_key = Blob.key;
        filepicker.storeUrl(
          'https://process.filestackapi.com/' + this.props.filePickerKey + '/resize=width:300,height:300,fit:clip/' + fileItem.picture,
           (Blob) => {
            fileItem.thumb_key = Blob.key;
            fileItem.collection_id = this.props.activeCollection.collection_id;
            fileItem.mediaItemType="link";
            if (action === 'create') {
              this.props.createMediaItem(fileItem);
            } else if (action === 'update') {
              this.props.updateMediaItem(fileItem);
            }
          });
      });
    } else {
      if (action === 'update') {
        this.props.updateMediaItem(fileItem);
      } else if (action === 'create') {
        this.props.createMediaItem(fileItem);
      }
    }
    setTimeout(() => { this.handleMessageBlur()}, 3000);
  }
  
  handleImageEditorSave = (imageItem) => {
    this.setState({ imageEditor: false, mediaItem: {} });
    const {action, ...rest} = imageItem;
    if (action === 'update') {
      this.props.updateMediaItem(rest);
    } else if (action === 'create') {
      this.props.createMediaItem(rest);
    }
    setTimeout(() => { this.handleMessageBlur()}, 3000);
  }
  
  removeItem = () => {
    this.props.removeMediaItem();
    setTimeout(() => { this.handleMessageBlur()}, 1500);
  }
  
  openEditor = (mediaItem) => {
    if(mediaItem.type === 'image') {
      this.openImageEditor(mediaItem);
    } else if (mediaItem.type === 'link') {
      this.openLinkEditor(mediaItem);
    } else if (mediaItem.type === 'video') {
      this.openVideoEditor(mediaItem);
    } else if (mediaItem.type === 'document') {
      this.openFileEditor(mediaItem);
    }
  }

  render() {
    const { postComment, deleteComment, comments, user, pending, pushToLibrary } = this.props;
    const { globalMessage, characterLimit, item } = this.state;
    const { params: { postset_id, account_id } } = this.props;
    const actions = [
      { label: "close", onClick: this.closeAllDialog },
    ];
    
    return (
      <Wrapper pending={pending}>
        <MessageEditor
          message={globalMessage}
          mediaItem={item}
          removeMediaItem={this.removeItem}
          characterLimit={characterLimit}
          handleMessageChange={this.handleMessageChange}
          handleMessageBlur={this.handleMessageBlur}
          openFilePicker={this.openFilePicker}
          openEditor={this.openEditor}
          pushToLibrary={pushToLibrary}
          accountId={account_id}
          postSetId={postset_id}
        />
        <Comments />
        <div className="comment-input">
          <CommentInput user={user} postComment={(text) => postComment(postset_id, text)} />
        </div>
        {
          comments.map((comment) =>
            <Comment
              key={comment.get('comment_id')}
              comment={comment}
              removable={user.user_id === comment.getIn(['user', 'user_id'])}
              remove={deleteComment}
            />
          )
        }
        <LinkEditor actions={actions} closeAllDialog={this.closeAllDialog} handleLinkEditorSave={this.handleLinkEditorSave} linkEditorDialog={this.state.linkEditor} urlContent={this.state.urlContent} filePickerKey={this.props.filePickerKey} linkItem={this.state.mediaItem} />
        <ImageEditor actions={actions} closeAllDialog={this.closeAllDialog} handleSave={this.handleImageEditorSave.bind(this)} isOpen={this.state.imageEditor} filePickerKey={this.props.filePickerKey} imageItem={this.state.mediaItem} />
        <LinkDialog actions={actions} closeAllDialog={this.closeAllDialog} linkDialog={this.state.linkDialog} handleAddLinkValue={this.handleAddLinkValue} handleSubmit={this.handleAddLinkSubmit} value={this.state.addLinkValue} errorText={this.state.addLinkValueError} />
        <VideoEditor actions={actions} closeAllDialog={this.closeAllDialog} handleSave={this.handleVideoEditorSave.bind(this)} isOpen={this.state.videoEditor} filePickerKey={this.props.filePickerKey} videoItem={this.state.mediaItem} />
        <FileEditor actions={actions} closeAllDialog={this.closeAllDialog} handleSave={this.handleFileEditorSave.bind(this)} isOpen={this.state.fileEditor} filePickerKey={this.props.filePickerKey} fileItem={this.state.mediaItem} />
      </Wrapper>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    postComment: (postSetId, text) => dispatch(postCommentRequest({ postSetId, text })),
    deleteComment: (commentId) => dispatch(deleteCommentRequest(commentId)),
    updatePostSet: (payload) => dispatch(updatePostSetRequest(payload)),
    createMediaItem: (mediaItem) => dispatch(createMediaItem(mediaItem)),
    updateMediaItem: (mediaItem) => dispatch(updateMediaItem(mediaItem)),
    removeMediaItem: () => dispatch(removeMediaItem()),
    pushToLibrary: (postSetId, accountId) => dispatch(routerActions.push({ pathname: `/account/${accountId}/library`, query: { postSet: postSetId } })),
    setMediaItem: (mediaItem) => dispatch(setMediaItem(mediaItem)),
  };
}

const mapStateToProps = createStructuredSelector({
  comments: makeSelectComments(),
  user: makeSelectUser(),
  pending: makeSelectInProgress(),
  filePickerKey: makeSelectFilePickerKey(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);
