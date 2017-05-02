import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import BrandsListItem from './BrandsListItem';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function BrandsList({ brands, removeBrand }) {
  let brandsList = [];

  if ((brands !== undefined) && (brands.length > 0)) {
    brands.map((brand, index) => {
      brandsList.push(
        <BrandsListItem key={index} brand={brand} remove={removeBrand} />
                );
    });
  } else {
    brandsList = 'You currently have no brands';
  }

  return (
    <Wrapper>
      { brandsList }
    </Wrapper>
  );
}

BrandsList.propTypes = {
  brands: PropTypes.array,
  removeBrand: PropTypes.func,
};

export default BrandsList;
