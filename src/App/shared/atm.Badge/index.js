import React, { PropTypes, Component } from 'react';
import Badge from 'material-ui/Badge';

const PPBadge= (props) => {
    const { style } = props;
    const additionalStyles = {
        marginTop: '0'
    };
    return(
        <Badge {...props } style={{ ...style, ...additionalStyles }}/>
    );
};

PPBadge.PropTypes = {
    badgeContent: PropTypes.node,
    badgeStyle: PropTypes.object, 
    badgeStyle: PropTypes.object,
    children: PropTypes.node, 
    className: PropTypes.string,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    style: PropTypes.object
};

export default PPBadge;