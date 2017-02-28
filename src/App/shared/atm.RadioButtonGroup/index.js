import React, { PropTypes } from 'react';
import RadioButtonGroup from 'material-ui/RadioButton';

const PPRadioButtonGroup = (props) => {
    return(
        <RadioButtonGroup {...props} />
    );
};

PPRadioButtonGroup.PropTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    defaultSelected: PropTypes.any,
    lablePosition: PropTypes.oneOf(['left', 'right']), 
    name: PropTypes.string,
    onChange: PropTypes.func,
    style: PropTypes.object,
    valueSelected: PropTypes.any
    
    
};

export default PPRadioButtonGroup;