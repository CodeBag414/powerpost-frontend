import React, { PropTypes } from 'react';
import Slider from 'material-ui/Slider';

const PPSlider = (props) => {
    return(
        <Slider {...props} />
    );
};

PPSlider.PropTypes = {
    axis: PropTypes.enum,
    defaultValue: PropTypes.valueInRangePropType,
    disableFocusRipple: PropTypes.bool,
    disabled: PropTypes.bool,
    max: PropTypes.minMaxPropType,
    min: PropTypes.minMaxPropType,
    name: PropTypes.String,
    onChange: PropTypes.func,
    onDragStart: PropTypes.func,
    onDragStop: PropTypes.func,
    required: PropTypes.bool,
    sldierStyle: PropTypes.object,
    step: PropTypes.number,
    style: PropTypes.object,
    value: PropTypes.valueInRagePropType
    
    
    
};

export default PPSlider;