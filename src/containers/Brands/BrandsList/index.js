import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import BrandsListItem from './BrandsListItem';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const TextWrapper = styled.p`
  margin-left: 15px;
  padding: 0;
  font-family: 'Lato';
`;

function compare(a, b) {
  if (a.title.toLowerCase() < b.title.toLowerCase()) {
    return -1;
  }
  if (a.title.toLowerCase() > b.title.toLowerCase()) {
    return 1;
  }
  return 0;
}

function BrandsList({ brands, removeBrand, permissionClasses }) {
  const sortedBrands = brands.sort(compare);
  let brandsList;
  if ((sortedBrands !== undefined) && (sortedBrands.length > 0)) {
    brandsList = sortedBrands.map((brand, index) =>
      <BrandsListItem key={index} brand={brand} remove={removeBrand} permissionClasses={permissionClasses} />
    );
  } else {
    brandsList = <TextWrapper>You currently have no brands.</TextWrapper>;
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
  permissionClasses: PropTypes.object,
};

export default BrandsList;
