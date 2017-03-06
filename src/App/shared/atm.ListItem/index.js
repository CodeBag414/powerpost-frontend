import React, { PropTypes } from 'react';
import ListItem from 'material-ui/ListItem';

const PPListItem = (props) => {
    return(
        <ListItem {...props} />
    );
};

PPListItem.PropTypes = {
    autoGenerateNestedIndicator: PropTypes.bool,
    children: PropTypes.node,
    disabledKeyboardFocus: PropTypes.bool,
    disabled: PropTypes.bool,
    hoverColor: PropTypes.string, 
    InitiallyOpen: PropTypes.bool,
    InnerDevStyle: PropTypes.object,
    InsetChildren: PropTypes.bool,
    leftAvatar: PropTypes.element,
    leftCheckbox: PropTypes.element,
    leftIcon: PropTypes.element,
    nestedItems: PropTypes.arrayOf,
    nestedLevel: PropTypes.number,
    nestedListStyle: PropTypes.object,
    onKeyboardFocus: PropTypes.func,
    onNestedListToggle: PropTypes.func,
    open: PropTypes.bool,
    primaryText: PropTypes.node,
    primaryTogglesNestedList: PropTypes.bool,
    rightAvatar: PropTypes.element,
    rightIcon: PropTypes.element,
    rightIconButton: PropTypes.element,
    rightToggle: PropTypes.element,
    secondaryText: PropTypes.node,
    secondaryTextLines: PropTypes.oneOf(['1','2']), 
    style: PropTypes.onject
    
};

export default PPListItem;