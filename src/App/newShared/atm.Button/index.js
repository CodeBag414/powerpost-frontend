import React from 'react';
import {Button} from 'react-toolbox/lib/button';
import theme from './styles.scss';

const PPButton = (props) => {
    return(
        <Button {...props} theme={ theme }/>
    );
};

export default PPButton;
