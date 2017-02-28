import React, { PropTypes } from 'react';
import SvgtIcon from 'material-ui/SvgIcon';

const PPSvgIcon = (props) => {
    return(
        <SvgIcon {...props} />
    );
};

PPSvgIcon.PropTypes = {
    color: PropTypes.string,
    hoverColor: PropTypes.string,
    style: PropTypes.object,
    viewBox: PropTypes.string,
    children: PropTypes.node
    
};

export default PPSvgIcon;