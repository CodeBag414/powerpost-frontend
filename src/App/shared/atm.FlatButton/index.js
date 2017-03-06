import React, { PropTypes, Component } from 'react';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  uploadButton: {
    verticalAlign: 'middle',
  },
  uploadInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

const PPFlatButton= (props) => {
    
    return(
        <FlatButton {...props}/>
    );
};


PPFlatButton.PropTypes = {
    backgroundColor: PropTypes.string,	
    children: PropTypes.node,
    disabled: PropTypes.bool, 
    hoverColor: PropTypes.string, 
    href: PropTypes.string,
    icon: PropTypes.node, 
    label: PropTypes.validateLabel, 
    labelPosition: PropTypes.oneOf(['before', 'after']), 
    labelStyle: PropTypes.object, 
    onKeyboardFocus: PropTypes.function,
};

export default PPFlatButton;