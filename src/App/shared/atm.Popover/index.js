import React, { PropTypes } from 'react';
import Popover from 'material-ui/Popover';

const PPPopover = (props) => {
    return(
        <Popover {...props} />
    );
};

PPPopover.PropTypes = {
    anchorEL: PropTypes.object,
    anchorOrigin: PropTypes.origin,
    animated: PropTypes.bool,
    animation: PropTypes.func,
    autoCloseWhenOffScreen: PropTypes.bool,
    canAutoPosition: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    onRequestClose: PropTypes.func,
    open: PropTypes.bool,
    style: PropTypes.object,
    targetOrigin: PropTypes.originL,
    useLayerForClickAway: PropTypes.bool,
    zDepth: PropTypes.zDepth
    
    
    
};

export default PPPopover;