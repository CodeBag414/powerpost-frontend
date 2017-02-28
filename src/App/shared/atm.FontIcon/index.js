import React, { PropTypes } from 'react';
import FontIcon from 'material-ui/FontIcon';

const PPFontIcon = (props) => {
    return(
        <FontIcon {...props} />
    );
};

PPFontIcon.PropTypes = {
    color: PropTypes.string,
    hoverColor: PropTypes.string,
    style: PropTypes.object
    
};

export default PPFontIcon;