import React, { PropTypes } from 'react';

import MediaNavContainer from './MediaNavContainer';

import ButtonMenu from 'elements/mol.ButtonMenu';
import MenuItem from 'elements/atm.MenuItem';
import TextField from 'elements/atm.TextField';
import PPSelectField from 'elements/atm.SelectField';

import styles from './styles.scss';

const MediaNav = (props) => (
  <MediaNavContainer>
    <ButtonMenu label="Add New Item">
      <MenuItem caption="Add File" onClick={props.openAddFile} />
      <MenuItem caption="Add RSS Feed" onClick={props.openAddRSS} />
      <MenuItem caption="Add Blog" onClick={props.openAddBlog} />
      <MenuItem caption="Add Link" onClick={props.openAddLink} />
    </ButtonMenu>
    <TextField iconClass="fa fa-search" hintText="Search Title" />
    <PPSelectField floatingLabelText="Filter by">
      <MenuItem caption="PNG" />
    </PPSelectField>
    <PPSelectField floatingLabelText="Date Added">
      <MenuItem caption="PNG" />
    </PPSelectField>
  </MediaNavContainer>
);

MediaNav.propTypes = {
  openAddFile: PropTypes.func,
  openAddRSS: PropTypes.func,
  openAddBlog: PropTypes.func,
  openAddLink: PropTypes.func,
};

export default MediaNav;
