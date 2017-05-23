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
    };
  }

  componentWillReceiveProps({ postSet }) {
    const newMessage = postSet.getIn(['details', 'message']);
    if (this.props.postSet.get('details').isEmpty() || newMessage === this.state.globalMessage) {
      this.setState({ globalMessage: newMessage });
    }
  }

  handleMessageChange = (value) => {
    const globalMessage = value;
    const characterLimit = 140 - globalMessage.length;
    this.setState({ globalMessage, characterLimit });
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
      linkEditorDialog: false,
      videoEditorDialog: false,
      imageEditorDialog: false,
      fileEditorDialog: false,
      mediaItem: {},
      urlContent: {},
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

  handleOpenFilePicker = (mediaItem) => {
    const filepicker = require('filepicker-js');
    filepicker.setKey(this.props.filePickerKey);
    
    if(mediaItem[0].mimetype.match('image')) {
  
      filepicker.storeUrl(
        'https://process.filestackapi.com/' + this.props.filePickerKey + '/resize=width:300,height:300,fit:clip/' + mediaItem[0].url,
        (Blob) => {
          mediaItem[0]["thumb_key"] = Blob.key;
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

      const fileItem = {
        mediaItemType: 'file',
        properties: {
          ...mediaItem[0],
        }
      };
      this.openFileEditor(fileItem);
    }
  }
  
  render() {
    const { postComment, deleteComment, comments, user, pending } = this.props;
    const { globalMessage, characterLimit } = this.state;
    const { params: { postset_id } } = this.props;
    const actions = [
      { label: "close", onClick: this.closeAllDialog },
    ];
    
    return (
      <Wrapper pending={pending}>
        <MessageEditor
          message={globalMessage}
          characterLimit={characterLimit}
          handleMessageChange={this.handleMessageChange}
          handleMessageBlur={this.handleMessageBlur}
          openFilePicker={this.openFilePicker}
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
        <ImageEditor actions={actions} closeAllDialog={this.closeAllDialog} handleSave={this.handleImageEditorSave} isOpen={this.state.imageEditor} filePickerKey={this.props.filePickerKey} imageItem={this.state.mediaItem} />
        <LinkDialog actions={actions} closeAllDialog={this.closeAllDialog} linkDialog={this.state.linkDialog} handleAddLinkValue={this.handleAddLinkValue} handleSubmit={this.handleAddLinkSubmit} value={this.state.addLinkValue} errorText={this.state.addLinkValueError} />
        <VideoEditor actions={actions} closeAllDialog={this.closeAllDialog} handleSave={this.handleVideoEditorSave} isOpen={this.state.videoEditor} filePickerKey={this.props.filePickerKey} videoItem={this.state.mediaItem} />
        <FileEditor actions={actions} closeAllDialog={this.closeAllDialog} handleSave={this.handleFileEditorSave} isOpen={this.state.fileEditor} filePickerKey={this.props.filePickerKey} fileItem={this.state.mediaItem} />
      </Wrapper>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    postComment: (postSetId, text) => dispatch(postCommentRequest({ postSetId, text })),
    deleteComment: (commentId) => dispatch(deleteCommentRequest(commentId)),
    updatePostSet: (payload) => dispatch(updatePostSetRequest(payload)),
  };
}

const mapStateToProps = createStructuredSelector({
  comments: makeSelectComments(),
  user: makeSelectUser(),
  pending: makeSelectInProgress(),
  filePickerKey: makeSelectFilePickerKey(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);
