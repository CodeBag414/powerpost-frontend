/*
 * Profile
 *
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import filepicker from 'filepicker-js';
import PPTextField from 'elements/atm.TextField';
import PPTextArea from 'elements/atm.TextArea';
import PPButton from 'elements/atm.Button';
import { UserCanTeam } from 'config.routes/UserRoutePermissions';

import { makeSelectFilePickerKey } from 'containers/App/selectors';
import { makeSelectAccountProfile } from './selectors';
import {
  fetchAccount,
  updateAccount,
} from './actions';

import Wrapper from './Wrapper';
import Avatar from './avatar';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.openFilePicker = this.openFilePicker.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.accountProfileSave = this.accountProfileSave.bind(this);

    this.state = {
      avatar: 'https://www.photo.net/avatar/8224163',
      avatarKey: '',
      name: '',
      description: '',
      facebook: '',
      twitter: '',
      website: '',
      newsletterSignUp: '',
      storeURL: '',
      contactPhoneNumber: '',
      profile: this.props.profile || null,
      accountID: null,
    };
  }

  componentDidMount() {
    this.fetchAccount(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchAccount(nextProps);
    const profile = nextProps.profile;
    const propsProperties = (profile && profile.properties) ? profile.properties : null;

    const initialProperties = {
      description: '',
      facebook_url: '',
      twitter_url: '',
      website_url: '',
      newsletter_url: '',
      store_url: '',
      phone_number: '',
      thumb_url: 'https://www.photo.net/avatar/8224163',
      accountID: nextProps.params.account_id,
    };

    if ((JSON.stringify(this.state.profile) !== JSON.stringify(profile)) && profile) {
      const properties = Object.assign({}, initialProperties, propsProperties);
      this.setState({
        name: profile && profile.title ? profile.title : '',
        avatar: properties.thumb_url,
        description: properties.description,
        facebook: properties.facebook_url,
        twitter: properties.twitter_url,
        website: properties.website_url,
        newsletterSignUp: properties.newsletter_url,
        storeURL: properties.store_url,
        contactPhoneNumber: properties.phone_number,
        profile: nextProps.profile,
      });
    }
  }

  fetchAccount = (props) => {
    const accountID = props.params.account_id;
    const getAccountProfile = props.getAccountProfile;
    getAccountProfile(accountID);

    this.setState({
      accountID,
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

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  }

  accountProfileSave(event) {
    event.preventDefault();

    const state = this.state;
    const data = {
      accountID: state.accountID,
      update: {
        payload: {
          title: state.name,
          properties: {
            thumbnail_image_key: state.avatarKey,
            description: state.description,
            facebook_url: state.facebook,
            twitter_url: state.twitter,
            website_url: state.website,
            newsletter_url: state.newsletterSignUp,
            store_url: state.storeURL,
            phone_number: state.contactPhoneNumber,
          },
        },
      },
    };

    this.props.save(data);
  }

  render() {
    return (
      <Wrapper>
        <form onSubmit={this.accountProfileSave} className="container">
          <Avatar>
            <h6>Icon</h6>
            <button className="avatar" onClick={this.openFilePicker} type="button">
              <img src={this.state.avatar} alt="avatar" />
              <div className="avatar-txt">
                <i className="fa fa-camera"></i>
                <p>Update Your <br /> Profile Photo</p>
              </div>
            </button>
          </Avatar>
          <div className="basic-info">
            <PPTextField
              type="text"
              name="name"
              floatingLabelText="Name"
              maxLength={100}
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
            <PPTextArea
              type="text"
              name="description"
              floatingLabelText="Description"
              maxLength={500}
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>
          <row>
            <div className="col">
              <PPTextField
                type="url"
                name="facebook"
                floatingLabelText="Facebook"
                maxLength={100}
                hintText="https://www.facebook.com/myprofile"
                value={this.state.facebook}
                onChange={this.handleChange}
              />
              <PPTextField
                type="url"
                name="twitter"
                floatingLabelText="Twitter"
                maxLength={100}
                hintText="https://www.twitter.com/myprofile"
                value={this.state.twitter}
                onChange={this.handleChange}
              />
              <PPTextField
                type="url"
                name="website"
                floatingLabelText="Website"
                maxLength={200}
                value={this.state.website}
                onChange={this.handleChange}
              />
            </div>
            <div className="col">
              <PPTextField
                type="url"
                name="newsletterSignUp"
                floatingLabelText="Newsletter Sign Up"
                maxLength={200}
                hintText="https://www.mydomain.com/newslettersignup"
                value={this.state.newsletterSignUp}
                onChange={this.handleChange}
              />
              <PPTextField
                type="url"
                name="storeURL"
                floatingLabelText="Store URL"
                maxLength={200}
                hintText="https://www.mycartdomain.com"
                value={this.state.storeURL}
                onChange={this.handleChange}
              />
              <PPTextField
                type="tel"
                name="contactPhoneNumber"
                floatingLabelText="Contact Phone Number"
                maxLength={25}
                hintText="XXX-XXX-XXXX"
                value={this.state.contactPhoneNumber}
                onChange={this.handleChange}
              />

              <PPButton
                type="submit"
                label="Save"
                primary={!false}
              />
            </div>
          </row>
        </form>
      </Wrapper>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getAccountProfile: (accountID) => dispatch(fetchAccount(accountID)),
    save: (data) => dispatch(updateAccount(data)),
  };
}

Profile.propTypes = {
  getAccountProfile: React.PropTypes.func,
  profile: React.PropTypes.object,
  save: React.PropTypes.func,
  filePickerKey: React.PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  profile: makeSelectAccountProfile(),
  filePickerKey: makeSelectFilePickerKey(),
});

export default UserCanTeam(connect(mapStateToProps, mapDispatchToProps)(Profile));
