import React, { PropTypes } from 'react';
import DropDownMenu from 'material-ui/Drop';

const PPDropDownMenu = (props) => {
    return(
        <DropDownMenu {...props} />
    );
};

PPDropDownMenu.PropTypes = {
    animated: PropTypes.bool,
    animation: PropTypes.func,
    autoWidth: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    iconButton: PropTypes.node,
    iconStyle: PropTypes.object,
    labelStyle: PropTypes.object,
    listStyle: PropTypes.object,
    maxHeight: PropTypes.number,
    menuItemStyle: PropTypes.object,
    menuStyle: PropTypes.object,
    onChange: PropTypes.func,
    onClose: PropTypes.func,
    openImmediately: PropTypes.bool,
    selectedMenuItemStyle: PropTypes.object,
    style: PropTypes.object,
    underlineStyle: PropTypes.object,
    value: PropTypes.any,
    
    
};

export default PPDropDownMenu;