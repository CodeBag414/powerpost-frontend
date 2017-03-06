import React, { PropTypes } from 'react';
import IconMenu from 'material-ui/IconMenu';

const PPIconMenu = (props) => {
    return(
        <IconMenu {...props} />
    );
};

PPIconMenu.PropTypes = {
    anchorOrigin: PropTypes.origin,
    animated: PropTypes.bool,
    animation: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
    IconButtonElement: PropTypes.element,
    IconStyle: PropTypes.object,
    listStyle: PropTypes.object,
    menuStyle: PropTypes.object,
    multiple: PropTypes.bool,
    onItemTouchTap: PropTypes.func,
    onKeyboardFocus: PropTypes.func,
    onRequestChange: PropTypes.func,
    onTouchTap: PropTypes.func,
    open: PropTypes.bool,
    style: PropTypes.object,
    targetOrigin: PropTypes.origin,
    touchTapCloseDelay: PropTypes.number,
    useLayerForClickAway: PropTypes.bool
    
    
};

export default PPIconMenu;