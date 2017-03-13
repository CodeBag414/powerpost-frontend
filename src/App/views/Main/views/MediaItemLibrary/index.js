/*
 * Media Item Library
 *
 * 
 */
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { UserCanAccount } from 'config.routes/UserRoutePermissions';
import { fetchCollections } from './state/actions';

import MediaNav from './components/MediaNav';

class MediaItemLibrary extends React.Component {
    
    componentDidMount() {
        this.props.getMediaItems(this.props.params.account_id);
    }
    
    render() {
        return (
            <div>
                <MediaNav />
                in media item library
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

export default UserCanAccount(connect(mapStateToProps, mapDispatchToProps)(MediaItemLibrary));