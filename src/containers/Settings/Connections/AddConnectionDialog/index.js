import React, { PropTypes } from 'react';
import { Tab, Tabs } from 'react-toolbox';

import PPFullScreenDialog from 'elements/atm.FullScreenDialog';
import TextField from 'elements/atm.TestTextField';
import PPButton from 'elements/atm.Button';

import styles from './styles.scss';
import tabTheme from './tabTheme.scss';

class AddConnectionDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 1,
      fixedIndex: 1,
      inverseIndex: 1,
    };
  }

  getChannelClass(connection) {
    return Object.prototype.hasOwnProperty.call(styles, connection.channel) ? styles[connection.channel] : '';
  }

  handleTabChange = (index) => {
    this.setState({ index });
  };

  handleFixedTabChange = (index) => {
    this.setState({ fixedIndex: index });
  };

  handleInverseTabChange = (index) => {
    this.setState({ inverseIndex: index });
  };

  render() {
    const labelActions = [
            { label: 'Cancel', onClick: this.props.handleDialogToggle },
            { label: 'Save', onClick: this.props.handleDialogToggle },
    ];

    const connectionTypes = [
      { name: 'Facebook Profile',
        icon: 'fa fa-facebook-square',
        text: 'Log into your Facebook to start sharing content',
        channel: 'facebook',
        url: this.props.socialUrls ? this.props.socialUrls.facebook : '',
      },
      { name: 'Facebook Page',
        icon: 'fa fa-facebook-square',
        text: 'Log into your Facebook to start sharing content',
        channel: 'facebook',
        url: this.props.socialUrls ? this.props.socialUrls.facebook : '',
      },
      { name: 'Twitter Profile',
        icon: 'fa fa-twitter-square',
        text: 'Log into your Twitter to start sharing content',
        channel: 'twitter',
        url: this.props.socialUrls ? this.props.socialUrls.twitter : '',
      },
      { name: 'LinkedIn Profile',
        icon: 'fa fa-linkedin-square',
        text: 'Log into your LinkedIn to start sharing content',
        channel: 'linkedin',
        url: this.props.socialUrls ? this.props.socialUrls.linkedin : '',
      },
      { name: 'LinkedIn Company',
        icon: 'fa fa-linkedin-square',
        text: 'Log into your LinkedIn to start sharing content',
        channel: 'linkedin',
        url: this.props.socialUrls ? this.props.socialUrls.linkedin : '',
      },
      { name: 'Pinterest Board',
        icon: 'fa fa-pinterest-square',
        text: 'Log into your Pinterest to start sharing content',
        channel: 'pinterest',
        url: this.props.socialUrls ? this.props.socialUrls.pinterest : '',
      },
      { name: 'Google Profile',
        icon: 'fa fa-google-plus-square',
        text: 'Log into your Google Plus account to start sharing content',
        channel: 'google',
        url: this.props.socialUrls ? this.props.socialUrls.google : '',
      },
    ];

    return (
      <PPFullScreenDialog title="Connect a Channel" active={this.props.dialogShown} actions={labelActions}>
        <Tabs index={this.state.index} onChange={this.handleTabChange}>
          <Tab label="Social Media" theme={tabTheme}>
            <div className={styles.tabContent}>
              <p>Lorem ipsum semper. At vitae dictum a lectus scelerisque urna augue mollis nec augue volutpat orci In semper. Vestibulum commodo a.</p>
              <hr />
              <div>
                { connectionTypes.map((connection, i) =>
                  <div key={i} className={styles.connectionTypeContainer}><i className={[connection.icon, styles.icon, this.getChannelClass(connection, styles)].join(' ')} /><div className={styles.connectionType}><div className={styles.connectionName}>{ connection.name }</div><div className={styles.connectionDesc}>{ connection.text }</div></div><div className={styles.buttonContainer}><PPButton label="Connect" neutral onClick={() => window.open(connection.url)} /></div></div>
                        )}
              </div>
            </div>
          </Tab>
          <Tab label="Wordpress" theme={tabTheme}>
            <div className={styles.tabContent}>
              <p>Lorem ipsum semper. At vitae dictum a lectus scelerisque urna augue mollis nec augue volutpat orci In semper. Vestibulum commodo a.</p>
              <hr />
              <div>
                <TextField floatingLabelText="Wordpress URL" name="wordpressUrl" type="url" />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <TextField floatingLabelText="Wordpress Username" name="wordpressUsername" type="text" />
                </div>
                <div className="col-md-6">
                  <TextField floatingLabelText="Wordpress Password" name="wordpressPassword" type="password" />
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>
      </PPFullScreenDialog>
    );
  }
}

AddConnectionDialog.propTypes = {
  socialUrls: PropTypes.object,
  dialogShown: PropTypes.bool,
  handleDialogToggle: PropTypes.func,
};

export default AddConnectionDialog;
