import React, { PropTypes, Component } from 'react';
import IconButton from 'material-ui/AppBar';

const PPAppBar= (props) => {
    const { style } = props;
    const additionalStyles = {
        marginTop: '0'
    };
    return(
        <AppBar {...props } style={{ ...style, ...additionalStyles }}/>
    );
};

PPAppBar.PropTypes = {
    children: PropTypes.node,
    className: PropTypes.string, 
    IconClassNameLeft: PropTypes.string,
    IconClassNameRight: PropTypes.string, 
    iconElementLeft: PropTypes.element, 
    iconElementRight: PropTypes.element, 
    iconStyleLeft: PropTypes.object, 
    iconStylesRight: PropTypes.object,
    onLeftIconButtonTouchTap: PropTypes.func,
    onRightIconButtonTouchTap: PropTypes.func,
    onTitleTouchTap: PropTypes.func,
    showMenuIconButton: PropTypes.bool,
    style: PropTypes.object,
    title: PropTypes.node,
    titleStyle: PropTypes.object,
    xDepth: PropTypes.zDepth
};

export default PPAppBar;