import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { UserCanAccount } from 'config.routes/UserRoutePermissions';

import {
    makeSelectAccountBrands,
} from 'containers/Main/selectors';

import {
  makeSelectSharedAccounts,
} from 'containers/App/selectors';

import Wrapper from './Wrapper';
import AddBrandDialog from './AddBrandDialog';
import BrandsControlBar from './BrandsControlBar';
import BrandsList from './BrandsList';

import {
  setBrandFilter,
  setBrandsList,
  toggleDialog,
} from './actions';

import {
  makeSelectBrandFilter,
  makeSelectNewBrand,
  makeSelectDeleteBrandID,
} from './selectors';

class Brands extends Component {
  constructor(props) {
    super(props);

    this.state = {
      brands: [],
      isDialogShown: false,
    };

    this.setBrandFilter = this.setBrandFilter.bind(this);
  }

  setBrandFilter(brandFilter) {
    this.props.setBrandFilter(brandFilter);
  }

  getFilteredBrands() {
    this.state.brands = this.props.brands;
    if (this.props.newBrand.account_id !== undefined) {
      this.state.brands = [...this.state.brands, this.props.newBrand];
    }

    if (this.props.deleteBrandID !== '') {
      const tmpBrands = [];
      this.state.brands.map((brand, index) => {
        if (brand.account_id !== this.props.deleteBrandID) {
          tmpBrands.push(brand);
        }
      });
      this.state.brands = tmpBrands;
    }

    return this.state.brands.filter((brand) => {
      let matched = true;

      if (this.props.brandFilter) {
        matched = matched && (brand.title.toLowerCase().indexOf(this.props.brandFilter.toLowerCase()) > -1);
      }

      return matched;
    });
  }


  getBrandsRemaining() {
    this.getFilteredBrands();
    return this.state.brands.length;
  }

  handleDialogToggle = () => {
    this.setState({ isDialogShown: !this.state.isDialogShown });
  }

  render() {
    const { isDialogShown } = this.state;

    return (
      <Wrapper>
        <BrandsControlBar
          handleDialogToggle={this.handleDialogToggle}
          setBrandFilter={this.setBrandFilter}
          brandFilter={'this.props.brand', this.props.brandFilter}
        />
        <BrandsList
          brands={this.getFilteredBrands()}
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
    setBrandFilter: (brandFilter) => dispatch(setBrandFilter(brandFilter)),
    setBrandsListShown: (brands) => dispatch(setBrandsList(brands)),
    toggleDialogShown: (isShown) => dispatch(toggleDialog(isShown)),
  };
}

const mapStateToProps = createStructuredSelector({
  brandFilter: makeSelectBrandFilter(),
  brands: makeSelectAccountBrands(),
  newBrand: makeSelectNewBrand(),
  deleteBrandID: makeSelectDeleteBrandID(),
});

export default UserCanAccount(connect(mapStateToProps, mapDispatchToProps)(Brands));
