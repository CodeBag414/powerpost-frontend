import React, { PropTypes } from 'react';
import { Tab, Tabs } from 'react-toolbox';

import PPFullScreenDialog from 'elements/atm.FullScreenDialog';
import TextField from 'elements/atm.TextField';
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
    return (
      <PPFullScreenDialog title="CREATE NEW BRAND" active={this.props.dialogShown} actions={labelActions}>
        <Tabs index={this.state.index} onChange={this.handleTabChange}>
          <Tab label="NEW BRAND" theme={tabTheme}>
            <div className={styles.tabContent}>
              <p>Lorem ipsum semper. At vitae dictum a lectus scelerisque urna augue mollis nec augue volutpat orci In semper. Vestibulum commodo a.</p>
              <hr />
              <div>
                ... IN PROGRESS
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
