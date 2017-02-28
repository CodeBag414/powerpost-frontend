import React, { PropTypes, Component } from 'react';
import {CardText} from 'material-ui/card';

const PPCardText= (props) => {
    const { style } = props;
    const additionalStyles = {
        marginTop: '0'
    };
    return(
        <CardText {...props } style={{ ...style, ...additionalStyles }}/>
    );
};

PPCardText.PropTypes = {
    actAsExpander: PropTypes.bool,
    children: PropTypes.node,
    color: PropTypes.string,
    expandable: PropTypes.bool,
    style: PropTypes.object
    
};

export default PPCardText;