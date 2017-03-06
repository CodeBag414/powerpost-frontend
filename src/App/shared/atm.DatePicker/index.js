import React, { PropTypes, Component } from 'react';
import DatePicker from 'material-ui/DatePIcker';

const PPDatePicker= (props) => {
    
    return(
        <DatePicker {...props} style={{marginRight: '20px'}}/>
    );
};


PPDatePicker.PropTypes = {
    DateTimeFormat: PropTypes.func,
    autoOk: PropTypes.bool,
    cancelLabel: PropTypes.node,
    className: PropTypes.string,
    container: PropTypes.oneOf(['dialog', 'inline']), 
    defaultDate: PropTypes.object,
    dialogContainerStyle: PropTypes.object,
    disableYearSelection: PropTypes.bool,
    disabled: PropTypes.bool,
    firstDayOfWeek: PropTypes.number,
    formatDate: PropTypes.func,
    locale: PropTypes.string,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    mode: PropTypes.oneOf(['portrait', 'landscape']), 
    okLabel: PropTypes.node,
    onChange: PropTypes.func,
    onDismiss: PropTypes.func,
    onFocus: PropTypes.func,
    onShow: PropTypes.func,
    onTouchTap: PropTypes.func,
    shouldDisableDate: PropTypes.func,
    style: PropTypes.object,
    textFieldStyle: PropTypes.object,
    value: PropTypes.object
    
    
};

export default PPDatePicker;