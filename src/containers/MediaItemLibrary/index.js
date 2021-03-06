/*
 * Library View
 *
 *
 */

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import filepicker from 'filepicker-js';
import { createStructuredSelector } from 'reselect';
import { routerActions } from 'react-router-redux';
import DropdownMenu from 'react-dd-menu';
import ReactSummernote from 'react-summernote';
import { UserCanLibrary } from 'config.routes/UserRoutePermissions';

import {
  createPostSetRequest,
} from 'containers/App/actions';
import {
  makeSelectFilePickerKey,
} from 'containers/App/selectors';

import Button from 'elements/atm.Button';
import MenuItem from 'elements/atm.MenuItem';
import Menu from 'elements/atm.Menu';
import withReactRouter from 'elements/hoc.withReactRouter';
import { getClassesByPage } from 'utils/permissionClass';

import {
  setProcessing,
} from 'containers/Main/actions';

import {
  makeSelectIsProcessing,
  makeSelectCurrentAccount,
} from 'containers/Main/selectors';

import Wrapper from './Wrapper';
import BlogEditor from './BlogEditor';
import LinkDialog from './LinkDialog';
import EmbedDialog from './EmbedDialog';
import LinkEditor from './LinkEditor';
import ImageEditor from './ImageEditor';
import VideoEditor from './VideoEditor';
import FileEditor from './FileEditor';
import styles from './styles.scss';

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
  toggleProccessingItem,
  updateMediaItem,
  setSortOrder,
  setActiveMediaItemId,
  createBlogItemRequest,
  setIsFetching,
  getEmbedData,
} from './actions';

import {
  makeSelectUrlContent,
  makeSelectActiveCollection,
  makeSelectMediaItems,
  makeSelectSearchResults,
  makeSelectFeeds,
  makeSelectRSSItems,
  makeSelectFilter,
  makeSelectProcessingItem,
  makeSelectActiveMediaItem,
  makeSelectEmbedData,
} from './selectors';

const DropDownMenu = styled(DropdownMenu)`
 .dd-menu-items {
    z-index: 3333;
    position: absolute;
    right: 20px;
    background: white;
    box-shadow: 0 1px 5px 0 rgba(60,92,129,0.22);
    ul {
      padding: 0;
      width: 150px;
      text-align:center;
    }
  }
`;

/*
const HR = styled.hr`
  margin: 0;
  position: absolute;
  width: 100%;
  top: 50%;
  border-top: solid 2px #DBDFE0;
`;

const NormalHR = styled.hr`
  border-top: solid 2px #DBDFE0;
`;
*/

const ContentWrapper = styled.div`
  float: right;
  width: calc(100% - 177px);
  height: 100%;
`;

const SidebarWrapper = styled.div`
  width: 177px;
  height: 100vh;
  position:fixed;
  border-right: 2px solid #DBDFE0;
  padding: 5px;
  padding-top: 15px;
`;

const ReactRouterMenuItem = withReactRouter(MenuItem);

class Library extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      linkDialog: false,
      addLinkValue: '',
      addLinkValueError: '',
      linkEditorDialog: false,
      imageEditorDialog: false,
      videoEditorDialog: false,
      fileEditorDialog: false,
      embedDialog: false,
      imageItem: {},
      linkItem: {},
      videoItem: {},
      fileItem: {},
      addMenuOpen: false,
      blogItem: {},
    };
    this.toggle = this.toggle.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.openAddBlog = this.openAddBlog.bind(this);
    this.openAddLink = this.openAddLink.bind(this);
    this.openFileEditor = this.openFileEditor.bind(this);
    this.openImageEditor = this.openImageEditor.bind(this);
    this.openLinkEditor = this.openLinkEditor.bind(this);
    this.openAddFile = this.openAddFile.bind(this);
    this.openVideoEditor = this.openVideoEditor.bind(this);
    this.closeAllDialog = this.closeAllDialog.bind(this);
    this.handleOpenAddFile = this.handleOpenAddFile.bind(this);
    this.handleAddLinkValueFromDialog = this.handleAddLinkValueFromDialog.bind(this);
  }

  componentDidMount() {
    this.props.getMediaItems(this.props.params.account_id);
    this.props.getFeeds(this.props.params.account_id);
  }

  componentWillReceiveProps(nextProps) {
    // If Blog post is created or updated successfully, then the modal view for blog editor will be hidden

    if (this.props.isProcessing !== nextProps.isProcessing) {
      if(!nextProps.isProcessing && nextProps.location.hash.startsWith('#blog-editor')) {
        // do nothing
      } else if (!nextProps.isProcessing && !nextProps.location.hash.startsWith('#postset')) {
        //this.props.pushToRoute(this.props.location.pathname);
        //console.log('change route');
      }
    }
  }

  openAddLink() {
    this.setState({ linkDialog: true });
  }

  openAddEmbed = () => {
    this.setState({ embedDialog: true });
  }

  openAddBlog() {
    const { pathname } = this.props.location;
    this.setState({ blogItem: {} });
    this.props.pushToRoute(`${pathname}#blog-editor`);
  }

  openBlogEditor = (mediaItem) => {
    const { pathname } = this.props.location;
    this.setState({ blogItem: mediaItem });
    this.props.pushToRoute(`${pathname}#blog-editor`);
  }

  openLinkEditor(linkItem) {
    if (linkItem) {
      this.setState({ linkEditorDialog: true, linkItem });
    } else {
      this.setState({ linkEditorDialog: true });
    }
  }

  openFileEditor(fileItem) {
    this.setState({ fileEditorDialog: true, fileItem });
  }

  openImageEditor(imageItem) {
    this.setState({ imageEditorDialog: true, imageItem });
  }

  openVideoEditor(videoItem) {
    this.setState({ videoEditorDialog: true, videoItem });
  }

  handleRequestClose() {
    this.setState({
      addMenuOpen: false,
    });
  }

  openAddFile() {
    filepicker.setKey(this.props.filePickerKey);
    const hash = this.props.location.hash;
    let mimetypes;
    if (hash === '#blog-editor') {
      mimetypes = { mimetype: 'image/*' }
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
      console.log(`error: ${error}`);
    }

    filepicker.pickAndStore(filePickerOptions, filePickerStoreOptions, this.handleOpenAddFile, onFail);
  }

  closeAllDialog() {
    this.setState({
      linkDialog: false,
      embedDialog: false,
      linkEditorDialog: false,
      videoEditorDialog: false,
      imageEditorDialog: false,
      fileEditorDialog: false,
      addLinkValueError: '',
      imageItem: {},
      fileItem: {},
      linkItem: {},
      videoItem: {},
    });
    this.props.clearUrlContent();
  }

  handleVideoEditorSave = (videoItem) => {
    this.setState({ videoEditorDialog: false, videoItem: {} });
    const { action, ...item } = videoItem;
    filepicker.setKey(this.props.filePickerKey);
    this.props.setProcessing(true);
    if (item.picture) {
      filepicker.storeUrl(`https://process.filestackapi.com/${this.props.filePickerKey}/${item.picture}`, (Blob) => {
        item.picture = Blob.url;
        item.picture_key = Blob.key;
        filepicker.storeUrl(
          `https://process.filestackapi.com/${this.props.filePickerKey}/resize=width:300,height:300,fit:clip/${item.picture}`,
           (blob) => {
             item.thumb_key = blob.key;
             item.collection_id = this.props.activeCollection.collection_id;
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
    const hash = this.props.location.hash;
    if (hash === '#blog-editor') {
      const video = document.createElement('video');
      video.src = item.properties.url;
      video.controls = true;
      video.style.cssText = 'width:100%;height:auto;';
      ReactSummernote.insertNode(video);
    }
  }

  handleFileEditorSave = (item) => {
    this.setState({ fileEditorDialog: false, fileItem: {} });
    const { action, ...fileItem } = item;
    filepicker.setKey(this.props.filePickerKey);
    this.props.setProcessing(true);
    if (fileItem.picture) {
      filepicker.storeUrl(`https://process.filestackapi.com/${this.props.filePickerKey}/${fileItem.picture}`, (Blob) => {
        fileItem.picture = Blob.url;
        fileItem.picture_key = Blob.key;
        filepicker.storeUrl(
          `https://process.filestackapi.com/${this.props.filePickerKey}/resize=width:300,height:300,fit:clip/${fileItem.picture}`,
           (blob) => {
             fileItem.thumb_key = blob.key;
             fileItem.collection_id = this.props.activeCollection.collection_id;
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

  handleLinkEditorSave = (item) => {
    this.closeAllDialog();
    const { action, ...linkItem } = item;
    filepicker.setKey(this.props.filePickerKey);
    const picture = linkItem.picture || linkItem.properties.picture;
    this.props.setProcessing(true);
    if (picture && picture !== 'remove') {
      filepicker.storeUrl(`https://process.filestackapi.com/${this.props.filePickerKey}/resize=width:750,fit:clip/${picture}`, (Blob) => {
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
            linkItem.collection_id = this.props.activeCollection.collection_id;
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
    } else if (picture === 'remove') {
      linkItem.collection_id = this.props.activeCollection.collection_id;
      linkItem.mediaItemType = 'link';
      if (action === 'create') {
        linkItem.thumb_key = null;
        linkItem.picture = null;
        this.props.createMediaItem(linkItem);
      } else if (action === 'update') {
        linkItem.properties.thumb_key = null;
        linkItem.properties.picture_key = null;
        linkItem.properties.picture = null;
        this.props.updateMediaItem(linkItem);
      }
    } else {
      linkItem.mediaItemType = 'link';
      linkItem.collection_id = this.props.activeCollection.collection_id;
      if (action === 'create') {
        this.props.createMediaItem(linkItem);
      } else if (action === 'update') {
        this.props.updateMediaItem(linkItem);
      }
    }
  }

  handleImageEditorSave = (imageItem) => {
    this.setState({ imageEditorDialog: false, imageItem: {} });
    const { action, ...rest } = imageItem;
    this.props.setProcessing(true);
    if (action === 'update') {
      this.props.updateMediaItem(rest);
    } else if (action === 'create') {
      this.props.createMediaItem(rest);
    }
    const hash = this.props.location.hash;
    if (hash === '#blog-editor') {
      const img = document.createElement('img');
      img.src = `https://s3.amazonaws.com/powerpost/${imageItem.properties.key}`;
      ReactSummernote.insertNode(img);
    }
  }

  handleAddLinkValue = (event) => {
    this.setState({ addLinkValue: event.target.value });
  }

  handleAddLinkValueFromDialog(link) {
    this.setState({ addLinkValue: link }, () => this.handleAddLinkSubmit());
  }

  handleAddLinkSubmit = () => {
    if (this.state.addLinkValue === '') {
      this.setState({ addLinkValueError: 'A link URL is required' });
      return;
    }
    this.setState({ addLinkValue: '', linkDialog: false, searchDialog: false, rssFeedDialog: false, linkEditorDialog: true });
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

  handleOpenAddFile(mediaItem) {
    filepicker.setKey(this.props.filePickerKey);
    this.props.setProcessing(true);
    if (mediaItem[0].mimetype.match('image')) {
      filepicker.storeUrl(
        `https://process.filestackapi.com/${this.props.filePickerKey}/resize=width:300,height:300,fit:clip/${mediaItem[0].url}`,
        (Blob) => {
          const imageItem = {
            mediaItemType: 'file',
            properties: {
              ...mediaItem[0],
              thumb_key: Blob.key,
              collection_id: this.props.activeCollection.collection_id,
            },
          };
          this.openImageEditor(imageItem);
        });
    } else if (mediaItem[0].mimetype.match('video')) {
      const videoItem = {
        mediaItemType: 'file',
        properties: {
          ...mediaItem[0],
          collection_id: this.props.activeCollection.collection_id,
        },
      };
      this.openVideoEditor(videoItem);
    } else {
      const fileItem = {
        mediaItemType: 'file',
        properties: {
          ...mediaItem[0],
          collection_id: this.props.activeCollection.collection_id,
        },
      };
      this.openFileEditor(fileItem);
      // this.props.createMediaItem(fileItem);
    }
  }

  toggle() {
    this.setState({ addMenuOpen: !this.state.addMenuOpen });
  }

  createPostSet = (mediaItem) => {
    this.closeAllDialog();
    const { params: { account_id }, createPostSet } = this.props;
    const postSet = {
      account_id,
      message: '',
      type: 'text',
      status: '6',
      title: '',
      media_item_ids: [mediaItem.media_item_id],
    };
    createPostSet(postSet);
  }

  createBlogPost = (blogItem) => {
    this.props.setProcessing(true);
    this.props.createBlogItem(blogItem);
  }

  updateBlogPost = (blogItem) => {
    this.props.setProcessing(true);
    this.props.updateMediaItem(blogItem);
  }

  render() {
    const { location: { hash }, activeBrand } = this.props;
    const blogEditor = hash.startsWith('#blog-editor');

    const actions = [
      { label: 'close', onClick: this.closeAllDialog },
    ];
    const menuOptions = {
      isOpen: this.state.addMenuOpen,
      close: this.handleRequestClose,
      toggle: <Button label="Add New Item" primary onClick={this.toggle} />,
      align: 'left',
    };
    const { permissions } = activeBrand.user_access;
    const permissionClasses = getClassesByPage(permissions, 'library');
    return (
      <Wrapper>
        <SidebarWrapper>
          <div style={{ display: 'block', textAlign: 'center' }}>
            <DropDownMenu {...menuOptions} className={permissionClasses.createNewItem} >
              <MenuItem caption="Add File" onClick={this.openAddFile} />
              <MenuItem caption="Add Link" onClick={this.openAddLink} />
              <MenuItem caption="Add Blog" onClick={this.openAddBlog} />
            </DropDownMenu>
          </div>
          <Menu style={{ margin: '0 auto', padding: '0', width: '150px' }} selectable>
            <ReactRouterMenuItem caption="Media Library" activeClassName={styles.active} to={`/account/${this.props.params.account_id}/library/media`} style={{ color: '#616669', fontWeight: '700', fontSize: '13px !important' }} />
            <ReactRouterMenuItem caption="Search the Web" className={permissionClasses.createNewItem} activeClassName={styles.active} to={`/account/${this.props.params.account_id}/library/search`} style={{ color: '#616669', fontWeight: '700', fontSize: '13px !important' }} />
            <ReactRouterMenuItem caption="RSS Feeds" className={permissionClasses.createNewItem} activeClassName={styles.active} to={`/account/${this.props.params.account_id}/library/RSS`} style={{ color: '#616669', fontWeight: '700', fontSize: '9px !important' }} />
          </Menu>
        </SidebarWrapper>
        <ContentWrapper>
          {React.cloneElement(this.props.children,
            { ...this.props,
              createPostSet: this.createPostSet,
              openImageEditor: this.openImageEditor,
              openLinkEditor: this.openLinkEditor,
              openVideoEditor: this.openVideoEditor,
              openFileEditor: this.openFileEditor,
              openBlogEditor: this.openBlogEditor,
              handleAddLinkValueFromDialog: this.handleAddLinkValueFromDialog,
              permissionClasses: permissionClasses,
            }
          )}
        </ContentWrapper>
        <LinkEditor actions={actions} permissionClasses={permissionClasses} closeAllDialog={this.closeAllDialog} handleLinkEditorSave={this.handleLinkEditorSave} mediaLibraryContext linkEditorDialog={this.state.linkEditorDialog} urlContent={this.props.urlContent} filePickerKey={this.props.filePickerKey} linkItem={this.state.linkItem} />
        <ImageEditor actions={actions} permissionClasses={permissionClasses} setProcessing={this.props.setProcessing} closeAllDialog={this.closeAllDialog} handleSave={this.handleImageEditorSave} isOpen={this.state.imageEditorDialog} filePickerKey={this.props.filePickerKey} imageItem={this.state.imageItem} />
        <EmbedDialog actions={actions} permissionClasses={permissionClasses} setProcessing={this.props.setProcessing} closeAllDialog={this.closeAllDialog} embedDialog={this.state.embedDialog} handleAddLinkValue={this.handleAddLinkValue} handleSubmit={this.handleEmbedSubmit} value={this.state.addLinkValue} error={this.state.addLinkValueError} />
        <LinkDialog actions={actions} permissionClasses={permissionClasses} setProcessing={this.props.setProcessing} closeAllDialog={this.closeAllDialog} linkDialog={this.state.linkDialog} handleAddLinkValue={this.handleAddLinkValue} handleSubmit={this.handleAddLinkSubmit} value={this.state.addLinkValue} errorText={this.state.addLinkValueError} />
        <VideoEditor actions={actions} permissionClasses={permissionClasses} setProcessing={this.props.setProcessing} closeAllDialog={this.closeAllDialog} handleSave={this.handleVideoEditorSave} isOpen={this.state.videoEditorDialog} filePickerKey={this.props.filePickerKey} videoItem={this.state.videoItem} />
        <FileEditor actions={actions} permissionClasses={permissionClasses} setProcessing={this.props.setProcessing} closeAllDialog={this.closeAllDialog} handleSave={this.handleFileEditorSave} isOpen={this.state.fileEditorDialog} filePickerKey={this.props.filePickerKey} fileItem={this.state.fileItem} />
        <div className="post-editor">
          { blogEditor ? <BlogEditor
            filePickerKey={this.props.filePickerKey}
            location={this.props.location}
            onCreate={this.createBlogPost}
            onUpdate={this.updateBlogPost}
            selectedItem={this.state.blogItem}
            filePickerKey={this.props.filePickerKey}
            openAddFile={this.openAddFile}
            openAddLink={this.openAddEmbed}
            openBlogEditor={this.openBlogEditor}
            embedData={this.props.embedData}
            getEmbedData={this.props.getEmbedData}
            goBack={this.props.goBack}
            pushToRoute={this.props.pushToRoute}
            handleAddLinkValueFromDialog={this.handleAddLinkValueFromDialog}
          /> : null }
        </div>
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
    setSortOrder: (sortOrder) => dispatch(setSortOrder(sortOrder)),
    deleteMediaItem: (id) => dispatch(deleteMediaItem(id)),
    setProcessingItem: (processingItem) => dispatch(toggleProccessingItem(processingItem)),
    updateMediaItem: (mediaItem) => dispatch(updateMediaItem(mediaItem)),
    setActiveMediaItemId: (id) => dispatch(setActiveMediaItemId(id)),
    createPostSet: (postSet) => dispatch(createPostSetRequest(postSet)),
    createBlogItem: (payload) => dispatch(createBlogItemRequest(payload)),
    setProcessing: (processing) => dispatch(setProcessing(processing)),
    setIsFetching: (isFetching) => dispatch(setIsFetching(isFetching)),
    getEmbedData: (url) => dispatch(getEmbedData(url)),
    pushToRoute: (route) => dispatch(routerActions.push(route)),
    goBack: () => dispatch(routerActions.goBack()),
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
  processingItem: makeSelectProcessingItem(),
  activeMediaItem: makeSelectActiveMediaItem(),
  isProcessing: makeSelectIsProcessing(),
  activeBrand: makeSelectCurrentAccount(),
  embedData: makeSelectEmbedData(),
});

Library.propTypes = {
  children: PropTypes.node,
  getMediaItems: PropTypes.func,
  getFeeds: PropTypes.func,
  params: PropTypes.any,
  fetchUrlData: PropTypes.func,
  filePickerKey: PropTypes.string,
  clearUrlContent: PropTypes.func,
  setProcessing: PropTypes.func,
  createMediaItem: PropTypes.func,
  updateMediaItem: PropTypes.func,
  createPostSet: PropTypes.func,
  createBlogItem: PropTypes.func,
  isProcessing: PropTypes.func,
  urlContent: PropTypes.string,
  activeBrand: PropTypes.object,
  activeCollection: PropTypes.shape({
    collection_id: PropTypes.string,
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

export default UserCanLibrary(connect(mapStateToProps, mapDispatchToProps)(Library));
