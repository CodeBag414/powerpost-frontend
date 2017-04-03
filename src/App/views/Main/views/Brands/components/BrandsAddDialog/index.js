/*
 * Brands Dialog
 *
 * 
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { updateRequest } from '../../../../../../state/actions';

import { makeSelectUser,
         makeSelectFilePickerKey
} from '../../../../../../state/selectors';

import { makeSelectCurrentAccount
} from '../../../../state/selectors';

import PPInput from 'App/shared/atm.Input';
import PPButton from 'App/shared/atm.Button';
import PPDialog from 'App/shared/atm.Dialog';

class BrandsAddDialog extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleChange = this.handleChange.bind(this);
        this.openFilePicker = this.openFilePicker.bind(this);

        this.state = {
            active: false,
            brandtitle: ""
        }

    }

    actions = [
        { label: "Cancel", onClick: this.props.handleDialogToggle },
        { label: "Save", onClick: this.props.handleDialogToggle }
    ];

    handleChange = (brandtitle, value) => {
      this.setState({...this.state, [brandtitle]: value});
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

    render () {

        return (
          <div>
            <PPDialog 
              actions={this.actions}
              active={this.props.dialogShown}
              onEscKeyDown={this.props.handleDialogToggle}
              onOverlayClick={this.props.handleDialogToggle}
              title={'Create a new brand for ' + this.props.user.display_name}
            >
              <PPInput type="text" label="Enter the brand title" name="brandtitle" value={this.state.brandtitle} 
                onChange={this.handleChange.bind(this, 'brandtitle')} maxLength={50} />
              <PPButton icon="add" label="CREATE" raised accent />
            </PPDialog>
          </div>
        );
    }
}

BrandsAddDialog.propTypes = {
  children: React.PropTypes.node,
  dialogShown: Component.bool,
  handleDialogToggle: Component.func,
};

export function mapDispatchToProps(dispatch) {
    return {
        
    };
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  user_current_account: makeSelectCurrentAccount(),
  filePickerKey: makeSelectFilePickerKey()
});

export default connect(mapStateToProps, mapDispatchToProps)(BrandsAddDialog);