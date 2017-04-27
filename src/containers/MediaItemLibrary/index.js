/*
 * Media Item Library
 *
 *
 */
 
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as dialogs from 'react-toolbox-dialogs'

import { UserCanAccount } from 'config.routes/UserRoutePermissions';

import { 
  fetchCollections,
  fetchUrlData,
  clearUrlContent,
  createMediaItem,
  searchWeb,
  getFeeds,
  getRSSItems,
  createFeed,
  setVisibilityFilter,
  setSearchFilter,
  deleteMediaItem,
} from './actions';

import {
  makeSelectUrlContent,
  makeSelectActiveCollection,
  makeSelectMediaItems,
  makeSelectSearchResults,
  makeSelectFeeds,
  makeSelectRSSItems,
  makeSelectFilter,
} from './selectors';

import {
  makeSelectFilePickerKey,
} from 'containers/App/selectors';

import MediaNav from './MediaNav';
import MediaContainer from './MediaContainer';
import Wrapper from './Wrapper';
import LinkDialog from './LinkDialog';
import LinkEditor from './LinkEditor';
import SearchDialog from './SearchDialog';
import RSSFeed from './RSSFeed';
import BlogEditorDialog from './BlogEditorDialog';
import PreviewDialog from './PreviewDialog';

class MediaItemLibrary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      linkDialog: false,
      searchDialog: false,
      rssFeedDialog: false,
      blogEditorDialog: false,
      previewDialog: false,
      addLinkValue: '',
      addLinkValueError: '',
      linkEditorDialog: false,
      previewItem: {properties: {}},
    };
    
    this.openAddBlog = this.openAddBlog.bind(this);
    this.openAddFile = this.openAddFile.bind(this);
    this.openAddRSS = this.openAddRSS.bind(this);
    this.openSearch = this.openSearch.bind(this);
    this.openAddLink = this.openAddLink.bind(this);
    this.openPreview = this.openPreview.bind(this);
    this.closeAllDialog = this.closeAllDialog.bind(this);
    this.handleAddLinkValue = this.handleAddLinkValue.bind(this);
    this.handleLinkEditorSave = this.handleLinkEditorSave.bind(this);
    this.openAddFile = this.openAddFile.bind(this);
    this.handleOpenAddFile = this.handleOpenAddFile.bind(this);
    this.handleAddLinkValueFromDialog = this.handleAddLinkValueFromDialog.bind(this);
    this.setSearchFilter = this.setSearchFilter.bind(this);
    
  }

  componentDidMount() {
    this.props.getMediaItems(this.props.params.account_id);
    this.props.getFeeds(this.props.params.account_id);
  }

  openAddFile() {
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
    
    filepicker.pickAndStore(filePickerOptions, filePickerStoreOptions, this.handleOpenAddFile, onFail);
  }

  handleOpenAddFile(mediaItem) {
    const filepicker = require('filepicker-js');
    filepicker.setKey(this.props.filePickerKey);
    
    if(mediaItem[0].mimetype.match('image')) {
  
      filepicker.storeUrl(
        'https://process.filestackapi.com/' + this.props.filePickerKey + '/resize=width:300,height:300,fit:clip/' + mediaItem[0].url,
        (Blob) => {
          mediaItem[0]["thumb_key"] = Blob.key;
          mediaItem[0].collection_id = this.props.activeCollection.collection_id;
          console.log(mediaItem);
          mediaItem.mediaItemType="file";
          this.props.createMediaItem(mediaItem);
        }); 
    } else  {
      mediaItem[0].collection_id = this.props.activeCollection.collection_id;
      mediaItem.mediaItemType="file";
      this.props.createMediaItem(mediaItem);
    }
  }

  openAddRSS() {
    console.log('open add RSS');
    this.setState({ rssFeedDialog: true });
  }

  openAddLink() {
    console.log('open add link');
    this.setState({ linkDialog: true });
  }

  openAddBlog() {
    console.log('open add blog');
    this.setState({ blogEditorDialog: true });
  }

  openSearch() {
    this.setState({ searchDialog: true });
  }

  openLinkEditor() {
    this.setState({ linkEditorDialog: true });
  }
  
  openPreview(item) {
    this.setState({ previewDialog: true, previewItem: item });
  }
  async onConfirmDelete(id) {
    const result = await dialogs.confirm('Delete', 'Are you sure you want to delete this item?');
    console.log(result + id);
    if (result) {
      this.props.deleteMediaItem(id);
    } else {
      return;
    }
  }
  
  closeAllDialog() {
    this.setState({ 
      linkDialog: false,
      searchDialog: false,
      linkEditorDialog: false,
      rssFeedDialog: false,
      blogEditorDialog: false,
      previewDialog: false,
      addLinkValueError: '',
      previewItem: {properties: {}},
    });
    this.props.clearUrlContent();
  }
  
  handleAddLinkValue(event) {
    this.setState({ addLinkValue: event.target.value });    
  }
  
  handleAddLinkValueFromDialog(link) {
    this.setState({ addLinkValue: link }, () => this.handleAddLinkSubmit());
  }

  handleAddLinkSubmit = () => {
    console.log('in handle add link submit');
    if(this.state.addLinkValue === '') {
      console.log('no link value, abort');
      this.setState({ addLinkValueError: 'A link URL is required'});
      return;
    }
    const linkItem = {
      source: this.state.addLinkValue,
    };
    
    this.setState({ addLinkValue: '', linkDialog: false, searchDialog: false, rssFeedDialog: false, linkEditorDialog: true });
    
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
  
  setSearchFilter(event) {
    this.props.setSearchFilter(event.target.value);
  }
  
  render() {
    const actions = [
      { label: "close", onClick: this.closeAllDialog },
    ];
    
    return (
      <Wrapper>
        <MediaNav filter={this.props.filter} setSearchFilter={this.setSearchFilter} openAddFile={this.openAddFile} openAddRSS={this.openAddRSS} openAddLink={this.openAddLink} openAddBlog={this.openAddBlog} openSearch={this.openSearch} />
        <MediaContainer mediaItems={this.props.mediaItems} onConfirmDelete={this.onConfirmDelete.bind(this)} openPreview={this.openPreview} />
        <LinkDialog actions={actions} closeAllDialog={this.closeAllDialog} linkDialog={this.state.linkDialog} handleAddLinkValue={this.handleAddLinkValue.bind(this)} handleSubmit={this.handleAddLinkSubmit} value={this.state.addLinkValue} errorText={this.state.addLinkValueError} />
        <SearchDialog actions={actions} handleAddLinkValueFromDialog={this.handleAddLinkValueFromDialog} searchResults={this.props.searchResults} searchWeb={this.props.searchWeb} closeAllDialog={this.closeAllDialog} searchDialog={this.state.searchDialog} handleAddLinkValue={this.handleAddLinkValue.bind(this)} handleSubmit={this.handleAddLinkSumbit} value={this.state.addLinkValue} errorText={this.state.AddLinkValueError} />
        <LinkEditor actions={actions} closeAllDialog={this.closeAllDialog} handleLinkEditorSave={this.handleLinkEditorSave} linkEditorDialog={this.state.linkEditorDialog} urlContent={this.props.urlContent} filePickerKey={this.props.filePickerKey} />
        <RSSFeed actions={actions} classAllDialog={this.closeAllDialog} createFeed={this.props.createFeed} rssItems={this.props.rssItems} getFeedItems={this.props.getFeedItems} getFeeds={this.props.getFeeds} feeds={this.props.feeds} rssFeedDialog={this.state.rssFeedDialog} handleAddLinkValueFromDialog={this.handleAddLinkValueFromDialog} rssItems={this.props.rssItems} />
        <BlogEditorDialog actions={actions} closeAllDialog={this.closeAllDialog} blogEditorDialog={this.state.blogEditorDialog} />
        <PreviewDialog actions={actions} closeAllDialog={this.closeAllDialog} previewDialog={this.state.previewDialog} mediaItem={this.state.previewItem} />
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
    searchWeb: (string) => dispatch(searchWeb(string)),
    getFeeds: (accountId) => dispatch(getFeeds(accountId)),
    getFeedItems: (feedId) => dispatch(getRSSItems(feedId)),
    createFeed: (data) => dispatch(createFeed(data)),
    setVisibilityFilter: (filter) => dispatch(setVisibilityFilter(filter)),
    setSearchFilter: (searchFilter) => dispatch(setSearchFilter(searchFilter)),
    deleteMediaItem: (id) => dispatch(deleteMediaItem(id)),
  };
}

const mapStateToProps = createStructuredSelector({
  urlContent: makeSelectUrlContent(),
  filePickerKey: makeSelectFilePickerKey(),
  activeCollection: makeSelectActiveCollection(),
  mediaItems: makeSelectMediaItems(),
  searchResults: makeSelectSearchResults(),
  feeds: makeSelectFeeds(),
  rssItems: makeSelectRSSItems(),
  filter: makeSelectFilter(),
});

MediaItemLibrary.propTypes = {
  getMediaItems: PropTypes.func,
  params: PropTypes.any,
  fetchUrlData: PropTypes.func,
};

export default UserCanAccount(connect(mapStateToProps, mapDispatchToProps)(MediaItemLibrary));
