import React, { PropTypes, Component } from 'react';
import Divider from 'material-ui/Divider';

const style = {
  marginLeft: 20,
};

const PPDivider= (props) => {
    
    return(
        <Divider {...props}/>
    );
};


PPDivider.PropTypes = {
    inset: PropTypes.bool,
    style: PropTypes.object
};

export default PPDivider;