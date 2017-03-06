import React, { PropTypes } from 'react';
import RadioButton from 'material-ui/RadioButton';

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};

const PPRadioButton = (props) => {
  const styles = require('./styles.scss');
    return(
        <RadioButton className={styles.radioStyles} {...props} />
    );
};

PPRadioButton.PropTypes = {
    checkIcon: PropTypes.element,
    disabled: PropTypes.bool,
    iconStyle: PropTypes.object,
    inputStyle: PropTypes.object,
    style: PropTypes.object,
    uncheckedIcon: PropTypes.element, 
    value: PropTypes.any
    
};

export default PPRadioButton;