import React, { PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';

const PPSelectField = (props) => {
    return(
        <SelectField {...props} />
    );
};

PPSelectField.PropTypes = {
    autoWidth: PropTypes.bool,
    children: PropTypes.node,
    disabled: PropTypes.bool,
    errorStyle: PropTypes.object,
    errorText: PropTypes.node,
    floatingLabelFixed: PropTypes.bool,
    floatingLabelStyle: PropTypes.object,
    floatingLabelText: PropTypes.node,
    fullWidth: PropTypes.bool,
    hintStyle: PropTypes.object,
    hintText: PropTypes.object,
    IconStyle: PropTypes.object,
    id: PropTypes.string,
    labelStyle: PropTypes.object,
    listStyle: PropTypes.object,
    maxHeight: PropTypes.number,
    menuItemStyle: PropTypes.object,
    menuStyle: PropTypes.object,
    onChange: PropTypes.func,
    selectedMenuItemStyle: PropTypes.object,
    style: PropTypes.object,
    underlineFocusStyle: PropTypes.object,
    underlineStyle: PropTypes.object,
    value: PropTypes.any
    
    
};

export default PPSelectField;