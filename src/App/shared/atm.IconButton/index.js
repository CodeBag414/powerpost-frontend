import React, { PropTypes, Component } from 'react';
import IconButton from 'material-ui/IconButton';

const PPIconButton= (props) => {
    const { style } = props;
    const additionalStyles = {
        marginTop: '0'
    };
    return(
        <IconButton {...props } style={{ ...style, ...additionalStyles }} iconStyle={{ fontSize: '20px' }}/>
    );
};

PPIconButton.PropTypes = {
    children: PropTypes.node, //Can be used to pass a FontIcon element as the icon for the button.
    className: PropTypes.string, //The CSS class name of the root element.
    disableTouchRipple: PropTypes.bool, //false	If true, the element's ripple effect will be disabled.
    disabled: PropTypes.bool, //false	If true, the element will be disabled.
    hoveredStyle: PropTypes.object, //Override the inline-styles of the root element when the component is hovered.
    href: PropTypes.string, //The URL to link to when the button is clicked.
    iconClassName: PropTypes.string, //The CSS class name of the icon. Used for setting the icon with a stylesheet.
    iconStyle: PropTypes.object, //{}	Override the inline-styles of the icon element. Note: you can specify iconHoverColor as a String inside this object.
    onKeyboardFocus: PropTypes.func, //Callback function fired when the element is focused or blurred by the keyboard.
    style: PropTypes.object, //Override the inline-styles of the root element.
    tooltip: PropTypes.node, //The text to supply to the element's tooltip.
    tooltipPosition: PropTypes.cornersAndCenter, //'bottom-center'	The vertical and horizontal positions, respectively, of the element's tooltip. Possible values are: "bottom-center", "top-center", "bottom-right", "top-right", "bottom-left", and "top-left".
    tooltipStyles: PropTypes.object, //Override the inline-styles of the tooltip element.
    touch: PropTypes.bool, //false	If true, increase the tooltip element's size. Useful for increasing tooltip readability on mobile devices.
};

export default PPIconButton;