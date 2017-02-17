import React, { PropTypes } from 'react';
import Divider from 'material-ui/Divider';

const PPMenuDivider = (props) => {
    return(
        <Divider {...props} />
    );
};

PPMenuDivider.PropTypes = {
    inset: PropTypes.bool,
    style: PropTypes.object,
};

export default PPMenuDivider;