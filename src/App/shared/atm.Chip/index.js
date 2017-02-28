import React, { PropTypes, Component } from 'react';
import Chip from 'material-ui/Chip';

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

const PPChip= (props) => {
    
    return(
        <Chip {...props}/>
    );
};


PPChip.PropTypes = {
    backgroundColor: PropTypes.string,	
    children: PropTypes.node, 
    className: PropTypes.node, 
    labelColor: PropTypes.string,
    labelStyle: PropTypes.object,
    onRequestDelete: PropTypes.Func,
    onTouchTap: PropTypes.Func,
    style: PropTypes.object
};

export default PPChip;