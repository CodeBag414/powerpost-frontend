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
import { makeSelectCurrentAccount } from 'containers/Main/selectors';
import { fetchCurrentAccount } from 'containers/Main/actions';

import { updateAccount } from './actions';

import Wrapper from './Wrapper';
import Avatar from './avatar';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.openFilePicker = this.openFilePicker.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.accountProfileSave = this.accountProfileSave.bind(this);

    const avatarColor = ['#F27E39', '#B4ED50', '#30D0AA', '#67C5E7', '#B171B6', '#E35A88', '#E22424', '#778CDF', '#F0DB09', '#8FBEA4'];
    const blankAvatar = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
    const { profile, params } = this.props;
    const propsProperties = (profile && profile.properties) ? profile.properties : null;
    const initialProperties = {
      description: '',
      facebook_url: '',
      twitter_url: '',
      website_url: '',
      newsletter_url: '',
      store_url: '',
      phone_number: '',
      thumb_url: '',
      accountID: params.account_id,
    };

    const properties = Object.assign({}, initialProperties, propsProperties);

    this.state = {
      avatar: properties.thumb_url ? properties.thumb_url : blankAvatar,
      avatarKey: '',
      name: profile && profile.title ? profile.title : '',
      description: properties.description,
      facebook: properties.facebook_url,
      twitter: properties.twitter_url,
      website: properties.website_url,
      newsletterSignUp: properties.newsletter_url,
      storeURL: properties.store_url,
      contactPhoneNumber: properties.phone_number,
      accountID: properties.accountID,
      profile: this.props.profile || null,
      blankAvatar: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
      randomAvatar: avatarColor[Math.floor(Math.random() * 10)],
    };
  }

  componentDidMount() {
    this.props.getAccountProfile(this.state.accountID);
  }

  componentWillReceiveProps(nextProps) {
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
      thumb_url: '',
    };

    if ((JSON.stringify(this.state.profile) !== JSON.stringify(profile)) && profile) {
      this.props.getAccountProfile(this.state.accountID);
      const properties = Object.assign({}, initialProperties, propsProperties);
      this.setState({
        name: profile && profile.title ? profile.title : '',
        avatar: properties.thumb_url ? properties.thumb_url : this.state.blankAvatar,
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
        <form onSubmit={this.accountProfileSave}>
          <Avatar>
            <h6>Icon</h6>
            <button className="avatar" onClick={this.openFilePicker} type="button" style={{ background: this.state.randomAvatar }}>
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
            <PPButton
              type="submit"
              label="Save"
              primary={!false}
            />
          </div>
        </form>
      </Wrapper>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getAccountProfile: (accountID) => dispatch(fetchCurrentAccount(accountID)),
    save: (data) => dispatch(updateAccount(data)),
  };
}

Profile.propTypes = {
  getAccountProfile: React.PropTypes.func,
  filePickerKey: React.PropTypes.string,
  profile: React.PropTypes.object,
  params: React.PropTypes.object,
  save: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  profile: makeSelectCurrentAccount(),
  filePickerKey: makeSelectFilePickerKey(),
});

export default UserCanTeam(connect(mapStateToProps, mapDispatchToProps)(Profile));
