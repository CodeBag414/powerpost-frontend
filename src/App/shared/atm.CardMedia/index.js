import React, { PropTypes, Component } from 'react';
import {CardMedia} from 'material-ui/card';

const PPCardMedia= (props) => {
    const { style } = props;
    const additionalStyles = {
        marginTop: '0'
    };
    return(
        <CardMedia {...props } style={{ ...style, ...additionalStyles }}/>
    );
};

PPCardMedia.PropTypes = {
    actAsExpander: PropTypes.bool,
    children: PropTypes.node,
    expandable: PropTypes.bool,
    mediaStyle: PropTypes.object,
    overlay: PropTypes.node,
    overlayContainerStyle: PropTypes.object,
    overlayContentStyle: PropTypes.object,
    oveerlayStyle: PropTypes.object,
    style: PropTypes.object
    
};

export default PPCardMedia;