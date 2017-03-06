import React, { PropTypes } from 'react';
import {GridTile} from 'material-ui/GridTile';

const PPGridTile = (props) => {
    return(
        <GridList {...props} />
    );
};

PPGridTile.PropTypes = {
    actionIcon: PropTypes.element,
    actionPosition: PropTypes.oneOf(['left', 'right']), 
    children: PropTypes.node,
    cols: PropTypes.number,
    containerElement: PropTypes.union,
    rows: PropTypes.number,
    style: PropTypes.object,
    subtitle: PropTypes.node,
    title: PropTypes.node,
    titleBackground: PropTypes.string, 
    titlePosition: PropTypes.oneOf(['top', 'bottom']),
    titleStyle: PropTypes.object
};

export default PPGridTile;