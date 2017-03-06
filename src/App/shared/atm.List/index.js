import React, { PropTypes } from 'react';
import List from 'material-ui/List';

const PPList = (props) => {
    return(
        <List {...props} />
    );
};

PPList.PropTypes = {
    color: PropTypes.string,
    children: PropTypes.node
    
};

export default PPList;