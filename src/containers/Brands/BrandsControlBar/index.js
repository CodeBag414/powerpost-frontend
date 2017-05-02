import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PPButton from 'elements/atm.Button';

const Wrapper = styled.div`
  width: 100%;
  padding: 22px 15px;
  display: flex;
  justify-content: space-between;
`;

const BrandStatus = styled.p`
  margin: auto 0;
  color: #888888;
  font-family: Lato;
  font-size: 13px;
`;

class BrandsControlBar extends React.Component {

  static propTypes = {
    setBrandFilter: PropTypes.func,
    handleDialogToggle: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.setBrandFilter = this.setBrandFilter.bind(this);
  }

  setBrandFilter(e) {
    this.props.setBrandFilter(e);
  }

  render() {
    return (
      <Wrapper>
        <PPButton
          label="Add New Brand"
          onClick={this.props.handleDialogToggle}
          primary
        />
        <BrandStatus>9 of 20 Brands Remaining</BrandStatus>
      </Wrapper>
    );
  }
}

export default BrandsControlBar;
