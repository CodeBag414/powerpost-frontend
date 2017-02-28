import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';

const PPPaper = (props) => {
    return(
        <Paper {...props} />
    );
};

PPPaper.PropTypes = {
    children: PropTypes.node,
    circle: PropTypes.bool,
    rounded: PropTypes.bool,
    style: PropTypes.onject,
    transitionEnabled: PropTypes.bool,
    zDepth: PropTypes.zDepth
    
    
};

export default PPPaper;