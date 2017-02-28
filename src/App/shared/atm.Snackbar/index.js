import React, { PropTypes, Component } from 'react';
import Snackbar from 'material-ui/Snackbar';

const PPSnackbar= (props) => {
    
    return(
        <Snackbar {...props} style={{marginRight: '20px'}}/>
    );
};


PPSnackbar.PropTypes = {
    action: PropTypes.node,
    autoHideDuration: PropTypes.number,
    bodyStyle: PropTypes.object,
    className: PropTypes.string,
    contentStyle: PropTypes.object,
    message: PropTypes.node,
    onActionTouchTap: PropTypes.func,
    onRequestClose: PropTypes.func,
    open: PropTypes.bool,
    style: PropTypes.object
    
    
};

export default PPSnackbar;