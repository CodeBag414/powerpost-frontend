import React, { PropTypes, Component } from 'react';
import Dialog from 'material-ui/Dialog';

const PPDialog = (props) => {
    
    return(
        <Dialog {...props} />
    );
};


PPDialog.PropTypes = {
    actions: PropTypes.node,
    actionsContainerClassName: PropTypes.string,
    autoDetectWindowHeight: PropTypes.bool,
    autoScrollBodyContent: PropTypes.bool,
    bodyClassName: PropTypes.string,
    bodyStyle: PropTypes.object,
    children: PropTypes.node,
    className: PropTypes.string,
    contentClassName: PropTypes.string,
    contentStyle: PropTypes.object,
    modal: PropTypes.bool,
    onRequestClose: PropTypes.func,
    open: PropTypes.bool,
    overlayClassName: PropTypes.string,
    overlayStyle: PropTypes.object,
    repositionOnUpdate: PropTypes.bool,
    style: PropTypes.object,
    title: PropTypes.node,
    titleClassName: PropTypes.string,
    titleStyle: PropTypes.object
    
    
    
    
};

export default PPDialog;