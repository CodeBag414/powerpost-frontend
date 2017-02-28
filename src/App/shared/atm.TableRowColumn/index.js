import React, { PropTypes, Component } from 'react';
import TableRowColumn from 'material-ui/Table';

const PPTableRowColumn = (props) => {
    
    return(
        <TableRowColumn {...props} />
    );
};


PPTableRowColumn.PropTypes = {
    children: PropTypes.node,
    className: PropTypes.string, 
    style: PropTypes.object
    
};

export default PPTableRowColumn;