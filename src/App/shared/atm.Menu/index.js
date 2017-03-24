import React, { PropTypes } from 'react';
import { Menu } from 'react-toolbox/lib/menu';
import theme from './styles.scss';

const PPMenu= (props) => {
    const { isSidebar, ...rest } = props;
    let sidebarTheme = '';
    
    if(isSidebar) {
        sidebarTheme = require('./sidebarStyles.scss');
    }
    
    return(
        <Menu {...props } theme={ isSidebar ? sidebarTheme : theme } />
    );
};

export default PPMenu;