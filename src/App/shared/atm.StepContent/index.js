import React, { PropTypes, Component } from 'react';
import StepContent from 'material-ui/Stepper';

const PPStepContent = (props) => {
    
    return(
        <StepContent {...props} />
    );
};


PPStepContent.PropTypes = {
    active: PropTypes.bool,
    children: PropTypes.bool,
    style: PropTypes.object,
    transition: PropTypes.Func,
    transitionDuration: PropTypes.number
    
    
};

export default PPStepContent;