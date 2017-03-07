import React, { PropTypes } from 'react';
import Toggle from 'material-ui/Toggle';


const PPToggle = (props) => {
  const styles = require('./styles.scss');
    return(
        <Toggle className={styles.toggleStyles} {...props} />
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