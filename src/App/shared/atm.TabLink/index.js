import {Link} from 'react-router';
import React from 'react';


const TabLink = (props) => {
    const styles = require('./styles.scss');
    return(
        <Link to={ props.to } activeClassName={ styles.active } className={ styles.tabLinkStyle }>{props.label}</Link>  
    );
};

export default TabLink;