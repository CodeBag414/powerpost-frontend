import React, { PropTypes, Component } from 'react';
import {ToolbarGroup} from 'material-ui/Toolbar';

const PPToolbarGroup = (props) => {
    
    return(
        <ToolbarGroup {...props} />
    );
};


PPToolbarGroup.PropTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    firstChild: PropTypes.bool,
    lastChild: PropTypes.bool,
    style: PropTypes.onject
    
};

export default PPToolbarGroup;