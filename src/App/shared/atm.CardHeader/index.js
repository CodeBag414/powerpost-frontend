import React, { PropTypes, Component } from 'react';
import CardHeader from 'material-ui/card';

const PPCardHeader= (props) => {
    const { style } = props;
    const additionalStyles = {
        marginTop: '0'
    };
    return(
        <CardHeader {...props } style={{ ...style, ...additionalStyles }}/>
    );
};

PPCardHeader.PropTypes = {
    actAsExpander: PropTypes.bool,
    avatar: PropTypes.node,
    children: PropTypes.node,
    closeIcon: PropTypes.noes,
    expandable: PropTypes.bool,
    openIcon: PropTypes.node,
    showExpandableButton: PropTypes.bool,
    style: PropTypes.object,
    subtitle: PropTypes.Node,
    subTitleColor: PropTypes.string,
    subTitleStyle: PropTypes.object,
    textStyle: PropTypes.object,
    title: PropTypes.node,
    titleColor: PropTypes.string,
    titleStyle: PropTypes.object
    
};

export default PPCardHeader;