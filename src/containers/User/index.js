/*
 * User View
 */
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import filepicker from 'filepicker-js';
import PPTextField from 'elements/atm.TextField';
import PPButton from 'elements/atm.Button';
import PPRadioButton from 'elements/atm.RadioButton';

import { updateRequest } from 'containers/App/actions';
import {
  makeSelectUser,
  makeSelectUserAccount,
  makeSelectFilePickerKey,
} from 'containers/App/selectors';

import Wrapper from './Wrapper';
import Content from './Content';
import Header from './Header';
import Avatar from './Avatar';

class settingsUser extends Component {
  static propTypes = {
    user: PropTypes.object,
    userOwnAccount: PropTypes.object,
    filePickerKey: PropTypes.string,
    update: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.openFilePicker = this.openFilePicker.bind(this);
    this.profileUpdate = this.profileUpdate.bind(this);
    this.notificationUpdate = this.notificationUpdate.bind(this);
    this.passwordUpdate = this.passwordUpdate.bind(this);
    this.onRadioNotify = this.onRadioNotify.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);

    const user = this.props.user || null;
    const userProperties = (user && user.properties) || null;
    const userOwnAccount = this.props.userOwnAccount || null;
    const userOwnAccountProperties = (userOwnAccount && userOwnAccount.properties) || null;

    this.state = {
      avatar: (userProperties && userProperties.thumb_url) || '',
      avatarKey: '',
      email: user.email || '',
      name: user.display_name || '',

      dailySnapshot: (userProperties && userProperties.daily_snapshot) || false,
      emailNotifications: (userProperties && userProperties.receive_notifications) || 'none',

      title: (userOwnAccount && userOwnAccount.title) || '',
      phoneNumber: (userOwnAccountProperties && userOwnAccountProperties.phone_number) || '',

      newPW: '',
      confirmNewPW: '',
      confirmPWError: '',
      user: user || null,
      userOwnAccount: userOwnAccount || null,
    };
  }

  componentWillReceiveProps(nextProps) {
    let user = this.state.user;
    let userOwnAccount = this.state.userOwnAccount;
    if (user !== nextProps.user) {
      user = nextProps.user ? nextProps.user : user;
    }

    if (userOwnAccount !== nextProps.userOwnAccount) {
      userOwnAccount = nextProps.userOwnAccount ? nextProps.userOwnAccount : userOwnAccount;
    }

    const userProperties = (user && user.properties) || null;
    const userOwnAccountProperties = (userOwnAccount && userOwnAccount.properties) || null;

    this.setState({
      avatar: (userProperties && userProperties.thumb_url) || '',
      avatarKey: '',
      email: user.email || '',
      name: user.display_name || '',

      dailySnapshot: (userProperties && userProperties.daily_snapshot) || false,
      emailNotifications: (userProperties && userProperties.receive_notifications) || 'none',

      title: (userOwnAccount && userOwnAccount.title) || '',
      phoneNumber: (userOwnAccountProperties && userOwnAccountProperties.phone_number) || '',

      newPW: '',
      confirmNewPW: '',
      confirmPWError: '',
      user: user || null,
      userOwnAccount: userOwnAccount || null,
    });
  }

  onRadioNotify(event) {
    const value = event.target.value;
    this.setState({
      emailNotifications: value,
    });
  }

  openFilePicker() {
    this.setState({
      open: false,
    });

    const tthis = this;
    filepicker.setKey(this.props.filePickerKey);

    const filePickerOptions = {
      cropRatio: 1 / 1,
      buttonText: 'Choose',
      container: 'modal',
      multiple: false,
      maxFiles: 1,
      imageQuality: 80,
      imageMax: [1200, 1200],
      services: ['CONVERT', 'COMPUTER', 'WEBCAM', 'IMAGE_SEARCH', 'FLICKR', 'GOOGLE_DRIVE', 'FACEBOOK', 'INSTAGRAM', 'BOX', 'SKYDRIVE', 'URL'],
      conversions: ['crop', 'filter'],
    };

    const fileStoreOptions = {
      location: 'S3',
    };

    const uploadSuccess = function (Blobs) {
      tthis.setState({
        avatar: Blobs[0].url,
        avatarKey: Blobs[0].key,
      });
    };

    const uploadFail = function () {
      tthis.setState({
        avatarKey: '',
      });
    };

    const uploadProgress = function (progress) {
      console.log(JSON.stringify(progress));
    };

    filepicker.pickAndStore(
      filePickerOptions,
      fileStoreOptions,
      uploadSuccess,
      uploadFail,
      uploadProgress,
    );
  }

  profileUpdate(event) {
    event.preventDefault();

    const data = {
      avatarKey: this.state.avatarKey,
      name: this.state.name,
      title: this.state.title,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      newPW: '*****',
      accountID: this.props.userOwnAccount.account_id,
    };

    this.props.update(data);
  }

  notificationUpdate(event) {
    event.preventDefault();

    const data = {
      emailNotifications: this.state.emailNotifications,
      newPW: '*****',
      accountID: this.props.userOwnAccount.account_id,
    };

    this.props.update(data);
  }

  passwordUpdate(event) {
    event.preventDefault();

    const data = {
      accountID: this.props.userOwnAccount.account_id,
      newPW: this.state.newPW,
    };
    this.props.update(data);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  }

  passwordChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    switch (name) {
      case 'newPW':
        this.setState({
          newPW: value,
        });
        if (value !== this.state.confirmNewPW) {
          this.setState({
            confirmPWError: 'Password does not match with the confirm password.',
          });
        } else if ((value.length >= 6 && value.length <= 45) || value.length === 0) {
          this.setState({
            confirmPWError: '',
          });
        } else {
          this.setState({
            confirmPWError: 'Password must be between 6 and 45 characters',
          });
        }
        break;
      case 'confirmNewPW':
        this.setState({
          confirmNewPW: value,
        });
        if (value !== this.state.newPW) {
          this.setState({
            confirmPWError: 'Password does not match with the confirm password.',
          });
        } else if ((value.length >= 6 && value.length <= 45) || value.length === 0) {
          this.setState({
            confirmPWError: '',
          });
        } else {
          this.setState({
            confirmPWError: 'Password must be between 6 and 45 characters',
          });
        }
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <Wrapper>
        <div className="container">
          <Header>Profile</Header>
          <form onSubmit={this.profileUpdate}>
            <Content>
              <div className="head">
                <Avatar>
                  <h6>Profile Picture</h6>
                  <button className="avatar" onClick={this.openFilePicker} type="button">
                    <img src={this.state.avatar} alt="avatar" />
                    <div className="avatar-txt">
                      <i className="fa fa-camera"></i>
                      <p>Update Your <br /> Profile Photo</p>
                    </div>
                  </button>
                </Avatar>
              </div>
              <div className="body">
                <div className="col">
                  <PPTextField
                    type="text"
                    name="name"
                    floatingLabelText="Name"
                    maxLength={200}
                    value={this.state.name}
                    onChange={this.handleChange}
                    required
                  />
                  <PPTextField
                    type="text"
                    name="title"
                    floatingLabelText="Title"
                    maxLength={100}
                    value={this.state.title}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col">
                  <PPTextField
                    type="email"
                    name="email"
                    floatingLabelText="Email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  <PPTextField
                    type="tel"
                    name="phoneNumber"
                    floatingLabelText="Phone"
                    maxLength={100}
                    value={this.state.phoneNumber}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="foot">
                <PPButton
                  type="submit"
                  label="Save"
                  primary={!false}
                />
              </div>
            </Content>
          </form>
          <form onSubmit={this.notificationUpdate}>
            <Content>
              <h3 style={{ paddingLeft: 10, fontWeight: 900 }}>Email Notifications</h3>
              <div className="head">
                <h5>Frequency</h5>
                <p>Send me email notifications:</p>
              </div>
              <div className="body">
                <div className="radio-group">
                  <PPRadioButton
                    className="email-radio"
                    name="digest"
                    value="none"
                    label="None"
                    onChange={this.onRadioNotify}
                    checked={this.state.emailNotifications === 'none'}
                  />
                  <PPRadioButton
                    className="email-radio"
                    name="digest"
                    value="hourly_digest"
                    label="Hourly"
                    onChange={this.onRadioNotify}
                    checked={this.state.emailNotifications === 'hourly_digest'}
                  />
                  <PPRadioButton
                    className="email-radio"
                    name="digest"
                    value="daily_digest"
                    label="Daily"
                    onChange={this.onRadioNotify}
                    checked={this.state.emailNotifications === 'daily_digest'}
                  />
                </div>
              </div>
              <div className="foot">
                <PPButton
                  type="submit"
                  label="Save"
                  primary={!false}
                />
              </div>
            </Content>
          </form>
          <form onSubmit={this.passwordUpdate}>
            <Content last>
              <div className="head">
                <h3>Security</h3>
              </div>
              <div className="body">
                <div className="col">
                  <PPTextField
                    type="password"
                    name="newPW"
                    floatingLabelText="New Password"
                    maxLength={45}
                    value={this.state.newPW}
                    onChange={this.passwordChange}
                  />
                </div>
                <div className="col">
                  <PPTextField
                    type="password"
                    name="confirmNewPW"
                    floatingLabelText="Confirm New Password"
                    maxLength={45}
                    value={this.state.confirmNewPW}
                    onChange={this.passwordChange}
                    errorText={this.state.confirmPWError}
                  />
                </div>
              </div>
              <div className="foot">
                <PPButton
                  type="submit"
                  label="Save"
                  disabled={!!this.state.confirmPWError || !this.state.newPW}
                  primary={!false}
                />
              </div>
            </Content>
          </form>
        </div>
      </Wrapper>
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
  userOwnAccount: makeSelectUserAccount(),
  filePickerKey: makeSelectFilePickerKey(),
});

export default (connect(mapStateToProps, mapDispatchToProps)(settingsUser));

