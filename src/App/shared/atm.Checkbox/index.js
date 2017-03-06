import React, { PropTypes } from 'react';
import Checkbox from 'material-ui/Checkbox';

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};

const PPCheckbox = (props) => {
  const styles = require('./styles.scss');
    return(
        <Checkbox className={styles.checkboxStyles} {...props} />
    );
};

PPCheckbox.PropTypes = {
    checked: PropTypes.bool,
    checkedIcon: PropTypes.element,
    defaultChekced: PropTypes.bool,
    disabled: PropTypes.bool,
    IconStyle: PropTypes.object,
    InputStyle: PropTypes.object,
    labelPosition: PropTypes.oneOf(['left', 'right']), 
    labelStyle: PropTypes.object,
    onCheck: PropTypes.func
};

export default PPCheckbox;