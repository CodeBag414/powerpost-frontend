/*
 * User View
 */

import React, { Component } from 'react';
import PPTextField from 'App/shared/atm.TextField';
import Avatar from 'App/shared/atm.Avatar';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';
import PPRadioButton from 'App/shared/atm.RadioButton';
import PPRadioButtonGroup from 'App/shared/atm.RadioButtonGroup';
import PPRaisedButton from 'App/shared/atm.RaisedButton';
import PPFlatButton from 'App/shared/atm.FlatButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import PPCheckbox from 'App/shared/atm.Checkbox';
import {
  connect
}
from 'react-redux';
import {
  createStructuredSelector
}
from "reselect";
import {
  makeSelectUser,
  makeSelectFilePickerKey,
  makeSelectUserAvator
}
from '../../../../state/selectors';

const styles = {
  block: {
    maxWidth: 250,
  },
  toggle: {
    marginBottom: 16,
  },
  thumbOff: {
    backgroundColor: '#ffcccc',
  },
  trackOff: {
    backgroundColor: '#ff9d9d',
  },
  thumbSwitched: {
    backgroundColor: 'red',
  },
  trackSwitched: {
    backgroundColor: '#ff9d9d',
  },
  labelStyle: {
    color: 'red',
  },
};



const style1 = {
  margin: 0,
  top: 'auto',
  right: 120,
  bottom: 20,
  left: 'auto',
  position: 'fixed',
};
const style2 = {
  margin: 0,
  top: 'auto',
  right: 10,
  bottom: 20,
  left: 'auto',
  position: 'fixed',
};
const style3 = {
  margin: 0,
  top: 'auto',
  right: 10,
  bottom: 20,
  left: 'auto',
  position: 'fixed',
};
const hrule = {
  borderWidth: 1,
  borderColor: '#dadada',
};


class settingsUser extends Component {
  constructor(props) {
    super(props);

    this.openFilePicker = this.openFilePicker.bind(this);

    this.state = {
      value: 1
    };
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit(event) {
    alert('Updates were submitted: ' + this.state.value);
    event.preventDefault();
  }



  openFilePicker() {
    this.setState({
      open: false
    });
    const filepicker = require('filepicker-js');
    filepicker.setKey(this.props.filePickerKey);

    const filePickerOptions = {
      buttonText: 'Choose',
      container: 'modal',
      multiple: false,
      maxFiles: 1,
      imageQuality: 80,
      imageMax: [1200, 1200],
      services: ['COMPUTER', 'WEBCAM', 'VIDEO', 'IMAGE_SEARCH', 'FLICKR', 'GOOGLE_DRIVE', 'FACEBOOK', 'INSTAGRAM', 'BOX', 'SKYDRIVE', 'URL'],
      conversions: ['crop', 'filter'],
    };
    const filePickerStoreOptions = {
      location: 'S3'
    };

    function onFail(error) {
      console.log('error: ' + error);
    }

    filepicker.pick(filePickerOptions, this.handleFilePickerSuccess, onFail);
  }

  handleFilePickerSuccess(mediaItem) {


  }


  render() {
 
    const avatar = this.props.user && this.props.user.properties ? this.props.user.properties.thumb_url : '';

    return (
      <form onSubmit={this.handleSubmit}>
     
      <row >
      <div className="col-md-12">
      <h4>Profile </h4>
      </div>
      </row>
      <row>
            <div className="col-md-3">
             <h5 style={{marginLeft: '0px', color:'#9d9d9d'}}>Profile Picture</h5>< br/>
            <Avatar src={avatar}  onClick={this.handleTouchUp} style={{  position:'relative',top:"-25px",left:'0px', width:'180px', height:'180px', borderRadius:'0' }}/>
            <PPFlatButton label="Change Media" onClick={this.openFilePicker} style={{  position:'relative',top:"-25px",width:'180px', right:'0px',color:'#000' }} />
            </div>
            <div className="col-md-4">
                  <PPTextField 
                  hintText="First Name, Last Name"
                  floatingLabelText="Your Name"
                  value={this.props.display_name}
                  hintStyle={{padding: '5px', bottom: '3px' }} 
                  /><br />
                  <PPTextField
                  hintText="Company Name"
                  floatingLabelText="Company"
                  hintStyle={{padding: '5px', bottom: '3px' }} 
                  /><br />
                  <PPTextField
                  hintText="Your Title"
                  floatingLabelText="Title"
                  hintStyle={{padding: '5px', bottom: '3px' }} 
                  />
            </div>
            <div className="col-md-4">
                  <PPTextField
                  value={this.props.email}
                  hintText="youraddress@yourdomain.com"
                  floatingLabelText="Email"
                  hintStyle={{padding: '5px', bottom: '3px' }} 
                  />
                  <PPTextField
                  hintText="000-000-0000"
                  floatingLabelText="Phone"
                  hintStyle={{padding: '5px', bottom: '3px' }} 
                  />
                 
            </div>
       
      </row>
      <row>
        <div className="col-md-12">
           <hr/>
        </div>
      </row>
      <row>
      <div className="col-md-12">
      <h4>Email Notifications </h4>
      </div>
      </row>
      <row>
      <div className="col-md-10">
      <p>We will use this email address when someone comments on a post.: iamgroot@guardians.galaxy (<a href="">change address</a>).</p>
      </div>
      <div className="col-md-2">
      <Toggle
      label=""
      style={styles.toggle} />
      </div>
      </row>
      <row>
      <div className="col-md-3">
      <p><b>Frequency</b></p><p>Send me email notifications:</p>
      </div>
      <div className="col-md-4">
      <PPRadioButtonGroup name="freq" defaultSelected="not_light">
      <PPRadioButton
        value="light"
        label="Hourly"
        style={styles.radioButton}
      />
      <PPRadioButton
        value="light2"
        label="Weekly"
        style={styles.radioButton}
      />
      </PPRadioButtonGroup> 
      </div>
      <div className="col-md-4">
       <PPCheckbox
      label="Daily Snapshot"
    />
      <p>Showing what happened yesterday in all my projects.</p>
      </div>
      </row>
      <row>
        <div className="col-md-12">
           <hr/>
        </div>
      </row>
      <row >
      <div className="col-md-12">
      <h4>Security </h4>
      </div>
      </row>
      <row>
      <div className="col-md-3">
      
      </div>
      <div className="col-md-4">
         <PPTextField
         hintText="Password Field"
         floatingLabelText="Current Password"
         type="password"
         hintStyle={{padding: '5px', bottom: '3px' }} 
         />
      </div>
      <div className="col-md-4">
         <PPTextField
         hintText="Password Field"
         floatingLabelText="New Password"
         type="password"
         hintStyle={{padding: '5px', bottom: '3px' }} 
         /><br />
      </div>
      </row>
      <PPRaisedButton label="Cancel" style={style1} />
      <PPRaisedButton label="Update" type="submit" value="submit" primary={true} style={style2} />
  </form>

    );
  }
}
export function mapDispatchToProps(dispatch) {

  return {}
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  filePickerKey: makeSelectFilePickerKey(),
  // userAvatar: makeSelectUserAvator()

});

export default (connect(mapStateToProps, mapDispatchToProps)(settingsUser));
