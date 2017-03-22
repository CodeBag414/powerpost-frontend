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
import PPInput from 'App/shared/atm.Input';
import FlatButton from 'material-ui/FlatButton';
import PPRaisedButton from 'App/shared/atm.RaisedButton';
import {RadioButton,RadioButtonGroup} from 'material-ui/RadioButton';


class settingsUser extends Component {
  constructor(props) {
    super(props);

    this.openFilePicker = this.openFilePicker.bind(this);
    this.profileUpdate = this.profileUpdate.bind(this);
    this.pwUpdate = this.pwUpdate.bind(this);
    this.onRadioNotify = this.onRadioNotify.bind(this);

    var avatar = '';
    var time_zone = '';
    var receive_notifications = '';
    const user = this.props.user ? this.props.user : null;
    
    if (user) {
        if (user.properties) {
            var properties = user.properties;
            avatar = properties.thumb_url ? properties.thumb_url : '';
            time_zone = properties.timezone_id ? properties.timezone_id : '';
            receive_notifications = properties.receive_notifications ? properties.receive_notifications : '';
        }
    }
    
    var phone_number = '';
    const user_own_account = this.props.user_own_account ? this.props.user_own_account : null;
    
    if (user_own_account)
        if (user_own_account.properties)
            phone_number = user_own_account.properties.phone_number ? user_own_account.properties.phone_number : '';
    
    this.state = {
      avatar: avatar ? avatar : '',
      avatar_key: '',
      full_name: user ? user.display_name : '',
      company_name: 'PowerPost',
      your_title: user_own_account ? user_own_account.title: '',
      your_email: user ? user.email : '',
      phone_number: phone_number,
      time_zone: time_zone,
      email_notifications: receive_notifications,
      new_pw: '',
      confirm_new_pw: ''
    };
  }
  
  state = {full_name: '', company_name: '', your_title: '', your_email: '',
           phone_number: '', time_zone: '', new_pw: '', confirm_new_pw: ''};
           
  handleChange = (name, value) => {
    this.setState({...this.state, [name]: value});
  };
  
  profileUpdate(event) {
    event.preventDefault();
    
    const account_id = this.props.user_own_account.account_id;
    
    var data = {avatar_key: this.state.avatar_key,
                name: this.state.full_name,
                title: this.state.your_title,
                email: this.state.your_email,
                time_zone: this.state.time_zone,
                phone_number: this.state.phone_number,
                company_name: this.state.company_name,
                email_notifications: this.state.email_notifications,
                new_pw: '',
                account_id: account_id};
                
    this.props.update(data);
  }
  
  pwUpdate(event) {
    event.preventDefault();
    const account_id = this.props.user_own_account.account_id;
    
    if(this.state.new_pw == this.state.confirm_new_pw) {
        var data = {new_pw: this.state.new_pw,
                    account_id: account_id};
        this.props.update(data);
    }
  }
  
  openFilePicker() {
    this.setState({
      open: false
    });
    
    const _this = this;
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
    
    const fileStoreOptions = {
      location: 'S3'
    };

    filepicker.pickAndStore(
      filePickerOptions,
      fileStoreOptions,
      function(Blobs) {
        _this.setState({avatar: Blobs[0].url});
        _this.setState({avatar_key: Blobs[0].key});
      },
      function(error){
        _this.setState({avatar_key: ''});
      },
      function(progress){
        console.log(JSON.stringify(progress));
      }
    );
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
        },
        avatar: {
            position:'relative',
            top:"-25px",
        },
        avatarImg: {
            left:'0px',
            width:'180px',
            height:'180px',
            borderRadius:'0'
        },
        updateAvatar: {
            position:'absolute',
            top: 0,
            width:'180px',
            height: '180px',
            left: 0,
            right: 0,
            color:'#fff'
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
                <div style={inline.avatar}>
                  <Avatar
                      src={this.state.avatar}
                      style={inline.avatarImg}
                      onClick={this.openFilePicker}
                    />
                  <FlatButton
                      label="Update Photo"
                      style={inline.updateAvatar}
                      onClick={this.openFilePicker}
                    />
                </div>
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
        <form onSubmit={this.pwUpdate}>
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
                        label="New Password"
                        value={this.state.new_pw}
                        onChange={this.handleChange.bind(this, 'new_pw')}
                      />
                  </div>
                  <div className="col-md-6">
                    <PPInput
                        type='password'
                        label="Confirm New Password"
                        value={this.state.confirm_new_pw}
                        onChange={this.handleChange.bind(this, 'confirm_new_pw')}
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
  filePickerKey: makeSelectFilePickerKey()
});

export default (connect(mapStateToProps, mapDispatchToProps)(settingsUser));
