import React, { PropTypes, Component } from 'react';
import {StepLabel} from 'material-ui/Stepper';

const PPStepLabel = (props) => {
    
    return(
        <StepLabel {...props} />
    );
};


PPStepLabel.PropTypes = {
    active: PropTypes.bool,
    children: PropTypes.bool,
    completed: PropTypes.bool,
    disabled: PropTypes.bool,
    Icon: PropTypes.union,
    iconContainerStyle: PropTypes.object,
    style: PropTypes.object
    
    
};

export default PPStepLabel;