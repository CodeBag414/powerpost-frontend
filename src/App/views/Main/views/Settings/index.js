/*
 * Settings View
 *
 * 
 */

import React from 'react';
import { UserCanSettings } from 'config.routes/UserRoutePermissions';

class Settings extends React.Component {
    
    render() {
        return (
            <div>
                In Settings view
            </div>
        );
    }
}

export default UserCanSettings(Settings);