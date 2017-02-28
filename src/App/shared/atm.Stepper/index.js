import React, { PropTypes, Component } from 'react';
import Stepper from 'material-ui/Stepper';

const PPStepper = (props) => {
    
    return(
        <Stepper {...props} />
    );
};


PPStepper.PropTypes = {
    activeStep: PropTypes.number,
    children: PropTypes.arrayOf,
    connector: PropTypes.node.node,
    linear: PropTypes.bool,
    orientation: PropTypes.oneOf(['horizontal', 'vertical']), 
    style: PropTypes.object
    
    
};

export default PPStepper;