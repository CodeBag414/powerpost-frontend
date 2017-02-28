import React, { PropTypes, Component } from 'react';
import {Step} from 'material-ui/Stepper';

const PPStep = (props) => {
    
    return(
        <Step {...props} />
    );
};


PPStep.PropTypes = {
    active: PropTypes.bool,
    children: PropTypes.bool,
    completed: PropTypes.bool,
    disabled: PropTypes.bool,
    style: PropTypes.object
    
    
};

export default PPStep;