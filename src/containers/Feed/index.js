/*
 * Feed
 *
 *
 */

import React from 'react';

import { UserCanAccount } from 'config.routes/UserRoutePermissions';

const Feed = () => <div>In Feed View</div>;

export default UserCanAccount(Feed);
