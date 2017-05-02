import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import filepicker from 'filepicker-js';

import { UserCanTeam } from 'config.routes/UserRoutePermissions';

import PPTextField from 'elements/atm.TextField';
import PPButton from 'elements/atm.Button';
import PPAvatar from 'elements/atm.Avatar';

import { makeSelectFilePickerKey } from 'containers/App/selectors';

import Wrapper from './Wrapper';

class BrandUploadForm extends Component {

  static propTypes = {
    avatarColor: PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.state = {
      brandName: '',
      avatarColor: props.avatarColor,
      errorText: '',
    };
  }

  getAvatarandColor = (uploadedAvatar, BKColor) => {
    this.setState({
      avatarKey: uploadedAvatar,
      avatarColor: BKColor,
    });
  }

  uploadAvatar = (e) => {
    e.preventDefault();

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

    const uploadSuccess = (Blobs) => {
      this.getAvatarandColor(Blobs[0].key, this.state.backgroundColor);
      this.setState({
        avatarNew: Blobs[0].url,
        avatarKey: Blobs[0].key,
      });
    };

    const uploadFail = () => {
      this.setState({
        avatarKey: '',
      });
    };

    const uploadProgress = (progress) => {
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

  addBrand = (e) => {
    e.preventDefault();

    const {
      brandName,
      avatarKey,
    } = this.state;

    const error = this.validateName(brandName);

    if (error === '') {
      const data = {
        brandName,
        avatarKey,
      };

      this.props.addBrand(data);
    } else {
      this.setState({
        errorText: error,
      });
    }
  }

  handleNameChange = (e) => {
    const name = e.target.value;

    this.setState({
      brandName: name,
      errorText: this.validateName(name),
    });
  }

  validateName = (name) => {
    let error = '';

    if (name.length < 2) {
      error = 'The length of Brand name should be greater than 2';
    } else if (name.length > 200) {
      error = 'The length of Brand name should be less than 100';
    }

    return error;
  }

  render() {
    return (
      <Wrapper>
        <form onSubmit={this.addBrand}>
          <h2 className="title">Add New Brand</h2>
          <div className="divider" />
          <div className="body-wrapper">
            <PPTextField
              type="text"
              name="brandName"
              floatingLabelText="Brand Name"
              maxLength={200}
              value={this.state.brandName}
              onChange={this.handleNameChange}
              errorText={this.state.errorText}
              required
            />
            <div className="avatar-wrapper">
              <PPAvatar
                size={90}
                header="Brand Icon"
                image={this.state.avatarNew}
                title={this.state.brandName}
                backgroundColor={this.state.avatarColor}
                getAvatarandColor={this.getAvatarandColor}
                isClickable={false}
              />
              <div className="description-wrapper">
                <p>Managing multiple brands can be hard. Personalize your new brand with its own image or logo to help!</p>
                <PPButton
                  label="Choose File"
                  primary={false}
                  onClick={this.uploadAvatar}
                />
              </div>
            </div>
            <div className="button_wrapper">
              <PPButton
                type="submit"
                label="Add Brand"
                primary
              />
            </div>
          </div>
        </form>
      </Wrapper>
    );
  }
}

BrandUploadForm.propTypes = {
  filePickerKey: PropTypes.string,
  addBrand: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  filePickerKey: makeSelectFilePickerKey(),
});

export default UserCanTeam(connect(mapStateToProps)(BrandUploadForm));
