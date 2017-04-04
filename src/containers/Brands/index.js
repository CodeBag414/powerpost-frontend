/*
 * Brands
 *
 *
 */

import React, { Component } from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { UserCanAccount } from 'config.routes/UserRoutePermissions';

import PPButton from 'App/shared/atm.Button';
import BrandsAddDialog from './components/BrandsAddDialog';

import {
    toggleDialog,
} from './state/actions';

import {
    makeSelectDialogShown,
} from './state/selectors';

class Brands extends React.Component {

    constructor(props) {
        super(props);

        this.handleDialogToggle = this.handleDialogToggle.bind(this);
    }

    handleDialogToggle = () => {
        this.props.toggleDialogShown(!this.props.dialogShown);
    }
    
    render() {

        const styles = require('./styles.scss');
        return (
            <div className={ styles.brandslayout }>
                Brands View
                <PPButton icon="add" label="Add New Brand"
                    onClick={ this.handleDialogToggle } raised accent />
                <BrandsAddDialog handleDialogToggle={ this.handleDialogToggle } dialogShown={ this.props.dialogShown } />
            </div>
        );
    }
}


Brands.propTypes = {children: React.PropTypes.node};

export function mapDispatchToProps(dispatch) {
    return {
        toggleDialogShown: (isShown) => dispatch(toggleDialog(isShown)),
    };
}

const mapStateToProps = createStructuredSelector({
  dialogShown: makeSelectDialogShown(),
});

export default UserCanAccount(connect(mapStateToProps, mapDispatchToProps)(Brands));