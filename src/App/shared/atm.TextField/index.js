import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';

const PPTextField = (props) => {
    const styles = require('./styles.scss');
    return(
        <TextField {...props} className={ styles.inputStyle } floatingLabelStyle={{ color: 'black' }} floatingLabelFixed={ true } underlineShow={ false } hintStyle={{padding: '5px', bottom: '3px' }} inputStyle={{ padding: '5px', marginTop: '35px', height: '34px' }} />
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