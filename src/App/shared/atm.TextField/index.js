import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';

const PPTextField = (props) => {
    
    const elementStyle = {
        marginRight: '20px',
        verticalAlign: 'top'
    };
    
    const floatingLabelFocusStyle = {
        color: '#a452f3'
    };

    const underlineFocusStyle = {
        borderColor: '#a452f3'
    };
    
    return(
        <TextField {...props} style={ elementStyle } floatingLabelFocusStyle={ floatingLabelFocusStyle } underlineFocusStyle={ underlineFocusStyle } />
    );
};

PPTextField.PropTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
    errorStyle: PropTypes.object,
    errorText: PropTypes.node,
    floatingLabelFixed: PropTypes.bool,
    floatingLabelFocusStyle: PropTypes.object,
    floatingLabelShrinkStyle: PropTypes.object,
    floatingLabelStyle: PropTypes.object,
    floatingLabelText: PropTypes.node,
    fullWidth: PropTypes.node,
    hintStyle: PropTypes.bool,
    hintText: PropTypes.node,
    id: PropTypes.string,
    inputStyle: PropTypes.object,
    multiLine: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    rows: PropTypes.number,
    rowsMax: PropTypes.number,
    style: PropTypes.object,
    textareaStyle: PropTypes.object,
    type: PropTypes.string,
    underlineDisabledStyle: PropTypes.object,
    underlineFocusStyle: PropTypes.object,
    underlineShow: PropTypes.bool,
    underlineStyle: PropTypes.object,
    value: PropTypes.any,
};

export default PPTextField;