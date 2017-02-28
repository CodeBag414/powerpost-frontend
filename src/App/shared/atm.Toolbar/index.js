import React, { PropTypes, Component } from 'react';
import Toolbar from 'material-ui/Toolbar';

const PPToolbar = (props) => {
    
    return(
        <Toolbar {...props} />
    );
};


PPToolbar.PropTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    noGutter: PropTypes.bool,
    style: PropTypes.onject
    
};

export default PPToolbar;