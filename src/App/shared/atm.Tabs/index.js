import React, { PropTypes, Component } from 'react';
import Tabs from 'material-ui/Tabs';

const PPTabs = (props) => {
    
    return(
        <Tabs {...props} />
    );
};


PPTabs.PropTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    contentContainerClassName: PropTypes.string,
    contentContainerStyle: PropTypes.object,
    initialSelectedIndex: PropTypes.number, 
    InkBarStyle: PropTypes.object,
    onChange: PropTypes.func,
    style: PropTypes.object,
    tabItemContainerStyle: PropTypes.object,
    tabTemplate: PropTypes.func,
    tabTemplateStyle: PropTypes.onject,
    value: PropTypes.any,
    buttonStyle: PropTypes.object,
    className: PropTypes.string, 
    icon: PropTypes.node,
    label: PropTypes.node,
    onActive: PropTypes.func,
    style: PropTypes.object,
    value: PropTypes.any
    
};

export default PPTabs;