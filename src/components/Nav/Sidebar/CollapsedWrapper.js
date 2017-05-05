import React from 'react';
import styled from 'styled-components';

const CollapsedWrapper = styled.div`
  width: 60px;
  background-color: #F8FAFA;
  border: solid 1px #C8CED0;
  display: ${(props) => props.isCollapsed ? 'block' : 'none' };
`;

export default CollapsedWrapper;