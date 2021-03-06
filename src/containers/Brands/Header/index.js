import React from 'react';
import PropTypes from 'prop-types';

import PPButton from 'elements/atm.Button';
import PPSearch from 'elements/atm.Search';

import Wrapper from './Wrapper';
import Status from './Status';

function Header({ handleDialogToggle, handleSearch, brandLimit, numBrands, permissionClasses }) {
  return (
    <Wrapper>
      <div>
        <PPButton
          label="Add New Brand"
          onClick={handleDialogToggle}
          primary
          className={permissionClasses.addNewBrandButton}
        />
        <Status>{brandLimit - numBrands} of {brandLimit} Brands Remaining</Status>
      </div>
      <PPSearch
        placeholder="Search Title"
        onChange={handleSearch}
      />
    </Wrapper>
  );
}

Header.propTypes = {
  handleDialogToggle: PropTypes.func,
  handleSearch: PropTypes.func,
  brandLimit: PropTypes.number,
  numBrands: PropTypes.number,
  permissionClasses: PropTypes.object,
};

export default Header;
