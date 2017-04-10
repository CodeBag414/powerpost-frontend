import React from 'react';

import BrandsListItem from './BrandsListItem';

class BrandsList extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let brandsList;

        if((this.props.brands !== undefined) && (this.props.brands.length > 0)) {
            brandsList = [];

            this.props.brands.map((brand, index) => {
                brandsList.push(
                    <BrandsListItem key={index} brand={brand} remove={this.props.removeBrand}/>
                );
            });
        } else {
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
