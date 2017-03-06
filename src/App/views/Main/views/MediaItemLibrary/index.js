/*
 * Media Item Library
 *
 * 
 */

import React from 'react';
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

export default UserCanAccount(MediaItemLibrary)