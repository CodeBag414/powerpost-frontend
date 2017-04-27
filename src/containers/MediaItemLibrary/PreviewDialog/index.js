import React from 'react';
import PPDialog from 'elements/atm.Dialog';
import Wrapper from './Wrapper';
import Button from 'elements/atm.Button';
import Preview from 'components/Preview';

const LinkDialog = (props) => {
  
  return(
    <PPDialog
      active={props.previewDialog}
      title='Preview'
      onEscKeyDown={props.closeAllDialog}
      onOverlayClick={props.closeAllDialog}
      actions={props.actions}
    >
      <Wrapper>
        <Preview item={props.mediaItem} />
        <div style={{textAlign: 'right'}}>
          <Button label='Close preview' onClick={props.closeAllDialog} style={{margin: '5px'}} />
          <Button label='Add to Post' icon='add' primary style={{margin: '5px'}} />
        </div>
      </Wrapper>
    </PPDialog>  
  );
};

export default LinkDialog;