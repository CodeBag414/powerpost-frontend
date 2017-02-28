import React, { PropTypes, Component } from 'react';
import {CardActions} from 'material-ui/card';

const PPCardActions= (props) => {
    const { style } = props;
    const additionalStyles = {
        marginTop: '0'
    };
    return(
        <CardActions {...props } style={{ ...style, ...additionalStyles }}/>
    );
};

PPCardActions.PropTypes = {
    actAsExpander: PropTypes.bool,
    children: PropTypes.node,
    expandable: PropTypes.bool,
    showExpandableButton: PropTypes.bool,
    style: PropTypes.object
};

export default PPCardActions;