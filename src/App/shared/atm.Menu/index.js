import React, { PropTypes } from 'react';
import Menu from 'material-ui/Menu';

const PPMenu= (props) => {
    return(
        <Menu {...props } />
    );
};

PPMenu.PropTypes = {
    autoWidth: PropTypes.bool, //	true	If true, the width of the menu will be set automatically according to the widths of its children, using proper keyline increments (64px for desktop, 56px otherwise).
    children: PropTypes.node, //		The content of the menu. This is usually used to pass MenuItem elements.
    desktop: PropTypes.bool, //	false	If true, the menu item will render with compact desktop styles.
    disableAutoFocus: PropTypes.bool, //	false	If true, the menu will not be auto-focused.
    initiallyKeyboardFocused: PropTypes.bool, //	false	If true, the menu will be keyboard-focused initially.
    listStyle: PropTypes.object, //		Override the inline-styles of the underlying List element.
    maxHeight: PropTypes.number, //	null	The maximum height of the menu in pixels. If specified, the menu will be scrollable if it is taller than the provided height.
    menuItemStyle:	PropTypes.object, //		Override the inline-styles of menu items.
    multiple: PropTypes.bool, //	false	If true, value must be an array and the menu will support multiple selections.
    onChange: PropTypes.func, //	() => {}	Callback function fired when a menu item with value not equal to the current value of the menu is touch-tapped.
    onItemTouchTap:	PropTypes.function, //	() => {}	Callback function fired when a menu item is touch-tapped.
    onMenuItemFocusChange:	PropTypes.func, //		Callback function fired when the focus on a MenuItem is changed. There will be some "duplicate" changes reported if two different focusing event happen, for example if a MenuItem is focused via the keyboard and then it is clicked on.
    selectedMenuItemStyle:	PropTypes.object, //		Override the inline-styles of selected menu items.
    style:	PropTypes.object, //		Override the inline-styles of the root element.
    value:	PropTypes.any, //	If multiple is true, an array of the values of the selected menu items. Otherwise, the value of the selected menu item. If provided, the menu will be a controlled component. This component also supports valueLink.
    valueLink:	PropTypes.object, //		ValueLink for the menu's value.
    width:	PropTypes.number, //		The width of the menu. If not specified, the menu's width will be set according to the widths of its children, using proper keyline increments (64px for desktop, 56px otherwise).
};

export default PPMenu;