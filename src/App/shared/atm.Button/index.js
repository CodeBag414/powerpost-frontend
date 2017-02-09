import React, { PropTypes, Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const PPRaisedButton= (props) => {
    
    return(
        <RaisedButton {...props} style={{marginRight: '10px'}}/>
    );
};


PPRaisedButton.PropTypes = {
    backgroundColor: PropTypes.string,	//Override the default background color for the button, but not the default disabled background color (use disabledBackgroundColor for this).
    buttonStyle: PropTypes.object, //Override the inline-styles of the button element.
    children: PropTypes.node, //The content of the button. If a label is provided via the label prop, the text within the label will be displayed in addition to the content provided here.
    className: PropTypes.string, //The CSS class name of the root element.
    disabled: PropTypes.bool, //false	If true, the button will be disabled.
    disabledBackgroundColor: PropTypes.string, //Override the default background color for the button when it is disabled.
    disabledLabelColor: PropTypes.string, //The color of the button's label when the button is disabled.
    fullWidth: PropTypes.bool, //false	If true, the button will take up the full width of its container.
    href: PropTypes.string,	//The URL to link to when the button is clicked.
    icon: PropTypes.node, //An icon to be displayed within the button.
    label: PropTypes.validateLabel, //The label to be displayed within the button. If content is provided via the children prop, that content will be displayed in addition to the label provided here.
    labelColor: PropTypes.string, //The color of the button's label.
    labelPosition: PropTypes.oneOf(['before', 'after']), //The position of the button's label relative to the button's children.
    labelStyle: PropTypes.object, //Override the inline-styles of the button's label element.
    overlayStyle: PropTypes.object,	//Override the inline style of the button overlay.
    primary: PropTypes.bool,	//false	If true, the button will use the theme's primary color.
    rippleStyle: PropTypes.object, //Override the inline style of the ripple element.
    secondary: PropTypes.bool,	//false	If true, the button will use the theme's secondary color. If both secondary and primary are true, the button will use the theme's primary color.
    style: PropTypes.object //Override the inline-styles of the root element.
};

export default PPRaisedButton;