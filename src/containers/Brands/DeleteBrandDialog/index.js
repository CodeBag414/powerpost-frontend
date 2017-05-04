import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import PPDialog from 'elements/atm.Dialog';
import PPButton from 'elements/atm.Button';

import Wrapper from './Wrapper';

import { deleteBrandRequest } from '../actions';

class DeleteBrandDialog extends Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    deleteBrand: PropTypes.func,
    handleDialogToggle: PropTypes.func,
    accountId: PropTypes.string,
  }

  delete = (e) => {
    e.preventDefault();

    this.props.handleDialogToggle();
    this.props.deleteBrand({ account_id: this.props.accountId });
  }

  render() {
    const { active, handleDialogToggle } = this.props;

    return (
      <PPDialog
        active={active}
        onOverlayClick={handleDialogToggle}
        onEscKeyDown={handleDialogToggle}
      >
        <Wrapper>
          <form onSubmit={this.delete}>
            <h2 className="title">Delete Brand</h2>
            <div className="divider" />
            <div className="body-wrapper">
              <p>Are you sure? You will not be able to recover this Brand and all of its posts.</p>
              <div className="button_wrapper">
                <PPButton
                  type="submit"
                  label="Delete"
                  primary
                />
                <PPButton
                  onClick={handleDialogToggle}
                  label="Cancel"
                  primary={false}
                />
              </div>
            </div>
          </form>
        </Wrapper>
      </PPDialog>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    deleteBrand: (data) => dispatch(deleteBrandRequest(data)),
  };
}

const mapStateToProps = createStructuredSelector({

});

export default (connect(mapStateToProps, mapDispatchToProps)(DeleteBrandDialog));
