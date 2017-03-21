/*
 * User View
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from "reselect";
import {updateRequest} from '../../../../state/actions';
import {
  makeSelectUser,
  makeSelectUserAccount,
  makeSelectFilePickerKey
} from '../../../../state/selectors';

import Avatar from 'material-ui/Avatar';
import Toggle from 'material-ui/Toggle';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import PPInput from 'App/shared/atm.Input';
import PPRaisedButton from 'App/shared/atm.RaisedButton';
import {RadioButton,RadioButtonGroup} from 'material-ui/RadioButton';


class settingsUser extends Component {
  constructor(props) {
    super(props);

    this.openFilePicker = this.openFilePicker.bind(this);
    this.profileUpdate = this.profileUpdate.bind(this);
    this.onRadioNotify = this.onRadioNotify.bind(this);

    const user = this.props.user ? this.props.user : null;
    var avatar = '';
    var time_zone = '';
    var receive_notifications = '';
    if (user) {
        if (user.properties) {
            var properties = user.properties;
            avatar = properties.thumb_url ? properties.thumb_url : '';
            time_zone = properties.timezone_id ? properties.timezone_id : '';
            receive_notifications = properties.receive_notifications ? properties.receive_notifications : '';
        }
    }
    
    const user_own_account = this.props.user_own_account ? this.props.user_own_account : null;
    var phone_number = '';
    if (user_own_account)
        if (user_own_account.properties)
            phone_number = user_own_account.properties.phone_number ? user_own_account.properties.phone_number : '';
    
    console.log("this.props.user",this.props.user);
    console.log("this.props.user_own_account", user_own_account);
    
    this.state = {
      value: 1,
      avatar: avatar ? avatar : '',
      full_name: user ? user.display_name : '',
      company_name: 'PowerPost',
      your_title: user_own_account ? user_own_account.title: '',
      your_email: user ? user.email : '',
      phone_number: phone_number,
      time_zone: time_zone,
      email_notifications: receive_notifications,
      current_pw: '',
      new_pw: ''
    };
  }
  
  state = {avatar: '', full_name: '', company_name: '', your_title: '', your_email: '',
           phone_number: '', time_zone: '', current_pw: '', new_pw: ''};
           
  handleChange = (name, value) => {
    this.setState({...this.state, [name]: value});
  };
  
  handleSubmit(event) {
    alert('Updates were submitted: ' + this.state.value);
    event.preventDefault();
  }
  
  profileUpdate(event) {
    event.preventDefault();
    
    const account_id = this.props.user_own_account.account_id;
    const user_id = this.props.user.user_id;
    
    var data = {avatar: this.state.avatar,
                name: this.state.full_name,
                title: this.state.your_title,
                email: this.state.your_email,
                time_zone: this.state.time_zone,
                phone_number: this.state.phone_number,
                company_name: this.state.company_name,
                email_notifications: this.state.email_notifications,
                current_pw: '',
                new_pw: '',
                account_id: account_id,
                user_id: user_id};
                
    this.props.update(data);
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
  
  onRadioNotify(event, value) {
    event.preventDefault();
    this.setState({email_notifications: value});
  }
  
  render() {
    const styles = require('./styles.scss');
    
    const inline = {
        radioButton: {
            width: '50%',
            marginTop: '20px',
            display: 'inline-block',
        },
        toggle: {
            width: 150,
            marginTop: 10,
        }
    };
    
    return (
      <div>
        <form onSubmit={this.profileUpdate}>
            <row>
              <div className="col-md-12">
                <h3>Profile</h3>
              </div>
            </row>
            <row>
              <div className="col-md-3">
                <h5 style={{marginLeft: '0px', color:'#9d9d9d'}}>Profile Picture</h5>< br/>
                <Avatar src={this.state.avatar}  onClick={this.handleTouchUp} style={{  position:'relative',top:"-25px",left:'0px', width:'180px', height:'180px', borderRadius:'0' }}/>
                <FlatButton label="Change Media" onClick={this.openFilePicker} style={{  position:'relative',top:"-25px",width:'180px', right:'0px',color:'#000' }} />
              </div>
              <div className="col-md-9">
                <row>
                  <div className="col-md-6">
                    <PPInput
                        type='text'
                        label="Full Name"
                        required
                        value={this.state.full_name}
                        onChange={this.handleChange.bind(this, 'full_name')}
                      />
                    <br />
                    <PPInput
                        type='text'
                        label="Company Name"
                        value={this.state.company_name}
                        onChange={this.handleChange.bind(this, 'company_name')}
                      />
                    <br />
                    <PPInput
                        type='text'
                        label="Your Title"
                        value={this.state.your_title}
                        onChange={this.handleChange.bind(this, 'your_title')}
                      />
                  </div>
                  <div className="col-md-6">
                    <PPInput
                        type='email'
                        label="Your Email"
                        value={this.state.your_email}
                        onChange={this.handleChange.bind(this, 'your_email')}
                      />
                    <br />
                    <PPInput
                        type='tel'
                        label="Phone Number"
                        value={this.state.phone_number}
                        onChange={this.handleChange.bind(this, 'phone_number')}
                      />
                    <br />
                    <PPInput
                        type='text'
                        label="Time Zone"
                        required
                        value={this.state.time_zone}
                        onChange={this.handleChange.bind(this, 'time_zone')}
                      />
                  </div>
                </row>
              </div>
            </row>
            <row>
                <div className="col-md-12">
                    <PPRaisedButton type="submit" label="Update" primary={ true } className={styles.submit}/>
                </div>
            </row>
        </form>
          
        <form onSubmit={this.handleSubmit}>
            <row>
              <div className="col-md-12">
                <hr/>
              </div>
            </row>
            <row>
              <div className="col-md-12">
                <h3>Email Notifications </h3>
              </div>
            </row>
            <row>
              <div className="col-md-3">
                <h4>Frequency</h4>
                <p>Send me email notifications:</p>
              </div>
              <div className="col-md-4">
                 <RadioButtonGroup name="digest" onChange={this.onRadioNotify} defaultSelected={this.state.email_notifications}>
                    <RadioButton
                       style={inline.radioButton}
                       value="hourly_digest"
                       label="Hourly"
                      />
                    <RadioButton
                       style={inline.radioButton}
                       value="daily_digest"
                       label="Daily"
                      />
                 </RadioButtonGroup>
              </div>
              <div className="col-md-5">
                <Toggle
                  label="Daily Snapshot"
                  style={inline.toggle} />
                 <p>Showing what happened yesterday in all my projects.</p>
              </div>
            </row>
            <row>
                <div className="col-md-12">
                    <PPRaisedButton type="submit" label="Update" primary={ true } className={styles.submit}/>
                </div>
            </row>
        </form>
        <form>
            <row>
              <div className="col-md-12">
                 <hr/>
              </div>
            </row>
            <row>
              <div className="col-md-3">
                <h3>Security </h3>
              </div>
              <div className="col-md-9">
                <row>
                  <div className="col-md-6">
                    <PPInput
                        type='password'
                        label="Current Password"
                        value={this.state.current_pw}
                        onChange={this.handleChange.bind(this, 'current_pw')}
                      />
                  </div>
                  <div className="col-md-6">
                    <PPInput
                        type='password'
                        label="New Password"
                        value={this.state.new_pw}
                        onChange={this.handleChange.bind(this, 'new_pw')}
                      />
                  </div>
                </row>
              </div>
            </row>
            <row>
                <div className="col-md-12">
                    <PPRaisedButton type="submit" label="Update" primary={ true } className={styles.submit}/>
                </div>
            </row>
        </form>
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    update: (data) => dispatch(updateRequest(data)),
  };
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  user_own_account: makeSelectUserAccount(),
  filePickerKey: makeSelectFilePickerKey(),
  // userAvatar: makeSelectUserAvator()
});

export default (connect(mapStateToProps, mapDispatchToProps)(settingsUser));
