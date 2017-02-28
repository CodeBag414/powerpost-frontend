import React, { PropTypes, Component } from 'react';
import TableHeader from 'material-ui/Table';

const PPTableHeader = (props) => {
    
    return(
        <TableHeader {...props} />
    );
};


PPTableHeader.PropTypes = {
    adjustForCheckbox: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string, 
    displaySelectAll: PropTypes.bool,
    enableSelectAll: PropTypes.bool,
    style: PropTypes.object
    
};

export default PPTableHeader;