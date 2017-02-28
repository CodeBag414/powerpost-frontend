import React, { PropTypes, Component } from 'react';
import Card from 'material-ui/card';

const PPCard= (props) => {
    const { style } = props;
    const additionalStyles = {
        marginTop: '0'
    };
    return(
        <Card {...props } style={{ ...style, ...additionalStyles }}/>
    );
};

PPCard.PropTypes = {
    children: PropTypes.node,
    containerStyle: PropTypes.object,
    expandable: PropTypes.bool,
    expanded: PropTypes.bool,
    initiallyExpanded: PropTypes.bool,
    onExpandChange: PropTypes.func,
    showExpandedButton: PropTypes.bool,
    style: PropTypes.object,
    
};

export default PPCard;