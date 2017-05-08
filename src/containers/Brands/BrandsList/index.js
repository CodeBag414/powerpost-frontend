import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import BrandsListItem from './BrandsListItem';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function compare(a, b) {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
}

function BrandsList({ brands, removeBrand }) {
  let brandsList = [];

  const sortedBrands = brands.sort(compare);

  if ((sortedBrands !== undefined) && (sortedBrands.length > 0)) {
    sortedBrands.map((brand, index) => {
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
