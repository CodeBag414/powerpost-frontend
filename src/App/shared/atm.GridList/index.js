import React, { PropTypes } from 'react';
import GridList from 'material-ui/GridList';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto',
  },
};

const PPGridList = (props) => {
    return(
        <GridList {...props} />
    );
};

PPGridList.PropTypes = {
    callHeight: PropTypes.union,
    children: PropTypes.node,
    cols: PropTypes.number,
    padding: PropTypes.number,
    style: PropTypes.object
    
};

export default PPGridList;