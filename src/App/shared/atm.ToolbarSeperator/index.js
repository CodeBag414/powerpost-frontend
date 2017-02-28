import React, { PropTypes, Component } from 'react';
import ToolbarSeperator from 'material-ui/Toolbar';

const PPToolbarSeperator = (props) => {
    
    return(
        <ToolbarSeperator {...props} />
    );
};


PPToolbarSeperator.PropTypes = {
    className: PropTypes.string,
    style: PropTypes.onject
    
};

export default PPToolbarSeperator;