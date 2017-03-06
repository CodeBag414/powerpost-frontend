/*
 * Media Item Library
 *
 * 
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { UserCanAccount } from 'config.routes/UserRoutePermissions';

class MediaItemLibrary extends React.Component {
    
    render() {
        return (
            <div>
                in media item library
            </div>
        );
    }
}

export function mapDispatchToProps(dispatch) {
  return {

  };
}

const mapStateToProps = createStructuredSelector({

});

export default UserCanAccount(connect(mapStateToProps, mapDispatchToProps)(MediaItemLibrary));