import React, { PropTypes } from 'react';
import {MenuItem} from 'react-toolbox/lib/menu';
import theme from './styles.scss';

const PPMenuItem = (props) => {
    const { isSidebar, ...rest } = props;
    let sidebarTheme = '';
    
    if(isSidebar) {
        sidebarTheme = require('./sidebarStyles.scss');
    }
    return(
        <MenuItem {...rest} theme={ isSidebar ? sidebarTheme : theme } />
    );
};

export default PPMenuItem;