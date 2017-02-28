import React, { PropTypes, Component } from 'react';
import {ToolbarTitle} from 'material-ui/Toolbar';

const PPToolbarTitle = (props) => {
    
    return(
        <ToolbarTitle {...props} />
    );
};


PPToolbarTitle.PropTypes = {
    className: PropTypes.string,
    style: PropTypes.onject,
    text: PropTypes.string
    
};

export default PPToolbarTitle;