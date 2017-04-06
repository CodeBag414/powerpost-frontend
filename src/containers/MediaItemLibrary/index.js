/*
 * Media Item Library
 *
 *
 */
 
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { UserCanAccount } from 'config.routes/UserRoutePermissions';
import PPDialog from 'elements/atm.Dialog';

import { fetchCollections } from './actions';

import MediaNav from './MediaNav';
import MediaContainer from './MediaContainer.js';

class MediaItemLibrary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      linkDialog: false,
    };
    
    this.openAddBlog = this.openAddBlog.bind(this);
    this.openAddFile = this.openAddFile.bind(this);
    this.openAddRSS = this.openAddRSS.bind(this);
    this.openAddLink = this.openAddLink.bind(this);
    this.closeAllDialog = this.closeAllDialog.bind(this);
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
  
  closeAllDialog() {
    this.setState({ linkDialog: false });  
  }
  
  render() {
    const actions = [
      { label: "close", onClick: this.closeAllDialog },
    ];
    
    return (
      <div>
        <MediaNav openAddFile={this.openAddFile} openAddRSS={this.openAddRSS} openAddLink={this.openAddLink} openAddBlog={this.openAddBlog} />
        <MediaContainer />
        <PPDialog
          active={this.state.linkDialog}
          title="Insert Link URL"
          onEscKeyDown={this.closeAllDialog}
          onOverlayClick={this.closeAllDialog}
          actions={actions}
        >
          <div style={{ marginTop: '84px' }}>
            <h1>Test</h1>
          </div>
        </PPDialog>
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getMediaItems: (accountId) => dispatch(fetchCollections(accountId)),
  };
}

const mapStateToProps = createStructuredSelector({

});

MediaItemLibrary.propTypes = {
  getMediaItems: PropTypes.func,
  params: PropTypes.any,
};

export default UserCanAccount(connect(mapStateToProps, mapDispatchToProps)(MediaItemLibrary));
