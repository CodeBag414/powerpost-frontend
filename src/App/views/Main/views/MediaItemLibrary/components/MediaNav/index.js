import React from 'react';
import Button from 'App/shared/atm.Button';
import TextField from 'App/shared/atm.TestTextField';
import ButtonMenu from 'App/shared/mol.ButtonMenu';
import MenuItem from 'App/shared/atm.MenuItem';

const MediaNav = (props) => {
    const styles = require('./styles.scss');
    
    return(
        <div className={ styles.mediaNavContainer }>
            <ButtonMenu label="Add Media">
                <MenuItem caption="Add File" onClick={props.openAddFile} />
                <MenuItem caption="Add RSS Feed" onClick={props.openAddRSS} />
                <MenuItem caption="Add Blog" onClick={props.openAddBlog} />
                <MenuItem caption="Add Link" onClick={props.openAddLink} />
            </ButtonMenu>
        </div>
    );
};

export default MediaNav;