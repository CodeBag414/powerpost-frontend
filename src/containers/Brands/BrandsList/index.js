import React from 'react';

import BrandsListItem from './BrandsListItem';

class BrandsList extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let brandsList = [];

        if((this.props.brands !== undefined) && (this.props.brands.length > 0)) {
            this.props.brands.map((brand, index) => {
                brandsList.push(
                    <BrandsListItem key={index} brand={brand} remove={this.props.removeBrand}/>
                );
            });
        } 
        if((this.props.newBrand !== undefined) && (this.props.newBrand.account_id !== undefined)) {
            console.log('brandsList.length', brandsList.length)
            brandsList.push(
                <BrandsListItem key={brandsList.length} brand={this.props.newBrand} remove={this.props.removeBrand}/>
            );
        } 
        
        if (brandsList.length === 0) {
            brandsList = 'You currently have no brands';
        }

        return (
            <div>
                { brandsList }
            </div>
        );
    }
}

BrandsList.propTypes = {
    children: React.PropTypes.node
};

export default BrandsList;
