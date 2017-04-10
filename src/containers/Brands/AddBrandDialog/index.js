import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Dialog from 'react-toolbox/lib/dialog';
import FlatButton from 'material-ui/FlatButton';
import filepicker from 'filepicker-js';

import PPInput from 'elements/atm.Input';
import TextField from 'elements/atm.TextField';
import PPButton from 'elements/atm.Button';
import Avatar from 'elements/atm.Avatar';

import { createBrandRequest } from '../actions';
import {
  makeSelectUser,
  makeSelectUserAccount,
  makeSelectFilePickerKey,
} from 'containers/App/selectors';

import dialogtheme from './dialog-styles.scss';
import styles from './styles.scss';

class AddBrandDialog extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    userOwnAccount: PropTypes.object,
    filePickerKey: PropTypes.string,
    create: PropTypes.func,

    dialogShown: PropTypes.bool,
    handleDialogToggle: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.openFilePicker = this.openFilePicker.bind(this);
    this.createBrand = this.createBrand.bind(this);
    this.handleChange = this.handleChange.bind(this);

    const user = this.props.user || null;
    const userProperties = (user && user.properties) || null;
    const userOwnAccount = this.props.userOwnAccount || null;
    const userOwnAccountProperties = (userOwnAccount && userOwnAccount.properties) || null;

    this.state = {
      avatar: (userProperties && userProperties.thumb_url) || '',
      avatarKey: '',
      name: user.display_name || '',
      title: (userOwnAccount && userOwnAccount.title) || '',
    };
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

  createBrand(event) {
    event.preventDefault();

    const data = {
      account_id: this.props.userOwnAccount.account_id,
      display_name: this.state.title,
      thumbnail_image_key: this.state.avatarKey,
    };
    
    this.props.create(data);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const labelActions = [
      { label: 'Cancel', onClick: this.props.handleDialogToggle }
    ];

    const inline = {
      avatar: {
        position: 'relative',
        top: '-20px',
        width: '186px',
        display: 'inline-block',
        verticalAlign: 'top'
      },
      avatarImg: {
        left: '0px',
        width: '180px',
        height: '180px',
        borderRadius: '0',
      },
      avatardescription: {
        display: 'inline-block',
        width: '350px',
        fontSize: '16px',
        color: '#999',
        lineHeight: '20px',
        margin: '0px 0px 0px 30px',
        verticalAlign: 'top'
      }
    };

    console.log('userOwnAccount', this.props.userOwnAccount)

    return (
      <Dialog title="Add New Brand" active={this.props.dialogShown} actions={labelActions} theme={ dialogtheme }>
        <form onSubmit={this.createBrand}>
          <row>
            <div>
              <TextField type="text"  name="title" floatingLabelText="Brand Name" maxLength={100} 
                value={this.state.title} onChange={this.handleChange} style={{ margin: 0 }} />
            </div>
          </row>
          <row>
            <div>
              <h5 style={{ marginLeft: '0px', color: '#9d9d9d' }}>Brand Icon</h5>
              <br />
              <div style={inline.avatar}>
                <Avatar image={this.state.avatar} style={inline.avatarImg} theme={styles} 
                  onClick={this.openFilePicker} />
                <FlatButton label="Update Brand Icon" className={styles.updateAvatar} 
                  onClick={this.openFilePicker} />
              </div>
              <div style={inline.avatardescription}>
                Managing multiple brands can be hard. Personalize your new brand with its own image or logo to help!
              </div>
            </div>
          </row>
          <row>
            <div>
              <PPButton type="submit" label="Add Brand" primary={!false} className={styles.submit} />
            </div>
          </row>
        </form>
      </Dialog>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    create: (data) => dispatch(createBrandRequest(data)),
  };
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  userOwnAccount: makeSelectUserAccount(),
  filePickerKey: makeSelectFilePickerKey(),
});

export default (connect(mapStateToProps, mapDispatchToProps)(AddBrandDialog));
