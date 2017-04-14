/*
 * Media Item Library
 *
 *
 */
 
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { UserCanAccount } from 'config.routes/UserRoutePermissions';

import { 
  fetchCollections,
  fetchUrlData,
  clearUrlContent,
  createMediaItem,
} from './actions';

import {
  makeSelectUrlContent,
  makeSelectActiveCollection,
  makeSelectMediaItems,
} from './selectors';

import {
  makeSelectFilePickerKey,
} from 'containers/App/selectors';

import MediaNav from './MediaNav';
import MediaContainer from './MediaContainer';
import Wrapper from './Wrapper';
import LinkDialog from './LinkDialog';
import LinkEditor from './LinkEditor';

class MediaItemLibrary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      linkDialog: false,
      addLinkValue: '',
      addLinkValueError: '',
      linkEditorDialog: false,
    };
    
    this.openAddBlog = this.openAddBlog.bind(this);
    this.openAddFile = this.openAddFile.bind(this);
    this.openAddRSS = this.openAddRSS.bind(this);
    this.openAddLink = this.openAddLink.bind(this);
    this.closeAllDialog = this.closeAllDialog.bind(this);
    this.handleAddLinkValue = this.handleAddLinkValue.bind(this);
    this.handleLinkEditorSave = this.handleLinkEditorSave.bind(this);
  }

  componentDidMount() {
    this.props.getMediaItems(this.props.params.account_id);
  }

  openAddFile() {
    console.log('open add file');
  }

  openAddRSS() {
    console.log('open add RSS');
  }

  openAddLink() {
    console.log('open add link');
    this.setState({ linkDialog: true });
  }

  openAddBlog() {
    console.log('open add blog');
  }
  
  openLinkEditor() {
    this.setState({ linkEditorDialog: true });
  }
  
  closeAllDialog() {
    this.setState({ 
      linkDialog: false,
      linkEditorDialog: false,
      addLinkValueError: '',
    });
    this.props.clearUrlContent();
  }
  
  handleAddLinkValue(event) {
    this.setState({ addLinkValue: event.target.value });    
  }
  
  handleAddLinkSubmit = () => {
    if(this.state.addLinkValue === '') {
      this.setState({ addLinkValueError: 'A link URL is required'});
      return;
    }
    const linkItem = {
      source: this.state.addLinkValue,
    };
    
    this.setState({ addLinkValue: '', linkDialog: false, linkEditorDialog: true });
    
    this.props.fetchUrlData(this.state.addLinkValue);
    console.log(linkItem);
  }
  
  handleLinkEditorSave(linkItem) {
    this.setState({ linkEditorDialog: false });
    const filepicker = require('filepicker-js');
    filepicker.setKey(this.props.filePickerKey);
    if(linkItem.picture) {
      filepicker.storeUrl('https://process.filestackapi.com/' + this.props.filePickerKey + '/' + linkItem.picture, (Blob) => {
        console.log(Blob);
        linkItem.picture = Blob.url;
        linkItem.picture_key = Blob.key;
        filepicker.storeUrl(
          'https://process.filestackapi.com/' + this.props.filePickerKey + '/resize=width:300,height:300,fit:clip/' + linkItem.picture,
           (Blob) => {
            linkItem.thumb_key = Blob.key;
            linkItem.collection_id = this.props.activeCollection.collection_id;
            console.log(linkItem);
            linkItem.mediaItemType="link";
            this.props.createMediaItem(linkItem);
          });
      });
    } else {
      linkItem.mediaItemType="link";
      this.props.createMediaItem(linkItem);
    }
  }
  render() {
    const actions = [
      { label: "close", onClick: this.closeAllDialog },
    ];
    
    return (
      <Wrapper>
        <MediaNav openAddFile={this.openAddFile} openAddRSS={this.openAddRSS} openAddLink={this.openAddLink} openAddBlog={this.openAddBlog} />
        <MediaContainer mediaItems={this.props.mediaItems} />
        <LinkDialog actions={actions} closeAllDialog={this.closeAllDialog} linkDialog={this.state.linkDialog} handleAddLinkValue={this.handleAddLinkValue.bind(this)} handleSubmit={this.handleAddLinkSubmit} value={this.state.addLinkValue} errorText={this.state.addLinkValueError} />
        <LinkEditor actions={actions} closeAllDialog={this.closeAllDialog} handleLinkEditorSave={this.handleLinkEditorSave} linkEditorDialog={this.state.linkEditorDialog} urlContent={this.props.urlContent} filePickerKey={this.props.filePickerKey} />
      </Wrapper>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getMediaItems: (accountId) => dispatch(fetchCollections(accountId)),
    fetchUrlData: (url) => dispatch(fetchUrlData(url)),
    clearUrlContent: () => dispatch(clearUrlContent()),
    createMediaItem: (mediaItem) => dispatch(createMediaItem(mediaItem)),
  };
}

const mapStateToProps = createStructuredSelector({
  urlContent: makeSelectUrlContent(),
  filePickerKey: makeSelectFilePickerKey(),
  activeCollection: makeSelectActiveCollection(),
  mediaItems: makeSelectMediaItems(),
});

MediaItemLibrary.propTypes = {
  getMediaItems: PropTypes.func,
  params: PropTypes.any,
  fetchUrlData: PropTypes.func,
};

export default UserCanAccount(connect(mapStateToProps, mapDispatchToProps)(MediaItemLibrary));
