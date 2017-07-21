/*
 * Media Item Library
 *
 *
 */

import React, { PropTypes } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as dialogs from 'react-toolbox-dialogs';
import { routerActions } from 'react-router-redux';
import filepicker from 'filepicker-js';
import {
  makeSelectFilePickerKey,
} from 'containers/App/selectors';

import {
  fetchCollections,
  setVisibilityFilter,
  setSearchFilter,
  deleteMediaItem,
  toggleProccessingItem,
} from '../actions';

import {
  makeSelectActiveCollection,
  makeSelectMediaItems,
  makeSelectSearchResults,
  makeSelectFilter,
  makeSelectProcessingItem,
} from '../selectors';

import MediaNav from '../MediaNav';
import MediaContainer from '../MediaContainer';
import Wrapper from '../Wrapper';
import PreviewDialog from '../PreviewDialog';

class MediaItemLibrary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      previewDialog: false,
      previewItem: { properties: {} },
    };

    this.openPreview = this.openPreview.bind(this);
    this.closeAllDialog = this.closeAllDialog.bind(this);
    this.setSearchFilter = this.setSearchFilter.bind(this);
    this.setSortOrder = this.setSortOrder.bind(this);
    this.openEditor = this.openEditor.bind(this);
  }

  componentDidMount() {
    this.props.setSearchFilter('');
    // this.props.getMediaItems(this.props.params.account_id);
  }

  async onConfirmDelete(id, deleteMediaItemAction) {
    const result = await dialogs.confirm('Delete', 'Are you sure you want to delete this item?');
    console.log(result + id);
    if (result) {
      deleteMediaItemAction(id);
    }
  }

  setSearchFilter(event) {
    this.props.setSearchFilter(event.target.value);
  }

  setSortOrder(event) {
    this.setState({ sortOrder: event.value });
    this.props.setSortOrder(event.value);
  }

  openPreview(item) {
    this.setState({ previewDialog: true, previewItem: item });
  }

  openEditor(mediaItem) {
    const { openBlogEditor, openImageEditor, openLinkEditor, openVideoEditor, openFileEditor } = this.props;
    if (mediaItem.type === 'blog') {
      openBlogEditor(mediaItem);
    } else if (mediaItem.type === 'image') {
      openImageEditor(mediaItem);
    } else if (mediaItem.type === 'link') {
      openLinkEditor(mediaItem);
    } else if (mediaItem.type === 'video') {
      openVideoEditor(mediaItem);
    } else if (mediaItem.type === 'document') {
      openFileEditor(mediaItem);
    } else {
      openFileEditor(mediaItem);
    }
  }

  closeAllDialog() {
    this.setState({
      previewDialog: false,
      previewItem: { properties: {} },
    });
  }

  handleLinkEditorSave(linkItem) {
    this.setState({ linkEditorDialog: false });
    filepicker.setKey(this.props.filePickerKey);
    if (linkItem.picture) {
      filepicker.storeUrl(`https://process.filestackapi.com/${this.props.filePickerKey}/${linkItem.picture}`, (Blob) => {
        console.log(Blob);
        filepicker.storeUrl(
          `https://process.filestackapi.com/${this.props.filePickerKey}/resize=width:300,height:300,fit:clip/${Blob.url}`,
          (blob) => {
            this.props.createMediaItem({
              ...linkItem,
              picture: Blob.url,
              picture_key: Blob.key,
              thumb_key: blob.key,
              collection_id: this.props.activeCollection.collection_id,
              mediaItemType: 'link',
            });
          });
      });
    } else {
      this.props.createMediaItem({
        ...linkItem,
        mediaItemType: 'link',
      });
    }
  }

  render() {
    return (
      <Wrapper>
        <MediaNav
          filter={this.props.filter}
          setSortOrder={this.setSortOrder}
          setSearchFilter={this.setSearchFilter}
          openAddFile={this.openAddFile}
          openAddRSS={this.openAddRSS}
          openAddLink={this.openAddLink}
          openAddBlog={this.openAddBlog}
          openSearch={this.openSearch}
          sortOrder={this.state.sortOrder}
        />
        <MediaContainer
          createPostSet={this.props.createPostSet}
          pushToEditor={this.props.pushToEditor}
          query={this.props.location.query}
          processingItem={this.props.processingItem}
          mediaItems={this.props.mediaItems}
          onConfirmDelete={(id) => this.onConfirmDelete(id, this.props.deleteMediaItem)}
          openPreview={this.openPreview}
          openEditor={this.openEditor}
          permissionClasses={this.props.permissionClasses}
        />
        <PreviewDialog
          createPostSet={this.props.createPostSet}
          closeAllDialog={this.closeAllDialog}
          previewDialog={this.state.previewDialog}
          mediaItem={this.state.previewItem}
          permissionClasses={this.props.permissionClasses}
        />
      </Wrapper>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getMediaItems: (accountId) => dispatch(fetchCollections(accountId)),
    setVisibilityFilter: (filter) => dispatch(setVisibilityFilter(filter)),
    setSearchFilter: (searchFilter) => dispatch(setSearchFilter(searchFilter)),
    deleteMediaItem: (id) => dispatch(deleteMediaItem(id)),
    setProcessingItem: (processingItem) => dispatch(toggleProccessingItem(processingItem)),
    pushToEditor: (accountId, postSetId, mediaItem) => dispatch(routerActions.push({ pathname: postSetId, query: { item: JSON.stringify(mediaItem) } })),
  };
}

const mapStateToProps = createStructuredSelector({
  filePickerKey: makeSelectFilePickerKey(),
  activeCollection: makeSelectActiveCollection(),
  mediaItems: makeSelectMediaItems(),
  searchResults: makeSelectSearchResults(),
  filter: makeSelectFilter(),
  processingItem: makeSelectProcessingItem(),
});

MediaItemLibrary.propTypes = {
  setSearchFilter: PropTypes.func,
  deleteMediaItem: PropTypes.func,
  setSortOrder: PropTypes.func,
  openBlogEditor: PropTypes.func,
  openImageEditor: PropTypes.func,
  openLinkEditor: PropTypes.func,
  openVideoEditor: PropTypes.func,
  openFileEditor: PropTypes.func,
  filePickerKey: PropTypes.string,
  createMediaItem: PropTypes.func,
  activeCollection: PropTypes.object,
  filter: PropTypes.string,
  createPostSet: PropTypes.func,
  pushToEditor: PropTypes.func,
  location: PropTypes.object,
  processingItem: PropTypes.func,
  mediaItems: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaItemLibrary);
