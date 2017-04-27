import React from 'react';
import styled from 'styled-components';

const LargeImageWrapper = styled.img`
  background-color: #4A4A4A;
  border-radius: 4px;
  border: solid 1px ${(props) => props.theme.primaryColor};
  max-height: 350px;
  max-width: 100%;
`;

export default LargeImageWrapper;