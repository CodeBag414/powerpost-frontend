import React, { PropTypes } from 'react';
import MenuItem from 'material-ui/MenuItem';

const PPMenuItem = (props) => {
    return(
        <MenuItem {...props} />
    );
};

PPMenuItem.PropTypes = {
    animation:	PropTypes.func, //		Override the default animation component used.
    checked: PropTypes.bool, //	false	If true, a left check mark will be rendered.
    children: PropTypes.node, //	Elements passed as children to the underlying ListItem.
    disabled: PropTypes.bool, //	false	If true, the menu item will be disabled.
    focusState:	PropTypes.oneOf(['none', 'focused', 'keyboard-focused', 'none']),//	The focus state of the menu item. This prop is used to set the focus state of the underlying ListItem.
    innerDivStyle: PropTypes.object, //	Override the inline-styles of the inner div.
    insetChildren: PropTypes.bool, //		false	If true, the children will be indented. This is only needed when there is no leftIcon.
    leftIcon: PropTypes.element, //		The SvgIcon or FontIcon to be displayed on the left side.
    menuItems: PropTypes.node, //			MenuItem elements to nest within the menu item.
    onTouchTap: PropTypes.func, //			Callback function fired when the menu item is touch-tapped.
    primaryText: PropTypes.node, //		Can be used to render primary text within the menu item.
    rightIcon: PropTypes.element, //			The SvgIcon or FontIcon to be displayed on the right side.
    secondaryText: PropTypes.node, //			Can be used to render secondary text within the menu item.
    style: PropTypes.object, //			Override the inline-styles of the root element.
    value: PropTypes.any, //			The value of the menu item.
};

export default PPMenuItem;