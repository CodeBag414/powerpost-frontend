import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { debounce } from 'lodash';

import { getClassesByPage } from 'utils/permissionClass';

import {
  fetchCurrentAccount,
} from 'containers/Main/actions';

import {
  getUser,
} from 'containers/App/actions';

import {
  makeSelectAccountBrands,
} from 'containers/Main/selectors';

import {
  makeSelectUserAccount,
} from 'containers/App/selectors';

import {
  makeSelectBrandCreated,
  makeSelectBrandDeleted,
} from './selectors';

import Wrapper from './Wrapper';
import AddBrandDialog from './AddBrandDialog';
import Header from './Header';
import BrandsList from './BrandsList';

class Brands extends Component {

  static propTypes = {
    userAccount: PropTypes.object,
    brands: PropTypes.array,
    isBrandCreated: PropTypes.bool,
    isBrandDeleted: PropTypes.bool,
    fetchAccount: PropTypes.func,
    getUser: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      isDialogShown: false,
      filteredBrands: props.brands,
    };

    this.filterBrands = debounce(this.filterBrands, 200);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isBrandCreated !== nextProps.isBrandCreated ||
      this.props.isBrandDeleted !== nextProps.isBrandDeleted) {
      this.props.fetchAccount(this.props.userAccount.account_id);
      this.props.getUser();
    }
  }

  handleDialogToggle = () => {
    this.setState({ isDialogShown: !this.state.isDialogShown });
  }

  handleSearch = (ev) => {
    this.filterBrands(ev);
  }

  filterBrands = (ev) => {
    const title = ev.target.value;
    const filteredBrands = this.props.brands.filter((b) => b.title.toLowerCase().indexOf(title.toLowerCase()) > -1);
    this.setState({
      filteredBrands,
    });
  }

  render() {
    const { userAccount, brands } = this.props;
    const { isDialogShown, filteredBrands } = this.state;

    const numBrands = userAccount && userAccount.account_access && userAccount.account_access.num_brands;
    const { permissions } = userAccount.user_access;
    const permissionClasses = getClassesByPage(permissions, 'brands');
    return (
      <Wrapper>
        <Header
          handleDialogToggle={this.handleDialogToggle}
          handleSearch={this.handleSearch}
          brandLimit={numBrands}
          numBrands={brands.length}
          permissionClasses={permissionClasses}
        />
        <BrandsList
          brands={filteredBrands}
          permissionClasses={permissionClasses}
        />
        <AddBrandDialog
          handleDialogToggle={this.handleDialogToggle}
          active={isDialogShown}
        />
      </Wrapper>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    fetchAccount: (accountId) => dispatch(fetchCurrentAccount(accountId)),
    getUser: () => dispatch(getUser()),
  };
}

const mapStateToProps = createStructuredSelector({
  brands: makeSelectAccountBrands(),
  userAccount: makeSelectUserAccount(),
  isBrandCreated: makeSelectBrandCreated(),
  isBrandDeleted: makeSelectBrandDeleted(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Brands);
