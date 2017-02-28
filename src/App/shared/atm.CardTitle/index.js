import React, { PropTypes, Component } from 'react';
import CardTitle from 'material-ui/card';

const PPCardTitle= (props) => {
    const { style } = props;
    const additionalStyles = {
        marginTop: '0'
    };
    return(
        <CardTitle {...props } style={{ ...style, ...additionalStyles }}/>
    );
};

PPCardTitle.PropTypes = {
    actAsExpander: PropTypes.bool,
    children: PropTypes.node,
    expandable: PropTypes.bool,
    showExpandableButton: PropTypes.bool,
    style: PropTypes.object,
    subtitle: PropTypes.node,
    subTitleColor: PropTypes.string,
    subTitleStyle: PropTypes.object,
    title: PropTypes.node,
    titleColor: PropTypes.string,
    titleStyle: PropTypes.object
};

export default PPCardTitle;