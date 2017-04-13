import React from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { UserCanAccount } from 'config.routes/UserRoutePermissions';

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
    makeSelectDialogShown,
} from './selectors';

import {
    makeSelectAccountBrands,
} from 'containers/Main/selectors';

import {
  makeSelectSharedAccounts,
} from 'containers/App/selectors';


class Brands extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            brands: [],
        }
        
        this.handleDialogToggle = this.handleDialogToggle.bind(this);
        this.setBrandFilter = this.setBrandFilter.bind(this);
    }
    
    handleDialogToggle() {
        this.props.toggleDialogShown(!this.props.dialogShown);
    }

    setBrandFilter(brandFilter) {
        this.props.setBrandFilter(brandFilter);
    }

    getFilteredBrands () {        
        this.state.brands = this.props.brands;
        if (this.props.newBrand.account_id !== undefined) {
            this.state.brands = [...this.state.brands, this.props.newBrand]
        }
        
        if (this.props.deleteBrandID !== '') {
            let tmpBrands = [];
            this.state.brands.map((brand, index) => {
                if ( brand.account_id !== this.props.deleteBrandID ) {
                    tmpBrands.push(brand);
                }                
            });
            this.state.brands = tmpBrands
            // this.setState({brands: this.state.brands})
        }
            
        return this.state.brands.filter(brand => {
            let matched = true;

            if(this.props.brandFilter) {
                matched = matched && (brand.title.toLowerCase().indexOf(this.props.brandFilter.toLowerCase()) > -1);
            }

            return matched;
        });
    }

    getBrandsRemaining () {
        this.getFilteredBrands()
        console.log('this.state.brands', this.state.brands)
        console.log('this.state.brands.length', this.state.brands.length)
        return this.state.brands.length
    }

    render() {
        return (
            <div>
                <BrandsControlBar 
                    handleDialogToggle={this.handleDialogToggle} 
                    setBrandFilter={this.setBrandFilter} 
                    brandFilter={'this.props.brand', this.props.brandFilter}
                    brandsRemaining={this.getBrandsRemaining()}
                />
                <BrandsList 
                    brands={this.getFilteredBrands()}
                /> 
                <AddBrandDialog 
                    handleDialogToggle={this.handleDialogToggle} 
                    dialogShown={this.props.dialogShown} 
                />
            </div>
        );
    }
}

Brands.propTypes = {children: React.PropTypes.node};

export function mapDispatchToProps(dispatch) {
    return {
        setBrandFilter: brandFilter => dispatch(setBrandFilter(brandFilter)),
        setBrandsListShown: brands => dispatch(setBrandsList(brands)),
        toggleDialogShown: isShown => dispatch(toggleDialog(isShown)),
    };
}

const mapStateToProps = createStructuredSelector({
    brandFilter: makeSelectBrandFilter(),
    // brands: makeSelectSharedAccounts(),
    brands: makeSelectAccountBrands(),
    newBrand: makeSelectNewBrand(),
    deleteBrandID: makeSelectDeleteBrandID(),
    dialogShown: makeSelectDialogShown(),
});

export default UserCanAccount(connect(mapStateToProps, mapDispatchToProps)(Brands));
