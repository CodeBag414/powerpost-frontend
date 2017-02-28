import React, { PropTypes, Component } from 'react';
import StepButton from 'material-ui/StepButton';

const PPStepButton = (props) => {
    
    return(
        <StepButton {...props} />
    );
};


PPStepButton.PropTypes = {
    active: PropTypes.bool,
    children: PropTypes.bool,
    completed: PropTypes.bool,
    disabled: PropTypes.bool,
    Icon: PropTypes.union,
    iconContainerStyle: PropTypes.object,
    style: PropTypes.object
    
    
};

export default PPStepButton;