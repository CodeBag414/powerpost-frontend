import React from 'react';
import PPDialog from 'elements/atm.Dialog';
import Wrapper from './Wrapper';
import TextField from 'elements/atm.TextField';
import Button from 'elements/atm.Button';

const LinkDialog = (props) => {
  
  return(
    <PPDialog
      active={props.linkDialog}
      title='Insert Link URL'
      onEscKeyDown={props.closeAllDialog}
      onOverlayClick={props.closeAllDialog}
      actions={props.actions}
    >
      <Wrapper>
        <TextField floatingLabelText='Destination URL' type='url' value={props.urlValue} errorText={props.errorText} onChange={props.handleAddLinkValue} />
        <Button primary label='Add Link' onClick={props.handleSubmit} />
      </Wrapper>
    </PPDialog>  
  );
};

export default LinkDialog;