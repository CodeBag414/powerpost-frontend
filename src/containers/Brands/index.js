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
    makeSelectDialogShown,
} from './selectors';

import {
    makeSelectAccountBrands,
} from 'containers/Main/selectors';


class Brands extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleDialogToggle = this.handleDialogToggle.bind(this);
        this.setBrandFilter = this.setBrandFilter.bind(this);
    }
    
    componentDidMount() {
        
    }
    
    componentDidUpdate() {
       
    }

    handleDialogToggle() {
        this.props.toggleDialogShown(!this.props.dialogShown);
    }

    setBrandFilter(brandFilter) {
        this.props.setBrandFilter(brandFilter);
    }

    getFilteredBrands () {
        return this.props.brands.filter(brand => {
            let matched = true;

            if(this.props.brandFilter) {
                matched = matched && (brand.title.toLowerCase().indexOf(this.props.brandFilter.toLowerCase()) > -1);
            }

            return matched;
        });
    }

    render() {
        return (
            <div>
                <BrandsControlBar handleDialogToggle={this.handleDialogToggle} 
                            setBrandFilter={this.setBrandFilter} brandFilter={this.props.brandFilter}/>
                <BrandsList brands={this.getFilteredBrands()} /> 
                <AddBrandDialog handleDialogToggle={this.handleDialogToggle} dialogShown={this.props.dialogShown} />
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
    brands: makeSelectAccountBrands(),
    dialogShown: makeSelectDialogShown(),
});

export default UserCanAccount(connect(mapStateToProps, mapDispatchToProps)(Brands));
