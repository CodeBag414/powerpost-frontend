import React, { PropTypes } from 'react';
import CheckBox from 'material-ui/Checkbox';

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};

const PPCheckbox = (props) => {
    return(
        <Checkbox {...props} />
    );
};

PPCheckbox.PropTypes = {
    checked: PropTypes.bool,
    checkedIcon: PropTypes.element,
    defaultChekced: PropTypes.bool,
    disabled: PropTypes.bool,
    IconStyle: PropTypes.object,
    InputSytle: PropTypes.object,
    labelPosition: PropTypes.oneOf(['left', 'right']), 
    labelStyle: PropTypes.object,
    onCheck: PropTypes.func
};

export default PPCheckbox;