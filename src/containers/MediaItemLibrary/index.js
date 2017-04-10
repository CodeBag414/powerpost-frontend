/*
 * Media Item Library
 *
 *
 */
 
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { UserCanAccount } from 'config.routes/UserRoutePermissions';

import { fetchCollections } from './actions';

import MediaNav from './MediaNav';
import MediaContainer from './MediaContainer.js';
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
      addLinkValueError: '',
    });  
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
    
    this.setState({ addLinkValue: '', linkDialog: false });
    console.log(linkItem);
  }
  
  render() {
    const actions = [
      { label: "close", onClick: this.closeAllDialog },
    ];
    
    return (
      <Wrapper>
        <MediaNav openAddFile={this.openAddFile} openAddRSS={this.openAddRSS} openAddLink={this.openAddLink} openAddBlog={this.openAddBlog} />
        <MediaContainer />
        <LinkDialog actions={actions} closeAllDialog={this.closeAllDialog} linkDialog={this.state.linkDialog} handleAddLinkValue={this.handleAddLinkValue.bind(this)} handleSubmit={this.handleAddLinkSubmit} value={this.state.addLinkValue} errorText={this.state.addLinkValueError} />
        <LinkEditor actions={actions} closeAllDialog={this.closeAllDialog} linkEditorDialog={this.state.linkEditorDialog} />
      </Wrapper>
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
