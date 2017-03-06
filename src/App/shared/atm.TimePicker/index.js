import React, { PropTypes, Component } from 'react';
import TimePicker from 'material-ui/TimePicker';

const PPTimePicker = (props) => {
    
    return(
        <TimePicker {...props} />
    );
};


PPTimePicker.PropTypes = {
    autoOk: PropTypes.bool,
    cancelLabel: PropTypes.node,
    defaultTime: PropTypes.Oobject,
    dialogBodyStyle: PropTypes.object,
    dialogStyle: PropTypes.object,
    disabled: PropTypes.bool,
    format: PropTypes.oneOf(['ampm', '24hr']), 
    okLabel: PropTypes.node,
    onChange: PropTypes.func,
    onDismiss: PropTypes.func,
    onFocus: PropTypes.func,
    onShow: PropTypes.func,
    onTouchTap: PropTypes.func,
    pedantic: PropTypes.bool,
    style: PropTypes.object,
    textFieldStyle: PropTypes.object,
    value: PropTypes.object
    
};

export default PPTimePicker;