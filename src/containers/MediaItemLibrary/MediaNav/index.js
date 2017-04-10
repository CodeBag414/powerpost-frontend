import React, { PropTypes } from 'react';

import MediaNavContainer from './MediaNavContainer';

import ButtonMenu from 'elements/mol.ButtonMenu';
import MenuItem from 'elements/atm.MenuItem';
import TextField from 'elements/atm.TextField';
import PPSelectField from 'elements/atm.SelectField';

import styles from './styles.scss';

const MediaNav = (props) => (
  <MediaNavContainer className="row">
    <div className="col-md-2">
      <ButtonMenu label="Add New Item" stye={{float: 'left'}} >
        <MenuItem caption="Add File" onClick={props.openAddFile} />
        <MenuItem caption="Add RSS Feed" onClick={props.openAddRSS} />
        <MenuItem caption="Add Blog" onClick={props.openAddBlog} />
        <MenuItem caption="Add Link" onClick={props.openAddLink} />
      </ButtonMenu>
    </div>
    <div className="col-md-2"style={{ height: '100%'}}>
      <TextField iconClass="fa fa-search" hintText="Search Title" style={{float: 'left'}} />
    </div>
    <div className="col-md-4"></div>
    <div className="col-md-2">
      <PPSelectField floatingLabelText="Filter by" style={{float: 'right'}} >
        <MenuItem caption="PNG" />
      </PPSelectField>
    </div>
    <div className="col-md-2">
      <PPSelectField floatingLabelText="Date Added" style={{float: 'right'}}>
        <MenuItem caption="PNG" />
      </PPSelectField>
    </div>
  </MediaNavContainer>
);

MediaNav.propTypes = {
  openAddFile: PropTypes.func,
  openAddRSS: PropTypes.func,
  openAddBlog: PropTypes.func,
  openAddLink: PropTypes.func,
};

export default MediaNav;
