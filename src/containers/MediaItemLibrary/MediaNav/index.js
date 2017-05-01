import React, { PropTypes } from 'react';

import MediaNavContainer from './MediaNavContainer';

import ButtonMenu from 'elements/mol.ButtonMenu';
import MenuItem from 'elements/atm.MenuItem';
import TextField from 'elements/atm.TextField';
import Dropdown from 'elements/atm.Dropdown';
import FilterLink from '../FilterLink';

import {
  SHOW_ALL,
  SHOW_BLOGS,
  SHOW_VIDEOS,
  SHOW_LINKS,
  SHOW_IMAGES,
} from '../constants';

import styles from './styles.scss';

const MediaNav = (props) => (
  <MediaNavContainer className="row">
    <div className="col-md-2" style={{marginTop: '25px'}}>
      <ButtonMenu label="Add New Item" stye={{float: 'left'}} >
        <MenuItem caption="Add File" onClick={props.openAddFile} />
        <MenuItem caption="Add RSS Feed" onClick={props.openAddRSS} />
        <MenuItem caption="Add Blog" onClick={props.openAddBlog} />
        <MenuItem caption="Add Link" onClick={props.openAddLink} />
        <MenuItem caption="Search Web" onClick={props.openSearch} />
      </ButtonMenu>
    </div>
    <div className="col-md-3"style={{ height: '100%'}}>
      <TextField iconClass="fa fa-search" hintText="Search Title" style={{float: 'left'}} onChange={props.setSearchFilter} />
    </div>
    <div className="col-md-1"></div>
    <div className="col-md-4">
      <FilterLink filter={SHOW_ALL} active={props.filter === SHOW_ALL}>All</FilterLink>
      <FilterLink filter={SHOW_BLOGS} active={props.filter === SHOW_BLOGS}>Blogs</FilterLink>
      <FilterLink filter={SHOW_IMAGES} active={props.filter === SHOW_IMAGES}>Images</FilterLink>
      <FilterLink filter={SHOW_LINKS} active={props.filter === SHOW_LINKS}>Links</FilterLink>
      <FilterLink filter={SHOW_VIDEOS}active={props.filter === SHOW_VIDEOS}>Videos</FilterLink>
    </div>
    <div className="col-md-2">
      <Dropdown label="Date Added" style={{float: 'right'}} options={[{value: 'Now', label: 'Now'}]} />
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
