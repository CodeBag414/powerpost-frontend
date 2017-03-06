import React, { PropTypes, Component } from 'react';
import Table from 'material-ui/Table';

const PPTable = (props) => {
    
    return(
        <Table {...props} />
    );
};


PPTable.PropTypes = {
    allRowsSelected: PropTypes.bool,
    bodyStyle: PropTypes.object,
    children: PropTypes.node,
    className: PropTypes.string,
    fixedFooter: PropTypes.bool,
    fixedHeader: PropTypes.bool,
    footerStyle: PropTypes.bool,
    headerStyle: PropTypes.object,
    height: PropTypes.string,
    multiSelectable: PropTypes.bool,
    onCellClick: PropTypes.func,
    onCellHover: PropTypes.func,
    onCellHoverExit: PropTypes.func,
    onRowSelection: PropTypes.func,
    selectable: PropTypes.bool,
    style: PropTypes.object,
    wrapperStyle: PropTypes.object
    
};

export default PPTable;