import React from 'react';
import Dialog from 'react-toolbox/lib/dialog';

import theme from './styles.scss';
import contentTheme from './contentStyles.scss';

const PPFullScreenDialog = (props) => {
  const { isContent, ...rest } = props;
  let newTheme = theme;
  if (isContent) {
    newTheme = contentTheme;
  }
  return (
    <Dialog {...rest} theme={newTheme} />
  );
};

export default PPFullScreenDialog;
