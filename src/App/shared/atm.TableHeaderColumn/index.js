import React, { PropTypes, Component } from 'react';
import TableHeaderColumn from 'material-ui/Table';

const PPTableHeaderColumn = (props) => {
    
    return(
        <TableHeaderColumn {...props} />
    );
};


PPTableHeaderColumn.PropTypes = {
    children: PropTypes.node,
    className: PropTypes.string, 
    columnNumber: PropTypes.number,
    style: PropTypes.object,
    tooltip: PropTypes.string,
    tooltipStyle: PropTypes.object
    
};

export default PPTableHeaderColumn;