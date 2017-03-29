/*
 * User View
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { updateRequest } from '../../../../state/actions';
import { makeSelectUser,
         makeSelectUserAccount,
         makeSelectFilePickerKey
} from '../../../../state/selectors';

import Avatar from 'App/shared/atm.Avatar';
import PPToggle from 'App/shared/atm.Switch';
import FlatButton from 'material-ui/FlatButton';
import PPTextField from 'App/shared/atm.TestTextField';
import PPRaisedButton from 'App/shared/atm.RaisedButton';
import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio';

class settingsUser extends Component {
  constructor(props) {
    super(props);

    this.openFilePicker = this.openFilePicker.bind(this);
    this.profileUpdate = this.profileUpdate.bind(this);
    this.passwordUpdate = this.passwordUpdate.bind(this);
    this.onRadioNotify = this.onRadioNotify.bind(this);
    this.onToggleNotify = this.onToggleNotify.bind(this);
    this.handleChange = this.handleChange.bind(this);

    const user = this.props.user || null;
    const user_properties = user.properties || null;
    const user_own_account = this.props.user_own_account || null;
    const user_own_account_properties = user_own_account.properties || null;

    this.state = {
      avatar: (user_properties && user_properties.thumb_url) || '',
      avatar_key: '',
      your_email: user.email || '',
      full_name: user.display_name || '',
      company_name: user.company_name || '',

      time_zone: (user_properties && user_properties.timezone_id) || '',
      daily_snapshot: (user_properties && user_properties.daily_snapshot) || false,
      email_notifications: (user_properties && user_properties.receive_notifications) || '',

      your_title: user_own_account.title || '',
      phone_number: (user_own_account_properties && user_own_account_properties.phone_number) || '',

      new_pw: '',
      confirm_new_pw: ''
    };
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
  
  profileUpdate(event) {
    event.preventDefault();
    
    const account_id = this.props.user_own_account.account_id;
    
    var data = {
      avatar_key: this.state.avatar_key,
      name: this.state.full_name,
      title: this.state.your_title,
      email: this.state.your_email,
      time_zone: this.state.time_zone,
      phone_number: this.state.phone_number,
      company_name: this.state.company_name,
      email_notifications: this.state.email_notifications,
      new_pw: '',
      account_id: account_id
    };

    this.props.update(data);
  }

  passwordUpdate(event) {
    event.preventDefault();
    const account_id = this.props.user_own_account.account_id;

    if(this.state.new_pw == this.state.confirm_new_pw) {
        var data = {new_pw: this.state.new_pw,
                    account_id: account_id};
        this.props.update(data);
    }
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name]: value});
  };

  onRadioNotify(value) {
    this.setState({email_notifications: value});
  }

  onToggleNotify(value) {
    this.setState({daily_snapshot: value});    
  }

  render() {
    const styles = require('./styles.scss');
    const inline = {
        avatar: {
            position:'relative',
            top:"-25px",
        },
        avatarImg: {
            left:'0px',
            width:'180px',
            height:'180px',
            borderRadius:'0'
        }
    };

    return (
      <div style={styles}>
        <form onSubmit={this.profileUpdate}>
            <row>
              <div className="col-md-12">
                <h3>Profile</h3>
              </div>
            </row>
            <row>
              <div className="col-md-3">
                <h5 style={{marginLeft: '0px', color:'#9d9d9d'}}>Profile Picture</h5> <br/>
                <div style={inline.avatar}>
                  <Avatar
                      image={this.state.avatar}
                      style={inline.avatarImg}
                      onClick={this.openFilePicker}
                    />
                  <FlatButton
                      label="Update Photo"
                      className={styles.updateAvatar}
                      onClick={this.openFilePicker}
                    />
                </div>
              </div>
              <div className="col-md-9">
                <row>
                  <div className="col-md-6">
                    <PPTextField
                        type='text'
                        name='full_name'
                        floatingLabelText='Name'
                        value={this.state.full_name}
                        onChange={this.handleChange}
                        style={{margin: 0}}
                        required
                      />
                    <br />
                    <PPTextField
                        type='text'
                        name='company_name'
                        floatingLabelText='Company'
                        value={this.state.company_name}
                        onChange={this.handleChange}
                        style={{margin: 0}}
                      />
                    <br />
                    <PPTextField
                        type='text'
                        name='your_title'
                        floatingLabelText="Title"
                        value={this.state.your_title}
                        onChange={this.handleChange}
                        style={{margin: 0}}
                      />
                  </div>
                  <div className="col-md-6">
                    <PPTextField
                        type='email'
                        name='your_email'
                        floatingLabelText="Email"
                        value={this.state.your_email}
                        onChange={this.handleChange}
                        style={{margin: 0}}
                      />
                    <br />
                    <PPTextField
                        type='tel'
                        name='phone_number'
                        floatingLabelText="Phone"
                        value={this.state.phone_number}
                        onChange={this.handleChange}
                        style={{margin: 0}}
                      />
                    <br />
                    <PPTextField
                        type='text'
                        name='time_zone'
                        floatingLabelText="Time Zone"
                        value={this.state.time_zone}
                        onChange={this.handleChange}
                        style={{margin: 0}}
                        required
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
                 <RadioGroup name="digest" onChange={this.onRadioNotify} value={this.state.email_notifications}>
                    <RadioButton
                       theme={styles}
                       className={styles.radioButton}
                       value="hourly_digest"
                       label="Hourly"
                      />
                    <RadioButton
                       theme={styles}
                       className={styles.radioButton}
                       value="daily_digest"
                       label="Daily"
                      />
                 </RadioGroup>
              </div>
              <div className="col-md-5">
                <PPToggle
                    name='daily_snapshot'
                    label='Daily Snapshot'
                    checked={this.state.daily_snapshot}
                    onChange={this.onToggleNotify}
                  />
                 <p>Showing what happened yesterday in all my projects.</p>
              </div>
            </row>
            <row>
                <div className="col-md-12">
                  <PPRaisedButton
                      type="submit"
                      label="Save"
                      primary={ true }
                      className={styles.submit}
                    />
                </div>
            </row>
        </form>
        <form onSubmit={this.passwordUpdate}>
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
                    <PPTextField
                        type='password'
                        name='new_pw'
                        floatingLabelText="New Password"
                        value={this.state.new_pw}
                        onChange={this.handleChange}
                        style={{margin: 0}}
                      />
                  </div>
                  <div className="col-md-6">
                    <PPTextField
                        type='password'
                        name='confirm_new_pw'
                        floatingLabelText="Confirm New Password"
                        value={this.state.confirm_new_pw}
                        onChange={this.handleChange}
                        style={{margin: 0}}
                      />
                  </div>
                </row>
              </div>
            </row>
            <row>
                <div className="col-md-12">
                  <PPRaisedButton
                      type="submit"
                      label="Save"
                      primary={ true }
                      className={styles.submit}
                    />
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
