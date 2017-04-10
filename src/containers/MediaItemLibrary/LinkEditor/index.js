import React from 'react';
import Wrapper from './Wrapper';
import PPDialog from 'elements/atm.Dialog';

const LinkEditor = (props) => {
  
  return(
    <PPDialog
      active={props.linkEditorDialog}
      title='Link Editor'
      onEscKeyDown={props.closeAllDialog}
      onOverlayClick={props.closeAllDialog}
      actions={props.actions}
    >
      <Wrapper>

      </Wrapper>
    </PPDialog>    
  );
};

export default LinkEditor;