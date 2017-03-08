/*
 * User View
 */

import React, {
  Component
}
from 'react';
import PPTextField from 'App/shared/atm.TextField';
import Avatar from 'App/shared/atm.Avatar';
import Subheader from 'material-ui/Subheader';
import PPToggle from 'App/shared/atm.Toggle';
import PPRadioButton from 'App/shared/atm.RadioButton';
import PPRadioButtonGroup from 'App/shared/atm.RadioButtonGroup';
import PPRaisedButton from 'App/shared/atm.RaisedButton';
import PPFlatButton from 'App/shared/atm.FlatButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import PPCheckbox from 'App/shared/atm.Checkbox';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import {
  makeSelectUser,
  makeSelectFilePickerKey,
  makeSelectUserAvator
}
from '../../../../state/selectors';
import { Link } from 'react-router';

import { push } from 'react-router-redux';

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
    backgroundColor: '#e52466',
  },
  trackSwitched: {
    backgroundColor: '#e52466',
  },
  labelStyle: {
    color: '#e52466',
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
           emailValue: '',
           passwordValue: '',
       };
       
       this.changeEmail = this.changeEmail.bind(this);
       this.changePassword = this.changePassword.bind(this);
    }

    changeEmail(event) {
        this.setState({ emailValue: event.target.value });
    }
    
    changePassword(event) {
        this.setState({ passwordValue: event.target.value });
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
      <h4>User Profile </h4>
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
                  value={this.props.display_name}
                  hintText="First Name, Last Name"
                  floatingLabelText="Your Name"
                  hintStyle={{padding: '5px', bottom: '3px' }} 
                  /><br />
                  <PPTextField
                  value={this.props.company}
                  hintText="Company Name"
                  floatingLabelText="Company"
                  hintStyle={{padding: '5px', bottom: '3px' }} 
                  /><br />
                  <PPTextField
                  value={this.props.titile}
                  hintText="Your Title"
                  floatingLabelText="Title"
                  hintStyle={{padding: '5px', bottom: '3px' }} 
                  />
            </div>
            <div className="col-md-4">
                  <PPTextField
                  onChange={ this.changeEmail }
                  hintText="youraddress@yourdomain.com"
                  floatingLabelText="Email"
                  hintStyle={{padding: '5px', bottom: '3px' }} 
                  />
                  <PPTextField
                  value={this.props.phone}
                  hintText="000-000-0000"
                  floatingLabelText="Phone"
                  hintStyle={{padding: '5px', bottom: '3px' }} 
                  />
                 
            </div>
       
      </row>
           <hr/>
      <row>
      <div className="col-md-12">
      <h4>Email Notifications </h4>
      </div>
      </row>
      <row>
      <div className="col-md-10">
      <p>We will use this email address when someone comments on a post.: iamgroot@guardians.galaxy (<a href="" style={{color:'#e52466'}}>change address</a>).</p>
      </div>
      <div className="col-md-2">
      <PPToggle
      label=""
      thumbSwitchedStyle={{ backgroundColor: '#e52466' }} 
      trackSwitchedStyle={{ backgroundColor: '#e52466' }}
      />
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
        iconStyle={{fill: '#e52466'}}
      />
      <PPRadioButton
        value="light2"
        label="Weekly"
        iconStyle={{fill: '#e52466'}}
      />
      </PPRadioButtonGroup> 
      </div>
      <div className="col-md-4">
       <PPCheckbox
      label="Daily Snapshot"
      iconStyle={{fill: '#e52466'}}
    />
      <p>Showing what happened yesterday in all my projects.</p>
      </div>
      </row>
           <hr/>
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
      <row>
      <div className="col-md-4"></div>
      <div className="col-md-4"></div>
      <div className="col-md-4" style={{paddingTop:'40px'}}>
      <PPRaisedButton label="Cancel" />
      <PPRaisedButton 
      label="Update" 
      type="submit" 
      value="submit" 
      secondary={true}/>
      </div>
      </row>
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
