import React, { PropTypes } from 'react';
import { Tab, Tabs } from 'react-toolbox';

import PPDialog from 'elements/atm.Dialog';
import PPInput from 'elements/atm.Input';
import TextField from 'elements/atm.TextField';
import PPButton from 'elements/atm.Button';

import styles from './styles.scss';

class AddBrandDialog extends React.Component {
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

  render() {
    const labelActions = [
            { label: 'Cancel', onClick: this.props.handleDialogToggle },
            { label: 'Save', onClick: this.props.handleDialogToggle },
    ];
    return (
      <PPDialog title="CREATE NEW BRAND" active={this.props.dialogShown} actions={labelActions}>
        <PPInput type="text" label="Enter the brand title" name="brandtitle" maxLength={50} />
        <PPButton icon="add" label="CREATE" raised accent />
      </PPDialog>
    );
  }
}

AddBrandDialog.propTypes = {
  socialUrls: PropTypes.object,
  dialogShown: PropTypes.bool,
  handleDialogToggle: PropTypes.func,
};

export default AddBrandDialog;
