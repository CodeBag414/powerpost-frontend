/*
 * Connections View
 *
 * 
 */

import React from 'react';
import { UserCanConnections } from 'config.routes/UserRoutePermissions';

class Connections extends React.Component {
    
    render() {
        return (
            <div>
                In Connections view
            </div>
        );
    }
}

export default UserCanConnections(Connections);