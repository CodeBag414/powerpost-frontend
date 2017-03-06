import React, { PropTypes, Component } from 'react';
import Subheader from 'material-ui/Subheader';

const PPSubheader = (props) => {
    
    return(
        <Subheader {...props} />
    );
};


PPSubheader.PropTypes = {
    children: PropTypes.bool,
    inset: PropTypes.bool,
    style: PropTypes.object
    
    
};

export default PPSubheader;