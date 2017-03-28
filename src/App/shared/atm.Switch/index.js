import React from 'react';
import { Switch } from 'react-toolbox/lib/switch';
import theme from './styles.scss';

const PPSwitch = (props) => {
  return (
    <Switch {...props} theme={theme} />
  );
};

export default PPSwitch;
