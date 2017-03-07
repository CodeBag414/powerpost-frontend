import React, { PropTypes } from 'react';
import {RadioButtonGroup} from 'material-ui/RadioButton';

const PPRadioButtonGroup = (props) => {
    const styles = require('./styles.scss');
    return(
        <RadioButtonGroup {...props} className={styles.radiogStyles} />
    );
};

PPRadioButtonGroup.PropTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    defaultSelected: PropTypes.string,
    lablePosition: PropTypes.oneOf(['left', 'right']), 
    name: PropTypes.string,
    onChange: PropTypes.func,
    style: PropTypes.object,
    valueSelected: PropTypes.string
    
    
};

export default PPRadioButtonGroup;