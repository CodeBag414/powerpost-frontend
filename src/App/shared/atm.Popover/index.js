import React, { PropTypes } from 'react';
import Popover from 'material-ui/Popover';

const PPPopover = (props) => {
    return(
        <Popover {...props} />
    );
};

PPPopover.PropTypes = {
    anchorEl: PropTypes.object,	//	This is the DOM element that will be used to set the position of the popover.
    anchorOrigin: PropTypes.origin,	//	{ vertical: 'bottom', horizontal: 'left',}	This is the point on the anchor where the popover's targetOrigin will attach to. Options: vertical: [top, center, bottom] horizontal: [left, middle, right].
    animated: PropTypes.bool,	//	true	If true, the popover will apply transitions when it is added to the DOM.
    animation: PropTypes.function,	//		Override the default animation component used.
    autoCloseWhenOffScreen:	PropTypes.bool,	//	true	If true, the popover will hide when the anchor is scrolled off the screen.
    canAutoPosition: PropTypes.bool,	//	true	If true, the popover (potentially) ignores targetOrigin and anchorOrigin to make itself fit on screen, which is useful for mobile devices.
    children: PropTypes.node,	//		The content of the popover.
    className: PropTypes.string,	//		The CSS class name of the root element.
    onRequestClose:	PropTypes.function,	//	() => {}	Callback function fired when the popover is requested to be closed.
    open: PropTypes.bool,	//	false	If true, the popover is visible.
    style: PropTypes.object,	//	{ overflowY: 'auto',}	Override the inline-styles of the root element.
    targetOrigin: PropTypes.origin,	//	{ vertical: 'top', horizontal: 'left',}	This is the point on the popover which will attach to the anchor's origin. Options: vertical: [top, center, bottom] horizontal: [left, middle, right].
    useLayerForClickAway: PropTypes.bool,	//	true	If true, the popover will render on top of an invisible layer, which will prevent clicks to the underlying elements, and trigger an onRequestClose('clickAway') call.
    zDepth:	PropTypes.zDepth,	//	1	The zDepth of the popover.  
};

export default PPPopover;