import React, { PropTypes, Component } from 'react';
import TableRow from 'material-ui/Table';

const PPTableRow = (props) => {
    
    return(
        <TableRow {...props} />
    );
};


PPTableRow.PropTypes = {
    children: PropTypes.node,
    className: PropTypes.string, 
    displayBorder: PropTypes.bool,
    hoverable: PropTypes.bool,
    hovered: PropTypes.bool,
    rowNumber: PropTypes.number,
    selectable: PropTypes.bool,
    selected: PropTypes.bool,
    striped: PropTypes.bool,
    style: PropTypes.object
    
};

export default PPTableRow;