/*
 * Account Dashboard
 *
 * 
 */

import React from 'react';
import { UserCanAccount } from 'config.routes/UserRoutePermissions';

class AccountDashboard extends React.Component {
    
    render() {
        return (
            <div>
                in Account Dashboard View
            </div>
        );
    }
}

export default UserCanAccount(AccountDashboard);