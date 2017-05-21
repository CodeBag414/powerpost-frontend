import React from 'react';
import styled from 'styled-components';

const SmallImageWrapper = styled.img`
  background-color: #4A4A4A;
  border-radius: 4px;
  border: ${(props) => props.isSelected ? 'solid 1px' : 'none'};
  border-color: ${(props) => props.theme.primaryColor};
  max-height: 75px;
  max-width: 100%;
`;

export default SmallImageWrapper;