import React, { PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';

const PPSelectField = (props) => {
    return(
        <SelectField {...props} />
    );
};

PPSelectField.PropTypes = {
    autoWidth: PropTypes.bool,	//false	If true, the width will automatically be set according to the items inside the menu. To control the width in CSS instead, leave this prop set to false.
    children: PropTypes.node, //The MenuItem elements to populate the select field with. If the menu items have a label prop, that value will represent the selected menu item in the rendered select field.
    disabled: PropTypes.bool, //false	If true, the select field will be disabled.
    errorStyle: PropTypes.object, //Override the inline-styles of the error element.
    errorText: PropTypes.node, //The error content to display.
    floatingLabelFixed: PropTypes.bool, //If true, the floating label will float even when no value is selected.
    floatingLabelStyle: PropTypes.object,	//Override the inline-styles of the floating label.
    floatingLabelText: PropTypes.node, //The content of the floating label.
    fullWidth: PropTypes.bool, //false	If true, the select field will take up the full width of its container.
    hintStyle: PropTypes.object, //Override the inline-styles of the hint element.
    hintText: PropTypes.node, //The hint content to display.
    iconStyle: PropTypes.object, //Override the inline-styles of the icon element.
    id: PropTypes.string,	//The id prop for the text field.
    labelStyle: PropTypes.object,	//Override the label style when the select field is inactive.
    listStyle: PropTypes.object, //Override the inline-styles of the underlying List element.
    maxHeight: PropTypes.number,	//Override the default max-height of the underlying DropDownMenu element.
    menuItemStyle: PropTypes.object, //Override the inline-styles of menu items.
    menuStyle: PropTypes.object, //Override the inline-styles of the underlying DropDownMenu element.
    onChange: PropTypes.func, //Callback function fired when a menu item is selected.
    selectedMenuItemStyle: PropTypes.object, //Override the inline-styles of selected menu items.
    style: PropTypes.object, //Override the inline-styles of the root element.
    underlineDisabledStyle: PropTypes.object, //Override the inline-styles of the underline element when the select field is disabled.
    underlineFocusStyle: PropTypes.object, //Override the inline-styles of the underline element when the select field is focused.
    underlineStyle: PropTypes.object, //Override the inline-styles of the underline element.
    value: PropTypes.any //The value that is currently selected.
};

export default PPSelectField;
