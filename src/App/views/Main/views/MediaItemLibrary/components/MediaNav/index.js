import React from 'react';
import Button from 'App/newShared/atm.Button';
import TextField from 'App/shared/atm.TestTextField';

const MediaNav = (props) => {
    const styles = require('./styles.scss');
    
    return(
        <div className={ styles.mediaNavContainer }>
            <Button label="Default" onClick={ () => { console.log('clicked button'); } } primary />
            <Button label="Disabled" onClick={ () => {console.log('clicked disabled'); } } />
            <Button label="Secondary" onClick={ () => { console.log('clicked secondary'); } } raised primary />
            
            <div>
                <TextField floatingLabelText="Input Label" hintText="Your name" />
            </div>
            <div>
                <TextField floatingLabelText="Input Label with Icon" hintText="Your name" iconClass="fa fa-envelope" />
            </div>
            <div>
                <TextField floatingLabelText="Input Label - Error Message" hintText="Your name" errorText="This is a validation error" />
            </div>
        </div>
    );
};

export default MediaNav;