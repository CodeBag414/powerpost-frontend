import React, { PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';

  
const PPDrawer = (props) => {
    return(
        <Drawer {...props} />
    );
};

PPDrawer.PropTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    containerClassName: PropTypes.string,
    containerStyle: PropTypes.object,
    disableSwipeToOpen: PropTypes.bool,
    docked: PropTypes.bool,
    onRequestChange: PropTypes.func,
    open: PropTypes.bool,
    openSecondary: PropTypes.bool,
    overlayClassName: PropTypes.string,
    overlayStyle: PropTypes.object,
    style: PropTypes.object,
    swipeAreaWidth: PropTypes.number,
    width: PropTypes.number,
    zDepth: PropTypes.zDepth
};

export default PPDrawer;