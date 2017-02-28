import React, { PropTypes, Component } from 'react';
import TableBody from 'material-ui/Table';

const PPTableBody = (props) => {
    
    return(
        <TableRowColumn {...props} />
    );
};


PPTableBody.PropTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    deselectedOnClickaway: PropTypes.bool,
    displayRowCheckbox: PropTypes.bool,
    preScanRows: PropTypes.bool,
    showRowHover: PropTypes.bool,
    stripedRows: PropTypes.bool,
    style: PropTypes.object
    
};

export default PPTableBody;