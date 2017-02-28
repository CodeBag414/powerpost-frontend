import React, { PropTypes } from 'react';
import Toggle from 'material-ui/Toggle';

const styles = {
  block: {
    maxWidth: 250,
  },
  toggle: {
    marginBottom: 16,
  },
  thumbOff: {
    backgroundColor: '#ffcccc',
  },
  trackOff: {
    backgroundColor: '#ff9d9d',
  },
  thumbSwitched: {
    backgroundColor: 'red',
  },
  trackSwitched: {
    backgroundColor: '#ff9d9d',
  },
  labelStyle: {
    color: 'red',
  },
};

const PPToggle = (props) => {
    return(
        <Toggle {...props} />
    );
};

PPToggle.PropTypes = {
    defualtToggled: PropTypes.bool,
    disabled: PropTypes.bool,
    elementStyle: PropTypes.object,
    iconStyle: PropTypes.object,
    inputStyle:PropTypes.object,
    label: PropTypes.node,
    labelPosition: PropTypes.oneOf(['left', 'right']), 
    lableStyle: PropTypes.object,
    onToggle: PropTypes.func

};

export default PPToggle;