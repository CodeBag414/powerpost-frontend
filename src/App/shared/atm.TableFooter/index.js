import React, { PropTypes, Component } from 'react';
import TableFooter from 'material-ui/Table';

const PPTableFooter = (props) => {
    
    return(
        <TableRowFooter {...props} />
    );
};


PPTableFooter.PropTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    style: PropTypes.object
    
};

export default PPTableFooter;