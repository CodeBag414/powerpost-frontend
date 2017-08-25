/*
 * No Access View
 *
 *
 */

import React from 'react';

const NoAccess = () => <div style={{ maxWidth: '768px', margin: '0 auto', marginTop: '50px' }}>
<h3>No Access</h3>
<p>You do not have access to this view.</p>
<p>Possible reasons:</p>

<p>1) You have not been granted permission by an admin.<br />
2) You have access to multiple accounts and are logged into the wrong one.</p>

<p>If you have questions, please feel free to click on the Chat icon at the bottom of the screen.</p>
</div>;

export default NoAccess;
